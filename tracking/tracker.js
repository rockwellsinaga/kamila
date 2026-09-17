// Memanggil elemen HTML
const form = document.getElementById("sportForm");
const sportList = document.getElementById("sportList");
const totalDurationEl = document.getElementById("totalDuration");
const targetStatusEl = document.getElementById("targetStatus");
const checkStatusBtn = document.getElementById("checkStatusBtn");
const clearDataBtn = document.getElementById("clearDataBtn");
const dateInput = document.getElementById("date");

let logs = [];
const MIN_DURATION_RECOMMENDED = 30;

function loadData() {
  const savedData = localStorage.getItem("sportLogs");
  if (!savedData) return;

  try {
    const parsedData = JSON.parse(savedData);
    logs = Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    logs = [];
  }
}

function saveData() {
  localStorage.setItem("sportLogs", JSON.stringify(logs));
}

loadData();
dateInput.valueAsDate = new Date();
updateUI(dateInput.value);

dateInput.addEventListener("change", function () {
  updateUI(this.value);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const date = dateInput.value;
  const category = document.getElementById("category").value;
  const name = document.getElementById("name").value;
  const duration = parseInt(document.getElementById("duration").value);
  const reps = document.getElementById("reps").value || "N/A";
  const id = Date.now().toString();

  logs.push({ id, date, category, name, duration, reps });
  saveData();
  updateUI(date);
  checkRecommendation(date);

  const tempDate = date;
  form.reset();
  dateInput.value = tempDate;
});

clearDataBtn.addEventListener("click", function () {
  if (confirm("Yakin ingin menghapus SEMUA catatan?")) {
    localStorage.removeItem("sportLogs");
    logs = [];
    updateUI(dateInput.value);
  }
});

window.deleteLog = function (id) {
  logs = logs.filter((log) => log.id !== id);
  saveData();
  updateUI(dateInput.value);
};

checkStatusBtn.addEventListener("click", function () {
  checkRecommendation(dateInput.value);
});

function updateUI(currentDate) {
  sportList.innerHTML = "";
  let totalDurationToday = 0;
  let hasLogs = false;

  logs.forEach((log) => {
    if (log.date === currentDate) {
      hasLogs = true;
      totalDurationToday += log.duration;

      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm rounded";

      li.innerHTML = `
                <div class="ms-2 me-auto">
                    <div class="fw-bold text-primary">${log.category}</div>
                    <div>${log.name}</div>
                    <small class="text-muted">⏱️ ${log.duration} menit | 🔄 ${log.reps}</small>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteLog('${log.id}')">Hapus</button>
            `;
      sportList.appendChild(li);
    }
  });

  if (!hasLogs) {
    sportList.innerHTML =
      '<li class="list-group-item empty-state">Belum ada olahraga hari ini. Ayo mulai bergerak!</li>';
  }

  totalDurationEl.textContent = totalDurationToday;

  if (totalDurationToday >= MIN_DURATION_RECOMMENDED) {
    targetStatusEl.textContent = "Tercapai ✅";
    targetStatusEl.className = "text-success fw-bold";
  } else {
    targetStatusEl.textContent = "Belum Tercapai ❌";
    targetStatusEl.className = "text-danger fw-bold";
  }
}

function checkRecommendation(currentDate) {
  let totalDurationToday = 0;
  logs.forEach((log) => {
    if (log.date === currentDate) totalDurationToday += log.duration;
  });

  if (totalDurationToday === 0) {
    alert(
      "Peringatan: Anda belum olahraga hari ini!\n\nMenurut WHO, disarankan berolahraga minimal 30 menit per hari.",
    );
  } else if (totalDurationToday < MIN_DURATION_RECOMMENDED) {
    alert(
      `Anda baru berolahraga ${totalDurationToday} menit. Kurang ${MIN_DURATION_RECOMMENDED - totalDurationToday} menit lagi dari standar WHO!`,
    );
  } else {
    alert(
      `Hebat! 🎉\n\nTotal olahraga Anda ${totalDurationToday} menit.\nAnda sudah memenuhi standar kesehatan global (WHO).`,
    );
  }
}
