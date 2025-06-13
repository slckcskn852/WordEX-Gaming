document.addEventListener('DOMContentLoaded', () => {
    // Prevent multiple initializations
    if (window.wordexGameInitialized) {
        return;
    }
    window.wordexGameInitialized = true;
      const gameBoard = document.getElementById('game-board');
    const keyboardContainer = document.getElementById('keyboard-container');
    const messageArea = document.getElementById('message-area');
    const historyContainer = document.getElementById('history-container');
    
    // Word lists will be loaded from JSON files
    let soulsWordList = [];
    let finalFantasyWordList = [];
    let validGuesses = [];
    let currentGenre = 'souls'; // Default genre
    let gameHistory = JSON.parse(localStorage.getItem('wordex-history') || '[]'); // Load saved history
    
    // Load words from JSON files
    async function loadWords() {
        try {
            // Load Souls words
            const soulsResponse = await fetch('souls-words.json');
            const soulsData = await soulsResponse.json();
            soulsWordList = soulsData.words;
            
            // Load Final Fantasy words
            const ffResponse = await fetch('final-fantasy-words.json');
            const ffData = await ffResponse.json();
            finalFantasyWordList = ffData.words;
            
            // Load general words
            const generalResponse = await fetch('words.json');
            const generalData = await generalResponse.json();
            
            // Combine all lists for valid guesses
            validGuesses = [...soulsWordList, ...finalFantasyWordList, ...generalData.words];} catch (error) {
            console.error('Error loading words:', error);
        }
    }
    
    let targetWord = '';

    const ROWS = 6;
    const COLS = 5;
    let currentRow = 0;
    let currentCol = 0;
    let guesses = Array(ROWS).fill(null).map(() => Array(COLS).fill(''));
    let boardCells = [];    async function initializeGame() {
        // Ensure DOM elements exist
        if (!gameBoard || !keyboardContainer || !messageArea) {
            console.error('Required DOM elements not found');
            return;
        }
        
        // Load words from JSON file if not already loaded
        if (validGuesses.length === 0) {
            await loadWords();
        }
          // Get target word from current genre
        const targetWordList = getCurrentTargetWordList();
        targetWord = targetWordList[Math.floor(Math.random() * targetWordList.length)].toUpperCase();
        console.log("Target word (for testing):", targetWord, "Genre:", currentGenre);
        createBoard();
        createKeyboard();
        currentRow = 0;
        currentCol = 0;
        guesses = Array(ROWS).fill(null).map(() => Array(COLS).fill(''));        updateBoard();
        messageArea.textContent = '';
        // Reset keyboard colors
        document.querySelectorAll('.key').forEach(key => {
            key.classList.remove('correct', 'present', 'absent');
        });
        // Update history display
        updateHistoryDisplay();
    }function createBoard() {
        // Clear any existing board content
        gameBoard.innerHTML = '';
        gameBoard.style.display = 'grid'; // Ensure proper display
        boardCells = [];
        
        for (let i = 0; i < ROWS; i++) {
            const rowEl = document.createElement('div');
            rowEl.classList.add('row');
            const rowCells = [];
            for (let j = 0; j < COLS; j++) {
                const cellEl = document.createElement('div');
                cellEl.classList.add('cell');
                rowEl.appendChild(cellEl);
                rowCells.push(cellEl);
            }
            gameBoard.appendChild(rowEl);
            boardCells.push(rowCells);
        }
    }

    function updateBoard() {
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                boardCells[i][j].textContent = guesses[i][j];
                // The line below was removed to make cell colors permanent after a guess:
                // boardCells[i][j].classList.remove('correct', 'present', 'absent'); 
            }
        }
    }    function createKeyboard() {
        // Clear any existing keyboard content
        keyboardContainer.innerHTML = '';
        keyboardContainer.style.display = 'flex'; // Ensure proper display
        keyboardContainer.style.flexDirection = 'column';
        
        const keysLayout = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
        ];

        keysLayout.forEach((row, rowIndex) => {
            const rowEl = document.createElement('div');
            rowEl.classList.add('keyboard-row');
            // Add specific styling for middle row to offset it like a real keyboard
            if (rowIndex === 1) {
                rowEl.style.paddingLeft = '15px'; 
                rowEl.style.paddingRight = '15px';
            }

            row.forEach(keyVal => {
                const keyEl = document.createElement('button');
                keyEl.classList.add('key');
                
                // Use backspace symbol instead of text
                if (keyVal === 'BACKSPACE') {
                    keyEl.innerHTML = '⌫'; // Backspace symbol
                    keyEl.setAttribute('data-key', 'BACKSPACE');
                } else {
                    keyEl.textContent = keyVal;
                }
                
                if (keyVal === 'ENTER' || keyVal === 'BACKSPACE') {
                    keyEl.classList.add('special');
                }
                keyEl.addEventListener('click', () => handleKeyPress(keyVal));
                rowEl.appendChild(keyEl);
            });
            keyboardContainer.appendChild(rowEl);
        });
    }

    function handleKeyPress(key) {
        if (currentRow >= ROWS) return; // Game over

        if (key === 'ENTER') {
            if (currentCol === COLS) {
                submitGuess();
            }
        } else if (key === 'BACKSPACE') {
            if (currentCol > 0) {
                currentCol--;
                guesses[currentRow][currentCol] = '';
                updateBoard();
            }
        } else if (currentCol < COLS && key.length === 1 && key.match(/[A-Z]/i)) {
            guesses[currentRow][currentCol] = key.toUpperCase();
            currentCol++;            updateBoard();
        }
    }    function submitGuess() {
        const guess = guesses[currentRow].join('');
        if (guess.length !== COLS) {
            showMessage("Not enough letters");
            shakeCurrentRow();
            return;
        }        // Check if the guessed word is valid (any 5-letter English word)
        if (!validGuesses.includes(guess.toLowerCase())) {
            showMessage("Not a valid word!");
            invalidWordAnimation();
            return;
        }

        const guessResult = checkGuess(guess);
        applyGuessResult(guessResult);

        // Wait for all animations to complete before continuing
        const totalAnimationTime = (COLS - 1) * 150 + 900; // Last cell delay + animation duration
          setTimeout(() => {
            if (guess === targetWord) {
                showMessage("Congratulations! You guessed it!");
                highlightKeyboard(guess, guessResult);
                currentRow = ROWS; // End game
                saveGameSnapshot(true, currentRow); // Save winning snapshot
                setTimeout(() => initializeGame(), 3000); // Restart after 3 seconds
                return;
            }

            highlightKeyboard(guess, guessResult);
            currentRow++;
            currentCol = 0;

            if (currentRow === ROWS) {
                showMessage(`Game Over! The word was ${targetWord}`);
                saveGameSnapshot(false, currentRow); // Save losing snapshot
                setTimeout(() => initializeGame(), 5000); // Restart after 5 seconds
            }
        }, totalAnimationTime);
    }

    function checkGuess(guess) {
        const result = [];
        const targetArray = targetWord.split('');
        const guessArray = guess.split('');
        const usedTargetIndices = new Array(COLS).fill(false);

        // First pass: check for correct letters in correct positions
        for (let i = 0; i < COLS; i++) {
            if (guessArray[i] === targetArray[i]) {
                result[i] = 'correct';
                usedTargetIndices[i] = true;
            } else {
                result[i] = null; // Placeholder
            }
        }

        // Second pass: check for present letters in wrong positions
        for (let i = 0; i < COLS; i++) {
            if (result[i] === null) { // Only check if not already 'correct'
                let found = false;
                for (let j = 0; j < COLS; j++) {
                    if (!usedTargetIndices[j] && guessArray[i] === targetArray[j]) {
                        result[i] = 'present';
                        usedTargetIndices[j] = true;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    result[i] = 'absent';
                }
            }
        }
        return result;
    }    function applyGuessResult(result) {
        // Apply animations sequentially with delays
        for (let i = 0; i < COLS; i++) {
            const cell = boardCells[currentRow][i];
            
            setTimeout(() => {
                // Add the reveal animation
                cell.classList.add('reveal-animation');
                
                // After the flip reaches halfway point, change the color
                setTimeout(() => {
                    cell.classList.add(result[i]);
                }, 300); // Half of the flip animation duration
                
                // Clean up animation class after animation completes
                setTimeout(() => {
                    cell.classList.remove('reveal-animation');
                    // Add a subtle pop effect after the flip
                    cell.classList.add('pop-animation');
                    setTimeout(() => {
                        cell.classList.remove('pop-animation');
                    }, 300);
                }, 600);
                
            }, i * 150); // Stagger each cell by 150ms
        }
    }

    function highlightKeyboard(guess, result) {
        const guessArray = guess.split('');
        guessArray.forEach((letter, index) => {
            const keyEl = Array.from(document.querySelectorAll('.key')).find(el => el.textContent === letter);
            if (keyEl) {
                // Prioritize 'correct' over 'present'
                if (result[index] === 'correct') {
                    keyEl.classList.remove('present', 'absent');
                    keyEl.classList.add('correct');
                } else if (result[index] === 'present' && !keyEl.classList.contains('correct')) {
                    keyEl.classList.remove('absent');
                    keyEl.classList.add('present');
                } else if (result[index] === 'absent' && !keyEl.classList.contains('correct') && !keyEl.classList.contains('present')) {
                    keyEl.classList.add('absent');
                }
            }
        });
    }

    function showMessage(msg) {
        messageArea.textContent = msg;
    }    // Physical keyboard support
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleKeyPress('ENTER');
        } else if (event.key === 'Backspace') {
            handleKeyPress('BACKSPACE');
        } else if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
            handleKeyPress(event.key.toUpperCase());
        }
    });    // Get current target word list based on selected genre
    function getCurrentTargetWordList() {
        return currentGenre === 'souls' ? soulsWordList : finalFantasyWordList;
    }

    // Genre selection functionality
    function switchGenre(newGenre) {
        currentGenre = newGenre;
        
        // Update button states
        document.getElementById('souls-btn').classList.toggle('active', newGenre === 'souls');
        document.getElementById('ff-btn').classList.toggle('active', newGenre === 'ff');
        
        // Start a new game with the new genre
        initializeGame();
    }    // Add event listeners for genre buttons (with safeguards)
    const soulsBtn = document.getElementById('souls-btn');
    const ffBtn = document.getElementById('ff-btn');
    
    if (soulsBtn && ffBtn) {
        soulsBtn.addEventListener('click', () => {
            if (currentGenre !== 'souls') {
                switchGenre('souls');
            }
        });
        
        ffBtn.addEventListener('click', () => {
            if (currentGenre !== 'ff') {
                switchGenre('ff');
            }
        });
    }

    // Start the game
    initializeGame();
    
    // Debug: Log initialization
    console.log('WordEX Game initialized successfully');

    function shakeCurrentRow() {
        const currentRowElement = boardCells[currentRow];
        currentRowElement.forEach(cell => {
            cell.classList.add('shake-row');
        });
        
        // Remove shake class after animation
        setTimeout(() => {
            currentRowElement.forEach(cell => {
                cell.classList.remove('shake-row');
            });
        }, 600);
    }
    
    function invalidWordAnimation() {
        // Add shake animation to current row
        const currentRowElement = boardCells[currentRow];
        
        // First, highlight cells as invalid
        currentRowElement.forEach(cell => {
            cell.classList.add('invalid');
        });
        
        // Add shake animation to the row
        currentRowElement.forEach(cell => {
            cell.classList.add('shake-row');
        });
        
        // Add screen shake effect
        document.body.classList.add('shake-screen');
        
        // After a short delay, clear the word and remove animations
        setTimeout(() => {
            // Clear the current row
            for (let i = 0; i < COLS; i++) {
                guesses[currentRow][i] = '';
            }
            currentCol = 0;
            updateBoard();
            
            // Remove all animation classes
            currentRowElement.forEach(cell => {
                cell.classList.remove('invalid', 'shake-row');
            });
            document.body.classList.remove('shake-screen');
        }, 600);
    }
    
    // Game History Functions
    function saveGameSnapshot(won, guessesUsed) {
        const snapshot = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            genre: currentGenre,
            won: won,
            guessesUsed: guessesUsed,
            board: guesses.slice(0, guessesUsed).map(row => 
                row.map((letter, index) => {
                    if (!letter) return 'empty';
                    const targetLetter = targetWord[index];
                    if (letter === targetLetter) return 'correct';
                    if (targetWord.includes(letter)) return 'present';
                    return 'absent';
                })
            )
        };
        
        gameHistory.unshift(snapshot); // Add to beginning
        if (gameHistory.length > 20) { // Keep only last 20 games
            gameHistory = gameHistory.slice(0, 20);
        }
        
        localStorage.setItem('wordex-history', JSON.stringify(gameHistory));
        updateHistoryDisplay();
    }

    function updateHistoryDisplay() {
        if (!historyContainer) return;
        
        historyContainer.innerHTML = '';
        
        if (gameHistory.length === 0) {
            historyContainer.innerHTML = '<p style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px;">No games played yet</p>';
            return;
        }
        
        gameHistory.forEach(game => {
            const snapshotEl = document.createElement('div');
            snapshotEl.className = 'game-snapshot';
            
            const headerEl = document.createElement('div');
            headerEl.className = 'snapshot-header';
            
            const genreEl = document.createElement('span');
            genreEl.className = `snapshot-genre ${game.genre}`;
            genreEl.textContent = game.genre === 'souls' ? 'DS' : 'FF';
            
            const resultEl = document.createElement('span');
            resultEl.className = `snapshot-result ${game.won ? 'won' : 'lost'}`;
            resultEl.textContent = game.won ? `${game.guessesUsed}/6` : 'X/6';
            
            headerEl.appendChild(genreEl);
            headerEl.appendChild(resultEl);
            
            const boardEl = document.createElement('div');
            boardEl.className = 'snapshot-board';
            
            // Create 6 rows (fill empty rows if game ended early)
            for (let i = 0; i < 6; i++) {
                const rowEl = document.createElement('div');
                rowEl.className = 'snapshot-row';
                
                for (let j = 0; j < 5; j++) {
                    const cellEl = document.createElement('div');
                    cellEl.className = 'snapshot-cell';
                    
                    if (i < game.board.length && j < game.board[i].length) {
                        cellEl.classList.add(game.board[i][j]);
                    } else {
                        cellEl.classList.add('empty');
                    }
                    
                    rowEl.appendChild(cellEl);
                }
                
                boardEl.appendChild(rowEl);
            }
            
            snapshotEl.appendChild(headerEl);
            snapshotEl.appendChild(boardEl);
            historyContainer.appendChild(snapshotEl);
        });
    }
});
