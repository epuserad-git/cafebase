# Kopi Catat

Aplikasi pencatatan coffee shop, satu file HTML tanpa framework.

**Modul:** Dashboard, Penjualan, Order Online, Menu & Resep (dengan HPP dan laba per porsi), Stok (dengan harga beli), Member, Absensi, Pengeluaran, Tutup Kasir harian.

## Menjalankan

Buka `index.html` di browser, atau aktifkan GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).

## Pasang sebagai aplikasi (PWA)

Aplikasi ini sudah berupa PWA: bisa dipasang di layar utama HP/tablet dan tetap terbuka saat offline. Service worker hanya aktif lewat **HTTPS** (GitHub Pages sudah HTTPS) atau `localhost`, tidak lewat `file://`.

- **Android / Chrome / Edge:** ketuk tombol **Pasang** di pojok atas, atau menu ⋮ → *Instal aplikasi*.
- **iPhone / iPad (Safari):** ketuk **Bagikan** → *Tambah ke Layar Utama*.
- Tekan lama ikon di Android untuk pintasan *Catat penjualan*, *Stok*, dan *Tutup kasir*.

File PWA: `manifest.webmanifest`, `sw.js`, dan folder `icons/`. Semuanya harus ikut di-upload bersama `index.html`.

**Saat mengubah `index.html`:** naikkan `VERSION` di `sw.js` (mis. `v1` → `v2`). Pengguna akan melihat tombol **Perbarui** saat versi baru siap. Permintaan ke database cloud tidak pernah di-cache; sinkron offline tetap lewat antrean bawaan aplikasi.

## Tampilan HP & tablet

- HP: navigasi bawah, tabel otomatis menjadi kartu per baris, tombol dan isian berukuran nyaman disentuh (tanpa zoom otomatis iOS).
- Tablet: sidebar menjadi rel ikon di landscape, navigasi bawah di portrait.
- Mendukung notch / safe area dan mode landscape.

Semua data disimpan di database cloud. Cache di browser hanya dipakai saat offline dan dikirim otomatis begitu koneksi kembali. Backup di Dashboard tetap tersedia sebagai salinan cadangan.

## Menyambungkan cloud (wajib)

1. Jalankan `cloud-setup.sql` di editor SQL database cloud Anda.
2. Buka menu **Pengaturan**, isi alamat server dan kunci akses, lalu klik **Simpan & sambungkan**.

Aplikasi baru bisa dipakai setelah tersambung. Data lama di browser ikut dipindahkan ke cloud saat pertama kali tersambung. Kunci disimpan di browser pengguna, bukan di repo; ulangi langkah 2 di tiap perangkat. Jangan menaruh kunci di `index.html` jika repo bersifat publik.

> Catatan: belum ada login. Policy bawaan mengizinkan anon membaca dan menulis, jadi tambahkan autentikasi sebelum dipakai sungguhan.
