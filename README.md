# KAMILA

KAMILA adalah aplikasi web sederhana untuk membantu pengguna mencatat dan memantau kebiasaan kesehatan sehari-hari. Seluruh data disimpan secara lokal di browser, sehingga aplikasi dapat digunakan tanpa akun dan tanpa server.

## Fitur

- **Kalkulator BMI** — menghitung indeks massa tubuh, menampilkan kategorinya, dan menyimpan hasil perhitungan terakhir.
- **Tracker Olahraga** — mencatat jenis olahraga, durasi, repetisi, serta memantau target aktivitas harian 30 menit.
- **Pantau Nutrisi** — mencatat jumlah air minum dan komponen "Isi Piringku" untuk melihat keseimbangan asupan.
- **Notes** — membuat, mencari, memfilter, mengubah, dan menghapus catatan pribadi.
- **Dashboard** — menyediakan navigasi ke seluruh fitur dan rangkuman pencatatan terakhir dari setiap fitur.

## Teknologi

- HTML5
- CSS3
- JavaScript (Vanilla JavaScript)
- [Bootstrap 5](https://getbootstrap.com/) dengan tema [Bootswatch Minty](https://bootswatch.com/minty/)
- Font Awesome
- Browser `localStorage`

## Menjalankan proyek secara lokal

Proyek ini tidak membutuhkan instalasi dependensi atau proses build.

1. Clone repositori ini.
2. Jalankan dengan server statis, misalnya ekstensi Live Server di VS Code atau perintah berikut:

   ```bash
   python -m http.server 8000
   ```

3. Buka `http://localhost:8000` di browser.

> Gunakan server lokal saat pengembangan agar perilaku `localStorage` konsisten. Membuka berkas HTML langsung juga dapat bekerja, tetapi kebijakan browser untuk `file://` dapat berbeda-beda.

## Deployment

KAMILA dapat dideploy sebagai situs statis ke GitHub Pages, Netlify, atau Vercel.

### GitHub Pages

1. Push seluruh perubahan ke repositori GitHub.
2. Buka **Settings** → **Pages**.
3. Pilih branch yang akan dipublikasikan, biasanya `main`, dengan folder root `/`.
4. Simpan pengaturan dan buka URL GitHub Pages yang diberikan.

Tidak ada environment variable, database, ataupun backend yang perlu dikonfigurasi.

## Penyimpanan data

Data disimpan di `localStorage` browser dengan key berikut:

| Fitur | Key |
| --- | --- |
| BMI | `bmiHistory` |
| Tracker Olahraga | `sportLogs` |
| Nutrisi | `dataPolaMakan` |
| Notes | `notes` |

Data hanya tersedia pada browser dan origin yang sama. Menghapus data situs/browser akan menghapus riwayat KAMILA pada perangkat tersebut.

## Pengembang

- [@fathanarief](https://github.com/fathanarief)
- [@MuhammadFardianBilqisthi](https://github.com/MuhammadFardianBilqisthi)
- [@rizkiapriadi48-dev](https://github.com/rizkiapriadi48-dev)
- [@rockwellsinaga](https://github.com/rockwellsinaga)
