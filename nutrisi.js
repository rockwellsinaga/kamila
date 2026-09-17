
let daftarCatatan = JSON.parse(localStorage.getItem("dataPolaMakan")) || [];


document.addEventListener("DOMContentLoaded", tampilkanData);


// 1. CREATE 

function simpanCatatan() {
  const jumlahGelas = parseInt(document.getElementById("jumlahGelas").value) || 0;
  const adaKarbo = document.getElementById("karbo").checked;
  const adaProtein = document.getElementById("protein").checked;
  const adaBuah = document.getElementById("buah").checked;
  const adaLemakSehat = document.getElementById("lemakSehat").checked;
  const editIndex = parseInt(document.getElementById("editIndex").value);

  // Buat objek data baru
  const catatanBaru = {
    tanggal: new Date().toLocaleDateString("id-ID"),
    jumlahGelas: jumlahGelas,
    karbo: adaKarbo,
    protein: adaProtein,
    buah: adaBuah,
    lemakSehat: adaLemakSehat
  };

  if (editIndex === -1) {
    // CREATE: Tambah data baru
    daftarCatatan.push(catatanBaru);
    tampilkanAlertAnalisis(catatanBaru); // Alert khas Dr. Rizki
  } else {
    // UPDATE: Perbarui data yang ada
    daftarCatatan[editIndex] = catatanBaru;
    alert("✅ Catatan berhasil diperbarui!");
  }

  // Simpan data terbaru ke LocalStorage
  localStorage.setItem("dataPolaMakan", JSON.stringify(daftarCatatan));

  // Reset form dan refresh tabel (READ)
  resetForm();
  tampilkanData();
}


// 2. READ 

function tampilkanData() {
  const tabelBody = document.getElementById("tabelRiwayat");
  tabelBody.innerHTML = "";

  if (daftarCatatan.length === 0) {
    tabelBody.innerHTML = `<tr><td colspan="6">Belum ada catatan harian.</td></tr>`;
    return;
  }

  daftarCatatan.forEach((item, index) => {
    let komponenPiring = [];
    if (item.karbo) komponenPiring.push("Karbo");
    if (item.protein) komponenPiring.push("Protein");
    if (item.buah) komponenPiring.push("Buah");
    if (item.lemakSehat) komponenPiring.push("Lemak Sehat");

    const nutrisiLengkap = item.karbo && item.protein && item.buah && item.lemakSehat;
    const statusNutrisi = nutrisiLengkap ? "✅ Seimbang" : "❌ Belum Seimbang";

    tabelBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.tanggal}</td>
        <td>${item.jumlahGelas} Gelas</td>
        <td>${komponenPiring.join(", ") || "Kosong"}</td>
        <td>${statusNutrisi}</td>
        <td>
          <button class="btn-edit" onclick="persiapkanEdit(${index})">Edit</button>
          <button class="btn-hapus" onclick="hapusCatatan(${index})">Hapus</button>
        </td>
      </tr>
    `;
  });
}

// 3. UPDATE

function persiapkanEdit(index) {
  const item = daftarCatatan[index];

  document.getElementById("jumlahGelas").value = item.jumlahGelas;
  document.getElementById("karbo").checked = item.karbo;
  document.getElementById("protein").checked = item.protein;
  document.getElementById("buah").checked = item.buah;
  document.getElementById("lemakSehat").checked = item.lemakSehat;
  
  document.getElementById("editIndex").value = index;

  document.getElementById("formTitle").innerText = "Edit Catatan Harian";
  document.getElementById("btnSimpan").innerText = "Perbarui Catatan";
  document.getElementById("btnBatal").hidden = false;
}


// 4. DELETE (Menghapus Data)

function hapusCatatan(index) {
  if (confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
    daftarCatatan.splice(index, 1);
    localStorage.setItem("dataPolaMakan", JSON.stringify(daftarCatatan));
    tampilkanData();
  }
}


// LOGIKA ALERT & RESET FORM

function tampilkanAlertAnalisis(data) {
  let pesanAlert = "";

  pesanAlert += `--- STATUS AIR MINUM ---\n`;
  if (data.jumlahGelas >= 8 && data.jumlahGelas <= 10) {
    pesanAlert += `✅ Bagus! Anda sudah minum ${data.jumlahGelas} gelas hari ini (Sesuai anjuran Dr. Rizki yaitu 8-10 gelas perhari)🤗\n\n`;
  } else if (data.jumlahGelas > 10) {
    pesanAlert += `✅ Anda minum ${data.jumlahGelas} gelas hari ini. Kebutuhan cairan terpenuhi dengan sangat baik, membuat Dr. Rizki sangat senang😍\n\n`;
  } else {
    pesanAlert += `❌ Kurang! Anda baru minum ${data.jumlahGelas} gelas. Target harian adalah 8-10 gelas😡\n\n`;
  }

  pesanAlert += `--- STATUS ISI PIRINGKU ---\n`;
  const nutrisiLengkap = data.karbo && data.protein && data.buah && data.lemakSehat;

  if (nutrisiLengkap) {
    pesanAlert += `✅ Makan Anda sudah seimbang! (Karbo, Protein, Buah, & Lemak Sehat lengkap), pasti Dr. Rizki senang😉`;
  } else {
    let belumLengkap = [];
    if (!data.karbo) belumLengkap.push("Karbohidrat");
    if (!data.protein) belumLengkap.push("Protein");
    if (!data.buah) belumLengkap.push("Buah");
    if (!data.lemakSehat) belumLengkap.push("Lemak Sehat");

    pesanAlert += `❌ Makan Anda belum seimbang. Masih kurang: ${belumLengkap.join(", ")}😒`;
  }

  alert(pesanAlert);
}

function resetForm() {
  document.getElementById("jumlahGelas").value = "";
  document.getElementById("karbo").checked = false;
  document.getElementById("protein").checked = false;
  document.getElementById("buah").checked = false;
  document.getElementById("lemakSehat").checked = false;
  
  document.getElementById("editIndex").value = "-1";
  document.getElementById("formTitle").innerText = "Tambah Catatan Harian";
  document.getElementById("btnSimpan").innerText = "Simpan Catatan";
  document.getElementById("btnBatal").hidden = true;
}

function batalEdit() {
  resetForm();
}