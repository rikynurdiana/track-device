# Device Tracker App

Aplikasi React sederhana untuk melacak Device ID unik berdasarkan karakteristik perangkat pengguna.

## 📋 Deskripsi

Aplikasi ini menghasilkan UUID unik untuk setiap perangkat yang mengakses aplikasi dengan menggunakan karakteristik perangkat seperti resolusi layar, kedalaman warna, dan informasi perangkat lainnya. UUID yang dihasilkan bersifat konsisten untuk perangkat yang sama.

## ✨ Fitur

- ✅ Menghasilkan Device UUID unik berdasarkan karakteristik perangkat
- ✅ Interface yang bersih dan mudah digunakan
- ✅ Responsive design
- ✅ Tidak memerlukan penyimpanan lokal
- ✅ Cross-platform compatibility

## 🛠️ Teknologi yang Digunakan

- **React 18** - Library JavaScript untuk membangun user interface
- **TypeScript** - Superset JavaScript dengan type safety
- **Vite** - Build tool yang cepat dan modern
- **CSS3** - Styling

## 🚀 Instalasi dan Menjalankan Aplikasi

### Prasyarat

Pastikan Anda telah menginstal:
- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd device-tracker-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Jalankan aplikasi dalam mode development**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

4. **Buka browser dan akses**
   ```
   http://localhost:5173
   ```

## 🏗️ Build untuk Production

```bash
npm run build
# atau
yarn build
```

File hasil build akan tersimpan di folder `dist/`.

## 📁 Struktur Project

```
device-tracker-app/
├── src/
│   ├── App.tsx          # Komponen utama aplikasi
│   ├── App.css          # Styling untuk aplikasi
│   └── main.tsx         # Entry point aplikasi
├── public/              # File statis
├── package.json         # Dependencies dan scripts
├── vite.config.ts       # Konfigurasi Vite
└── README.md           # Dokumentasi ini
```

## 🔧 Cara Kerja

### Algoritma Device UUID

1. **Pengumpulan Data Perangkat:**
   - Resolusi layar (dibulatkan ke 100 terdekat)
   - Kedalaman warna (default: 24)
   - Jumlah CPU core (default: 4)
   - Device Pixel Ratio (default: 1.00)

2. **Proses Hashing:**
   - Data perangkat digabungkan dengan separator `:`
   - Menggunakan algoritma hash custom (mirip MD5 sederhana)
   - Hasil hash diformat menjadi UUID standard

3. **Format UUID:**
   ```
   xxxxxxxx-xxxx-4xxx-bxxx-xxxxxxxxxxxx
   ```

### Fungsi Utama

#### `hashMD5(str: string)`
Fungsi hash sederhana yang mengkonversi string menjadi hash 32 karakter.

#### `roundToNearest(value: number, nearest: number)`
Membulatkan nilai ke kelipatan terdekat untuk mengurangi variasi kecil.

#### `getDeviceUUID()`
Fungsi utama yang menghasilkan Device UUID berdasarkan karakteristik perangkat.

## 🎯 Penggunaan

Setelah aplikasi berjalan, Device UUID akan otomatis ditampilkan di halaman utama. UUID ini akan konsisten untuk perangkat yang sama selama karakteristik perangkat tidak berubah signifikan.

## ⚠️ Catatan Penting

- UUID yang dihasilkan **tidak 100% unik** karena menggunakan karakteristik terbatas
- Perangkat dengan spesifikasi serupa mungkin menghasilkan UUID yang sama
- UUID dapat berubah jika terjadi perubahan resolusi layar atau pengaturan display
- Tidak cocok untuk kebutuhan keamanan tinggi atau identifikasi yang sangat presisi

## 🔒 Privacy

Aplikasi ini tidak menyimpan atau mengirim data ke server eksternal. Semua pemrosesan dilakukan di sisi client (browser).

## 🤝 Kontribusi

Kontribusi selalu diterima! Silakan:
1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambah fitur baru'`)
4. Push ke branch (`git push origin feature/fitur-baru`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini menggunakan lisensi MIT. Lihat file `LICENSE` untuk detail lebih lanjut.

## 📞 Kontak

Jika ada pertanyaan atau saran, silakan buat issue di repository ini.

---

**Dibuat dengan ❤️ menggunakan React + Vite**