# Kopi Catat

Aplikasi pencatatan coffee shop, satu file HTML tanpa framework.

**Modul:** Dashboard, Penjualan, Order Online, Menu & Resep (dengan HPP dan laba per porsi), Stok (dengan harga beli), Member, Absensi, Pengeluaran, Tutup Kasir harian.

## Menjalankan

Buka `index.html` di browser, atau aktifkan GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).

Semua data disimpan di database cloud. Cache di browser hanya dipakai saat offline dan dikirim otomatis begitu koneksi kembali. Backup di Dashboard tetap tersedia sebagai salinan cadangan.

## Menyambungkan cloud (wajib)

1. Jalankan `cloud-setup.sql` di editor SQL database cloud Anda.
2. Buka menu **Pengaturan**, isi alamat server dan kunci akses, lalu klik **Simpan & sambungkan**.

Aplikasi baru bisa dipakai setelah tersambung. Data lama di browser ikut dipindahkan ke cloud saat pertama kali tersambung. Kunci disimpan di browser pengguna, bukan di repo; ulangi langkah 2 di tiap perangkat. Jangan menaruh kunci di `index.html` jika repo bersifat publik.

> Catatan: belum ada login. Policy bawaan mengizinkan anon membaca dan menulis, jadi tambahkan autentikasi sebelum dipakai sungguhan.
