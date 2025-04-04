File Structure:
├── index.html # Main game page
├── css/
│ ├── style.css # Main styles
│ └── animations.css # Optional animations
├── js/
| ├── game.js # core game loop
│ ├── main.js # Game initialization
│ ├── player.js # Player stats and methods
│ ├── locations.js # Location definitions and activities
│ ├── events.js # Random events logic
│ ├── ui.js # UI updates and rendering
│ └── utils.js # Helper functions
└── assets/
├── images/ # Game graphics
│ ├── avatar/ # Player avatars
│ ├── locations/ # Location backgrounds
│ └── ui/ # UI elements
└── audio/ # Sound effects and music (optional)

Game: "Ucup Survive the Semester"
Ucup harus bertahan selama satu semester dengan mengelola kesehatan, energi, kebersihan, dan keuangannya, sambil tetap menikmati hidup sebagai mahasiswa.

1. Gameplay & Aturan
   • Awal Permainan: Pemain memilih avatar dan memasukkan nama sebelum memulai semester.
   • Status Bar:
   o Health: Menurun jika, lapar, atau tidak menjaga kebersihan.
   o Energy: Berkurang jika bergerak atau belajar terlalu lama.
   o Hunger: Berkurang setiap beberapa detik, bisa dipulihkan dengan makan.
   o Hygiene: Menurun setelah beraktivitas dan bisa dipulihkan dengan mandi.
   o Happiness: Naik jika melakukan aktivitas menyenangkan.
   o Money: Dimulai dengan Rp500.000, digunakan untuk makan, hiburan, dan kebutuhan lain.

2. Lokasi & Aktivitas
   • 🏛 Kampus
   o Belajar (+10 Knowledge, -10 Energy)
   o Ngumpul sama teman (+5 Happiness, -5 Energy)
   • 🏠 Kost/Rumah
   o Tidur (+30 Energy, -10 Hunger)
   o Mandi (+10 Hygiene)
   o Nonton TV (+5 Happiness, -Rp5.000)
   o Cuci tangan (+5 hygiene)
   • 🍛 Kantin
   o Makan (+20 Hunger, -Rp15.000)
   • 🛒 Minimarket
   o Beli makanan (+20 Hunger, -Rp10.000)
   • ☕ Café
   o Nongkrong (+5 Happiness, -Rp25.000)
   • 💼 Tempat Kerja Part-time
   o Kerja (+Rp100.000, -20 Energy)
   • ⛪ Tempat Ibadah
   o Beribadah (+10 Happiness, +5 Hygiene)
   • 🏖 Pantai
   o Bermain air (+15 Happiness, -10 Energy, -5 Hygiene)
   o Makan seafood (+20 Hunger, -Rp30.000)
   • ⛰ Gunung
   o Hiking (+10 Happiness, -20 Energy, -10 Hunger)
   o Camping (+5 Happiness, -Rp50.000)
   • 🏞 Danau
   o Bersantai (+10 Happiness, -5 Energy)
   o Mancing (+10 Hunger, -10 Energy)

3. Waktu & Status
   • 1 detik RL = 1 menit in-game
   • Tiap 10 detik, Hunger -1, Energy -1 jika tidak istirahat
   • Jika Health mencapai 0 → Game Over (pingsan dan gagal semester)

4. Event Acak
   • "Tugas mendadak! Butuh belajar ekstra." (-20 Energy, +10 Knowledge)
   • "Diskon di minimarket!" (Harga makanan lebih murah)
   • "Sakit karena kurang tidur!" (-20 Health, harus istirahat)
   • "Dompet jatuh di kampus!" (-Rp50.000)
   • "ketemu crazy rich baik hati!" (+Rp250.000)
   • “ikut giveaway” (+Rp,200.000)
   • “Dapat makan gratis abis jumatan” (+30 Hunger, + 10 Happiness)
