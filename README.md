# 🎮 WordEX Gaming - A Gaming-Themed Wordle Clone

🌐 **[Play Now at https://wordex.free.nf/](https://wordex.free.nf/)** 🌐

A modern, responsive Wordle-style word guessing game featuring gaming themes from **Dark Souls** and **Final Fantasy** series. Built with vanilla HTML, CSS, and JavaScript.

## ✨ Features

### 🎯 **Core Gameplay**
- Classic Wordle mechanics with 6 attempts to guess a 5-letter word
- Real-time feedback with color-coded hints:
  - 🟢 **Green**: Correct letter in correct position
  - 🟡 **Yellow**: Correct letter in wrong position
  - ⚫ **Gray**: Letter not in the word
- Physical and on-screen keyboard support
- **Strong invalid word feedback** with screen shake and row clearing

### 🎮 **Gaming Themes**
- **Dark Souls**: Words from Demon's Souls, Dark Souls, Bloodborne, Sekiro, and Elden Ring
- **Final Fantasy**: Characters, spells, items, and concepts from the FF universe
- Easy genre switching with dedicated buttons
- 180+ curated gaming words (80 Souls + 100 Final Fantasy)

### 📊 **Game History & Analytics**
- **Visual game snapshots**: Color-coded mini boards showing past game patterns
- **Persistent history**: Saves up to 20 recent games locally
- **Performance tracking**: Win/loss indicators and guess count display
- **Genre tracking**: Shows which theme was used for each game
- **Wordle-style sharing**: Pattern displays without revealing letters

### 📱 **Responsive Design**
- **Mobile-first** approach with optimized layouts
- **App-like experience**: No scrolling on mobile, everything fits on screen
- Adaptive sizing for all screen sizes:
  - 📱 Small phones (≤480px) - Compact layout with bottom history bar
  - 📱 Mobile (≤768px) - Streamlined interface, horizontal history scrolling
  - 📟 Tablet (769px-1024px) - Balanced layout with expanded history
  - 💻 Desktop (1025px-1439px) - Left sidebar with full game history
  - 🖥️ Large Desktop (≥1440px) - Spacious layout with detailed history

### 🎨 **Modern UI/UX**
- Clean, Apple-inspired design language
- Smooth animations and transitions
- **Strong invalid word feedback**:
  - Screen shake animation
  - Row highlighting in red
  - Automatic clearing of invalid entries
  - Visual row shake effect
- Centered message area for clear communication
- **Game history sidebar** with miniature game boards
- Visual feedback for all interactions

### 🔧 **Technical Features**
- Modular JSON-based word lists
- Async word loading with error handling
- **Local storage** for game history persistence
- **Social media optimization** with Open Graph tags
- No external dependencies
- Optimized performance and cross-browser compatibility
- **Duplicate rendering protection** for hosted environments

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for JSON file loading)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wordex-gaming.git
   cd wordex-gaming
   ```

2. **Start a local server**
   
   **Option 1: Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Option 2: Node.js**
   ```bash
   npx serve .
   ```
   
   **Option 3: PHP**
   ```bash
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
wordex-gaming/
├── 📄 index.html              # Main HTML structure with social meta tags
├── 🎨 style.css               # Responsive CSS with history sidebar
├── ⚡ script.js               # Game logic with history tracking
├── 📊 words.json              # 5,762 valid English words
├── 🗡️ souls-words.json        # 80 Dark Souls themed words
├── ⚔️ final-fantasy-words.json # 100 Final Fantasy themed words
├── 🖼️ wordex.png              # Game logo for social sharing
└── 📖 README.md               # This file
```

## 🎮 How to Play

1. **Choose Your Genre**: Select between Dark Souls and Final Fantasy themes
2. **Make Your Guess**: Type a 5-letter word using keyboard or on-screen keys
3. **Submit**: Press Enter to submit your guess
4. **Analyze Feedback**: Use color hints to refine your next guess
5. **Win or Learn**: Guess the word in 6 tries or see the answer!
6. **Track Progress**: View your game history in the sidebar (desktop) or bottom bar (mobile)

### 🎯 **Valid Guesses**
- Any 5-letter English word from the dictionary (~5,762 words)
- All gaming-themed words from both genres

### 🏆 **Target Words**
- **Dark Souls Mode**: Only Souls-series themed words
- **Final Fantasy Mode**: Only Final Fantasy themed words

### 📊 **Game History**
- **Desktop**: Left sidebar shows detailed game snapshots
- **Mobile**: Bottom bar with horizontal scrolling history
- **Color patterns**: Mini boards show your guess patterns without letters
- **Performance tracking**: Win/loss ratios and guess counts
- **Persistent storage**: History saved locally across sessions

## 🛠️ Customization

### Adding New Word Lists

1. **Create a new JSON file**:
   ```json
   {
     "words": [
       "word1",
       "word2",
       "word3"
     ]
   }
   ```

2. **Update `script.js`**:
   ```javascript
   // Add loading logic in loadWords()
   const newResponse = await fetch('new-words.json');
   const newData = await newResponse.json();
   newWordList = newData.words;
   ```

3. **Add genre button** in `index.html` and corresponding logic

### Modifying Styles

- Edit `style.css` for visual customizations
- Responsive breakpoints are clearly organized
- CSS custom properties for easy theme changes

### Game Logic

- Core game mechanics in `script.js`
- Modular functions for easy modification
- Well-commented code for maintainability

## 📝 Word List Sources

### Dark Souls Series
- Character names, locations, items, bosses
- Game mechanics and lore terms
- Curated for 5-letter words only

### Final Fantasy Series
- Characters from FF I-XV
- Summons, spells, and abilities
- Items, locations, and concepts
- Multi-game spanning vocabulary

### General Dictionary
- Common English 5-letter words
- Sourced from standard word lists
- Filtered for appropriate content

## 📈 Future Enhancements

- [ ] 🔊 Sound effects and music
- [ ] 📊 Advanced statistics and streaks
- [ ] 🏆 Achievement system with gaming-themed badges
- [ ] 🌙 Dark mode toggle
- [ ] 🎮 More gaming genres (Zelda, Pokemon, etc.)
- [ ] � PWA support for app-like installation
- [ ] 🌐 Multiplayer mode and challenges
- [ ] � Cloud sync for game history
- [ ] � Hint system with gaming lore
- [ ] 📤 Enhanced social sharing with game patterns

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Wordle** by Josh Wardle for the original game concept
- **FromSoftware** for the Souls series inspiration
- **Square Enix** for Final Fantasy universe
- Gaming communities for word suggestions and feedback


🎮 **Happy Gaming and Word Guessing!** 🎮
