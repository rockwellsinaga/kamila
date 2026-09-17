// Membuat function hitungBMI
function hitungBMI() {

    // Mengambil nilai usia
    let usia = document.getElementById("usia").value;

    // Mengambil jenis kelamin
    let jenisKelamin = document.getElementById("jenisKelamin").value;

    // Mengambil tinggi badan
    let tinggi = document.getElementById("tinggi").value;

    // Mengambil berat badan
    let berat = document.getElementById("berat").value;


    // Mengecek apakah ada input yang kosong
    if (
        usia === "" ||
        jenisKelamin === "" ||
        tinggi === "" ||
        berat === ""
    ) {

        // Menampilkan pesan
        document.getElementById("hasil").innerHTML =
            "Semua data harus diisi!";

        // Menghentikan function
        return;
    }


    // Mengubah tinggi dari cm menjadi meter
    tinggi = tinggi / 100;


    // Menghitung BMI
    let bmi = berat / (tinggi * tinggi);


    // Membulatkan BMI menjadi 2 angka
    bmi = bmi.toFixed(2);


    // Membuat variabel kategori
    let kategori;


    // Menentukan kategori
    if (bmi < 18.5) {

        kategori = "Berat badan kurang";

    } else if (bmi < 25) {

        kategori = "Berat badan normal";

    } else if (bmi < 30) {

        kategori = "Berat badan berlebih";

    } else {

        kategori = "Obesitas";
    }


    // menampilkan hasil
    document.getElementById("hasil").innerHTML =

        "<div class='alert alert-success'>" +

        "<h4>Hasil BMI</h4>" +

        "<p>Usia: " + usia + " tahun</p>" +

        "<p>Jenis Kelamin: " + jenisKelamin + "</p>" +

        "<p>BMI: " + bmi + "</p>" +

        "<p>Kategori: " + kategori + "</p>" +

        "</div>";
}