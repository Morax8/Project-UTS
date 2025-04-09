let playerName = '';
let selectedCharacter = '';

function showNameInput() {
  document.getElementById('welcomeSection').style.display = 'none';
  document.getElementById('nameSection').style.display = 'block';
}

function validateName() {
  const nameInput = document.getElementById('playerName');
  if (nameInput.value.trim() === '') {
    //sweetalert2
    Swal.fire({
      title: 'Invalid Name',
      text: 'Please enter a valid name to continue.',
      icon: 'error',
      confirmButtonText: 'OK',
      heightAuto: false,
      customClass: {
        popup: 'my-custom-popup',
      },
    });
  } else {
    playerName = nameInput.value.trim();
    // Save player name to localStorage or sessionStorage
    localStorage.setItem('playerName', playerName);

    // Hide welcome n name section
    document.getElementById('welcomeSection').classList.add('hidden');
    document.getElementById('nameSection').classList.add('hidden');
    // Show character section
    document.getElementById('characterSection').classList.remove('hidden');
  }
}

// Also modify showNameInput function for consistency
function showNameInput() {
  document.getElementById('welcomeSection').classList.add('hidden');
  document.getElementById('nameSection').classList.remove('hidden');
}

let currentCharacterIndex = 0;
const characters = ['warrior', 'mage', 'archer'];

function changeCharacter(direction) {
  // Remove current character slide
  const currentSlide = document.querySelector('.character-slide:not(.hidden)');
  currentSlide.classList.add('hidden');
  currentSlide.classList.remove('flex');

  // Update index
  currentCharacterIndex = (currentCharacterIndex + direction + characters.length) % characters.length;

  // Show new character slide
  const newSlide = document.querySelector(`.character-slide[data-character="${characters[currentCharacterIndex]}"]`);
  newSlide.classList.remove('hidden');
  newSlide.classList.add('flex');

  // Enable Next button and update selected character
  const nextBtn = document.getElementById('characterNextBtn');
  nextBtn.disabled = false;
  nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');

  // Update selected character for game logic
  selectedCharacter = characters[currentCharacterIndex];
}

function selectCharacter(event, character) {
  // This function can be kept for potential future use or removed
  selectedCharacter = character;
  localStorage.setItem('selectedCharacter', character); // Save selected character to localStorage

  const nextBtn = document.getElementById('characterNextBtn');
  nextBtn.disabled = false;
  nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
}

function showRules() {
  document.getElementById('characterSection').classList.add('hidden');
  document.getElementById('rulesSection').classList.remove('hidden');
}

function startGame() {
  Swal.fire({
    title: 'Welcome to the game!',
    text: `Welcome, ${playerName}! You've chosen the ${selectedCharacter}. Let the game begin!`,
    icon: 'success',
    heightAuto: false,
    customClass: {
      popup: 'my-custom-popup',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = 'games.html';
    }
  });
}
