```
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
   Awal Permainan: Pemain memilih avatar dan memasukkan nama sebelum memulai semester.
   Status Bar:
   • Health: Menurun jika, lapar, atau tidak menjaga kebersihan.
   • Energy: Berkurang jika bergerak atau belajar terlalu lama.
   • Hunger: Berkurang setiap beberapa detik, bisa dipulihkan dengan makan.
   • Hygiene: Menurun setelah beraktivitas dan bisa dipulihkan dengan mandi.
   • Happiness: Naik jika melakukan aktivitas menyenangkan.
   • Money: Dimulai dengan Rp500.000, digunakan untuk makan, hiburan, dan kebutuhan lain.

2. Lokasi & Aktivitas
   a. 🏛 Kampus
      • Belajar (+10 Knowledge, -10 Energy)
      • Ngumpul sama teman (+5 Happiness, -5 Energy)
   b. 🏠 Kost/Rumah
      • Tidur (+30 Energy, -10 Hunger)
      • Mandi (+10 Hygiene)
      • Nonton TV (+5 Happiness, -Rp5.000)
      • Cuci tangan (+5 hygiene)
   c. 🍛 Kantin
      • Makan (+20 Hunger, -Rp15.000)
   d. 🛒 Minimarket
      • Beli makanan (+20 Hunger, -Rp10.000)
   e. ☕ Café
      • Nongkrong (+5 Happiness, -Rp25.000)
   f. 💼 Tempat Kerja Part-time
      • Kerja (+Rp100.000, -20 Energy)
   g. ⛪ Tempat Ibadah
      • Beribadah (+10 Happiness, +5 Hygiene)
   h. 🏖 Pantai
      • Bermain air (+15 Happiness, -10 Energy, -5 Hygiene)
      • Makan seafood (+20 Hunger, -Rp30.000)
   i. ⛰ Gunung
      • Hiking (+10 Happiness, -20 Energy, -10 Hunger)
      • Camping (+5 Happiness, -Rp50.000)
   j. 🏞 Danau
      • Bersantai (+10 Happiness, -5 Energy)
      • Mancing (+10 Hunger, -10 Energy)

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
```
