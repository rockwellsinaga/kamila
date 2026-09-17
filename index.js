function readStorageArray(key) {
  try {
    const savedData = JSON.parse(localStorage.getItem(key));
    return Array.isArray(savedData) ? savedData : [];
  } catch (error) {
    return [];
  }
}

function setHistoryCard(valueId, detailId, timeId, value, detail, time) {
  document.getElementById(valueId).textContent = value || "Belum ada data";
  document.getElementById(detailId).textContent = detail || "-";
  document.getElementById(timeId).textContent = time || "-";
}

function formatTimestamp(timestamp) {
  if (!timestamp) return "-";

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return timestamp;

  return date.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function renderBmiHistory() {
  const bmiHistory = readStorageArray("bmiHistory");
  const lastBmi = bmiHistory[bmiHistory.length - 1];

  if (!lastBmi) return;

  setHistoryCard(
    "lastBmiValue",
    "lastBmiDetail",
    "lastBmiTime",
    `BMI ${lastBmi.bmi}`,
    `${lastBmi.kategori} • ${lastBmi.jenisKelamin}, ${lastBmi.usia} tahun`,
    formatTimestamp(lastBmi.createdAt),
  );
}

function renderSportHistory() {
  const sportLogs = readStorageArray("sportLogs");
  const lastSport = sportLogs[sportLogs.length - 1];

  if (!lastSport) return;

  setHistoryCard(
    "lastSportName",
    "lastSportDetail",
    "lastSportTime",
    lastSport.name,
    `${lastSport.category} • ${lastSport.duration} menit`,
    lastSport.date,
  );
}

function renderNutritionHistory() {
  const nutritionLogs = readStorageArray("dataPolaMakan");
  const lastNutrition = nutritionLogs[nutritionLogs.length - 1];

  if (!lastNutrition) return;

  const components = [];
  if (lastNutrition.karbo) components.push("Karbo");
  if (lastNutrition.protein) components.push("Protein");
  if (lastNutrition.buah) components.push("Buah");
  if (lastNutrition.lemakSehat) components.push("Lemak sehat");

  setHistoryCard(
    "lastNutrisiName",
    "lastNutrisiDetail",
    "lastNutrisiTime",
    `${lastNutrition.jumlahGelas} gelas air minum`,
    components.length ? components.join(", ") : "Belum ada isi piring dipilih",
    lastNutrition.tanggal,
  );
}

function renderNotesHistory() {
  const notes = readStorageArray("notes");
  const lastNote = notes[notes.length - 1];

  if (!lastNote) return;

  const preview = lastNote.content.length > 70
    ? `${lastNote.content.slice(0, 70)}…`
    : lastNote.content;

  setHistoryCard(
    "lastNotesTitle",
    "lastNotesDetail",
    "lastNotesTime",
    lastNote.title,
    `${lastNote.category} • ${preview}`,
    lastNote.date,
  );
}

renderBmiHistory();
renderSportHistory();
renderNutritionHistory();
renderNotesHistory();
