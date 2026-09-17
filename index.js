document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. HISTORI OLAHRAGA
    // ==========================================
    // Ambil data 'sportLogs' dari LocalStorage (data yang disimpan tracker.js)
    const savedSportLogs = localStorage.getItem('sportLogs');

    if (savedSportLogs) {
        // Ubah teks JSON menjadi array
        const logs = JSON.parse(savedSportLogs);
        
        // Cek apakah ada isinya
        if (logs.length > 0) {
            // Ambil data paling terakhir diinput (elemen terakhir dalam array)
            const lastLog = logs[logs.length - 1];

            // Masukkan ke dalam HTML
            document.getElementById('lastSportName').innerText = lastLog.name;
            document.getElementById('lastSportDetail').innerText = `${lastLog.category} - ${lastLog.duration} Menit`;
            document.getElementById('lastSportTime').innerHTML = `<i class="fa-regular fa-clock"></i> Tanggal: ${lastLog.date}`;
        }
    }

    // ==========================================
    // 2. HISTORI BMI
    // ==========================================
    const savedBmi = localStorage.getItem('lastBmi');
    if (savedBmi) {
        const bmiData = JSON.parse(savedBmi);
        document.getElementById('lastBmiValue').innerText = `${bmiData.nilai} (${bmiData.kategori})`;
        document.getElementById('lastBmiDetail').innerText = `BB: ${bmiData.berat}kg | TB: ${bmiData.tinggi}cm`;
        document.getElementById('lastBmiTime').innerHTML = `<i class="fa-regular fa-clock"></i> ${bmiData.waktu}`;
    }

    // ==========================================
    // 3. HISTORI NUTRISI
    // ==========================================
    const savedNutrisi = localStorage.getItem('lastNutrisi');
    if (savedNutrisi) {
        const nutrisiData = JSON.parse(savedNutrisi);
        document.getElementById('lastNutrisiName').innerText = nutrisiData.makanan;
        document.getElementById('lastNutrisiDetail').innerText = nutrisiData.detail;
        document.getElementById('lastNutrisiTime').innerHTML = `<i class="fa-regular fa-clock"></i> ${nutrisiData.waktu}`;
    }

    // ==========================================
    // 4. HISTORI NOTES
    // ==========================================
    const savedNotes = localStorage.getItem('lastNotes');
    if (savedNotes) {
        const notesData = JSON.parse(savedNotes);
        document.getElementById('lastNotesTitle').innerText = notesData.judul;
        
        // Memotong teks jika terlalu panjang (maksimal 30 karakter agar kartu tetap rapi)
        let isiPendek = notesData.isi;
        if(isiPendek && isiPendek.length > 30) {
            isiPendek = isiPendek.substring(0, 30) + '...';
        }
        
        document.getElementById('lastNotesDetail').innerText = isiPendek;
        document.getElementById('lastNotesTime').innerHTML = `<i class="fa-regular fa-clock"></i> ${notesData.waktu}`;
    }

});