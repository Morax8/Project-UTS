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

// // Validate name input
// function validateName() {
//   const nameInput = document.getElementById('playerName');
//   const name = nameInput.value.trim();

//   if (name.length < 2) {
//     // Show error using SweetAlert2
//     Swal.fire({
//       title: 'Oops!',
//       text: 'Please enter a name with at least 2 characters',
//       icon: 'error',
//       confirmButtonColor: '#10b981',
//     });
//     return;
//   }

//   // Show character selection section
//   document.getElementById('nameSection').classList.add('hidden');
//   document.getElementById('characterSection').classList.remove('hidden');

//   // Initialize character selection
//   initCharacterSelection();
// }

// // Initialize character selection carousel
// function initCharacterSelection() {
//   // Make first character slide visible
//   const slides = document.querySelectorAll('.character-slide');
//   slides.forEach((slide, index) => {
//     if (index === 0) {
//       slide.classList.remove('hidden');
//     } else {
//       slide.classList.add('hidden');
//     }
//   });

//   // Add click event listeners to each character
//   slides.forEach((slide) => {
//     slide.addEventListener('click', function () {
//       selectCharacter(this.dataset.character);
//     });
//   });
// }

// // Change character in carousel
// function changeCharacter(direction) {
//   // Get all slides
//   const slides = document.querySelectorAll('.character-slide');

//   // Hide current slide
//   slides[currentCharacterIndex].classList.add('hidden');

//   // Update index
//   currentCharacterIndex = (currentCharacterIndex + direction + slides.length) % slides.length;

//   // Show new slide
//   slides[currentCharacterIndex].classList.remove('hidden');

//   // Reset selection
//   selectCharacter(characters[currentCharacterIndex]);
// }

// // Select character
// function selectCharacter(character) {
//   // Update selected character
//   selectedCharacter = character;

//   // Update button state
//   const nextButton = document.getElementById('characterNextBtn');
//   nextButton.disabled = false;
//   nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
//   nextButton.classList.add('hover:scale-105');

//   // Highlight selected character
//   const slides = document.querySelectorAll('.character-slide');
//   slides.forEach((slide) => {
//     if (slide.dataset.character === character) {
//       slide.classList.add('ring-2', 'ring-green-400', 'bg-white/10', 'rounded-lg');
//     } else {
//       slide.classList.remove('ring-2', 'ring-green-400', 'bg-white/10', 'rounded-lg');
//     }
//   });
// }

// // Show game rules section

// //Start game
// function startGame() {
//   const playerName = document.getElementById('playerName').value.trim();

//   // Save player information to localStorage or sessionStorage
//   const playerInfo = {
//     name: playerName,
//     character: selectedCharacter,
//   };

//   localStorage.setItem('playerInfo', JSON.stringify(playerInfo));

//   // Redirect to game page
//   window.location.href = 'games.html';
// }
