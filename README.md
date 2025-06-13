# 🎮 WordEX Gaming - A Gaming-Themed Wordle Clone

A modern, responsive Wordle-style word guessing game featuring gaming themes from **Dark Souls** and **Final Fantasy** series. Built with vanilla HTML, CSS, and JavaScript.

![WordEX Gaming Screenshot](https://via.placeholder.com/800x600/007aff/ffffff?text=WordEX+Gaming)

## ✨ Features

### 🎯 **Core Gameplay**
- Classic Wordle mechanics with 6 attempts to guess a 5-letter word
- Real-time feedback with color-coded hints:
  - 🟢 **Green**: Correct letter in correct position
  - 🟡 **Yellow**: Correct letter in wrong position
  - ⚫ **Gray**: Letter not in the word
- Physical and on-screen keyboard support

### 🎮 **Gaming Themes**
- **Dark Souls**: Words from Demon's Souls, Dark Souls, Bloodborne, Sekiro, and Elden Ring
- **Final Fantasy**: Characters, spells, items, and concepts from the FF universe
- Easy genre switching with dedicated buttons
- 180+ curated gaming words (80 Souls + 100 Final Fantasy)

### 📱 **Responsive Design**
- **Mobile-first** approach with optimized layouts
- Adaptive sizing for all screen sizes:
  - 📱 Small phones (≤480px)
  - 📱 Mobile (≤768px)
  - 📟 Tablet (769px-1024px)
  - 💻 Desktop (1025px-1439px)
  - 🖥️ Large Desktop (≥1440px)

### 🎨 **Modern UI/UX**
- Clean, Apple-inspired design language
- Smooth animations and transitions
- **Strong invalid word feedback**:
  - Screen shake animation
  - Row highlighting in red
  - Automatic clearing of invalid entries
  - Visual row shake effect
- Centered message area for clear communication
- Visual feedback for all interactions

### 🔧 **Technical Features**
- Modular JSON-based word lists
- Async word loading with error handling
- No external dependencies
- Optimized performance
- Cross-browser compatibility

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
├── 📄 index.html              # Main HTML structure
├── 🎨 style.css               # Responsive CSS styling
├── ⚡ script.js               # Game logic and interactions
├── 📊 words.json              # 5,762 valid English words
├── 🗡️ souls-words.json        # 80 Dark Souls themed words
├── ⚔️ final-fantasy-words.json # 100 Final Fantasy themed words
└── 📖 README.md               # This file
```

## 🎮 How to Play

1. **Choose Your Genre**: Select between Dark Souls and Final Fantasy themes
2. **Make Your Guess**: Type a 5-letter word using keyboard or on-screen keys
3. **Submit**: Press Enter to submit your guess
4. **Analyze Feedback**: Use color hints to refine your next guess
5. **Win or Learn**: Guess the word in 6 tries or see the answer!

### 🎯 **Valid Guesses**
- Any 5-letter English word from the dictionary (~5,762 words)
- All gaming-themed words from both genres

### 🏆 **Target Words**
- **Dark Souls Mode**: Only Souls-series themed words
- **Final Fantasy Mode**: Only Final Fantasy themed words

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

## 🎨 Design Philosophy

### Visual Design
- **Minimalist**: Clean, distraction-free interface
- **Accessible**: High contrast, readable fonts
- **Responsive**: Seamless experience across devices
- **Gaming-Inspired**: Subtle nods to gaming aesthetics

### User Experience
- **Intuitive**: Familiar Wordle mechanics
- **Engaging**: Smooth animations and feedback
- **Forgiving**: Clear error messages and auto-correction
- **Rewarding**: Satisfying visual and audio cues

## 🔧 Technical Details

### Performance
- Lazy loading of word lists
- Efficient DOM manipulation
- CSS animations over JavaScript
- Minimal memory footprint

### Compatibility
- **Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Devices**: Desktop, tablet, mobile
- **Input**: Mouse, touch, keyboard

### File Sizes
- **HTML**: ~1KB
- **CSS**: ~15KB
- **JavaScript**: ~8KB
- **Word Lists**: ~50KB total

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution
- 🎮 New gaming word lists
- 🎨 UI/UX improvements
- 🔧 Performance optimizations
- 🐛 Bug fixes
- 📚 Documentation improvements
- 🌐 Internationalization

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

## 🐛 Known Issues

- None currently! 🎉

## 📈 Future Enhancements

- [ ] 🔊 Sound effects and music
- [ ] 📊 Statistics tracking
- [ ] 🏆 Achievement system
- [ ] 🌙 Dark mode toggle
- [ ] 🎮 More gaming genres
- [ ] 💾 Local storage for progress
- [ ] 📱 PWA support
- [ ] 🌐 Multiplayer mode

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Wordle** by Josh Wardle for the original game concept
- **FromSoftware** for the Souls series inspiration
- **Square Enix** for Final Fantasy universe
- Gaming communities for word suggestions and feedback

## 📞 Contact

- **Author**: Your Name
- **Email**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Project Link**: [https://github.com/yourusername/wordex-gaming](https://github.com/yourusername/wordex-gaming)

---

⭐ **Star this repo** if you enjoyed playing WordEX Gaming!

🎮 **Happy Gaming and Word Guessing!** 🎮
