// DOM Elements
let playerAvatarElem;
let playerNameElem;
let timeDisplay;
let moneyDisplay;
let healthValue;
let energyValue;
let hungerValue;
let hygieneValue;
let happinessValue;
let knowledgeValue;
let healthFill;
let energyFill;
let hungerFill;
let hygieneFill;
let happinessFill;
let knowledgeFill;
let locationContainer;
let activitiesContainer;
let notificationContainer;
let currentActivityElem;
let progressBarElem;
let progressTextElem;
let gameoverScreen;

// UI Initialization
function initializeUI() {
  // Player info
  playerAvatarElem = document.getElementById('player-avatar');
  playerNameElem = document.getElementById('player-name');

  // Time and money
  timeDisplay = document.getElementById('time-display');
  moneyDisplay = document.getElementById('money-display');

  // Stats
  healthValue = document.getElementById('health-value');
  energyValue = document.getElementById('energy-value');
  hungerValue = document.getElementById('hunger-value');
  hygieneValue = document.getElementById('hygiene-value');
  happinessValue = document.getElementById('happiness-value');
  knowledgeValue = document.getElementById('knowledge-value');

  // Stat bars
  healthFill = document.getElementById('health-fill');
  energyFill = document.getElementById('energy-fill');
  hungerFill = document.getElementById('hunger-fill');
  hygieneFill = document.getElementById('hygiene-fill');
  happinessFill = document.getElementById('happiness-fill');
  knowledgeFill = document.getElementById('knowledge-fill');

  // Game containers
  locationContainer = document.getElementById('locations-container');
  activitiesContainer = document.getElementById('activities-container');
  notificationContainer = document.getElementById('notification-container');

  // Activity progress
  currentActivityElem = document.getElementById('current-activity');
  progressBarElem = document.getElementById('progress-bar');
  progressTextElem = document.getElementById('progress-text');

  // Game over screen
  gameoverScreen = document.getElementById('gameover-screen');

  // Initialize player info
  playerAvatarElem.textContent = player.avatar;
  playerNameElem.textContent = player.name;

  // Generate location buttons
  generateLocationButtons();

  // Show activities for current location
  updateActivities();

  // Update all stats display
  updateStatsDisplay();
}

// Generate location buttons in the UI
function generateLocationButtons() {
  locationContainer.innerHTML = '';

  for (const [key, location] of Object.entries(locations)) {
    const locationBtn = document.createElement('div');
    locationBtn.className = 'location-button';
    locationBtn.setAttribute('data-location', key);
    locationBtn.style.backgroundColor = location.bgColor;

    if (key === player.currentLocation) {
      locationBtn.classList.add('active');
    }

    locationBtn.innerHTML = `
        <div class="location-icon">${location.icon}</div>
        <div class="location-name">${location.name}</div>
      `;

    locationBtn.addEventListener('click', () => {
      if (!player.isBusy) {
        changeLocation(key);
      } else {
        showNotification('Kamu sedang sibuk, selesaikan dulu aktivitasmu!');
      }
    });

    locationContainer.appendChild(locationBtn);
  }
}

// Update activities list based on current location
function updateActivities() {
  activitiesContainer.innerHTML = '';
  const currentLocation = locations[player.currentLocation];

  // Update location background
  document.body.style.backgroundImage = `url('${currentLocation.backgroundImage}')`;

  // Generate activity buttons
  for (const activity of currentLocation.activities) {
    const activityBtn = document.createElement('div');
    activityBtn.className = 'activity-button';

    activityBtn.innerHTML = `
        <div class="activity-icon">${activity.icon}</div>
        <div class="activity-info">
          <div class="activity-name">${activity.name}</div>
          <div class="activity-description">${activity.description}</div>
          <div class="activity-details">
            <span class="activity-time">⏱️ ${formatMinutes(activity.timeRequired)}</span>
            ${activity.cost > 0 ? `<span class="activity-cost">💰 ${formatMoney(activity.cost)}</span>` : ''}
          </div>
        </div>
      `;

    activityBtn.addEventListener('click', () => {
      if (!player.isBusy) {
        startActivity(activity);
      } else {
        showNotification('Kamu sedang sibuk, selesaikan dulu aktivitasmu!');
      }
    });

    activitiesContainer.appendChild(activityBtn);
  }
}

// Get CSS class for bar color based on value
function getBarColorClass(value) {
  if (value <= 20) return 'bar-fill bar-danger';
  if (value <= 50) return 'bar-fill bar-warning';
  return 'bar-fill bar-success';
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;

  notificationContainer.appendChild(notification);

  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.classList.add('fadeout');
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3000);
}

// Update game time display
function updateTimeDisplay() {
  const hours = Math.floor(gameState.minute / 60);
  const minutes = gameState.minute % 60;
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12; // Convert to 12-hour format

  timeDisplay.textContent = `Hari ${gameState.dayCount} - ${displayHours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
}

// Update activity progress
function updateActivityProgress() {
  if (player.isBusy) {
    const totalMinutes = player.busyUntil - (gameState.minute - (player.busyUntil - player.busyUntil));
    const elapsedMinutes = gameState.minute - (player.busyUntil - totalMinutes);
    const progressPercent = Math.min(100, Math.max(0, (elapsedMinutes / totalMinutes) * 100));

    progressBarElem.style.width = `${progressPercent}%`;
    progressTextElem.textContent = `${Math.round(progressPercent)}%`;
  }
}
