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
  if (usia === "" || jenisKelamin === "" || tinggi === "" || berat === "") {
    document.getElementById("hasil").innerHTML =
      "<div class='alert alert-danger mb-0'>Semua data harus diisi!</div>";

    return;
  }

  if (Number(usia) <= 0 || Number(tinggi) <= 0 || Number(berat) <= 0) {
    document.getElementById("hasil").innerHTML =
      "<div class='alert alert-danger mb-0'>Usia, tinggi badan, dan berat badan harus lebih dari 0.</div>";
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

  // Menyimpan hasil agar dapat ditampilkan kembali pada dashboard KAMILA.
  const bmiHistory = JSON.parse(localStorage.getItem("bmiHistory")) || [];
  bmiHistory.push({
    usia: usia,
    jenisKelamin: jenisKelamin,
    bmi: bmi,
    kategori: kategori,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem("bmiHistory", JSON.stringify(bmiHistory));

  // menampilkan hasil
  document.getElementById("hasil").innerHTML =
    "<div class='alert alert-success'>" +
    "<h4>Hasil BMI</h4>" +
    "<p>Usia: " +
    usia +
    " tahun</p>" +
    "<p>Jenis Kelamin: " +
    jenisKelamin +
    "</p>" +
    "<p>BMI: " +
    bmi +
    "</p>" +
    "<p>Kategori: " +
    kategori +
    "</p>" +
    "</div>";
}
