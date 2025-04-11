// script.js
const toggleButton = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');

let isCyberpunk = false;

toggleButton.addEventListener('click', () => {
  if (isCyberpunk) {
    themeStyle.href = 'default.css';
    toggleButton.textContent = 'Switch to Cyberpunk Mode';
  } else {
    themeStyle.href = 'cyberpunk.css';
    toggleButton.textContent = 'Switch to Default Mode';
  }
  isCyberpunk = !isCyberpunk;
});
