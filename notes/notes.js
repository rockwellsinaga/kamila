// Array utama untuk menyimpan semua object note.
// Jika localStorage belum memiliki data, nilainya akan menjadi array kosong [].
function loadNotes() {
  try {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    return Array.isArray(savedNotes) ? savedNotes : [];
  } catch (error) {
    return [];
  }
}

let notes = loadNotes();

// Menyimpan id note yang sedang diedit dan kategori filter yang aktif.
let editingId = null;
let selectedCategory = "All";

// Mengambil elemen HTML agar bisa digunakan oleh JavaScript.
const noteForm = document.getElementById("noteForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const categoryInput = document.getElementById("category");
const moodInput = document.getElementById("mood");
const searchInput = document.getElementById("searchInput");
const notesContainer = document.getElementById("notesContainer");
const noteCount = document.getElementById("noteCount");
const submitButton = document.getElementById("submitButton");
const cancelEditButton = document.getElementById("cancelEditButton");
const categoryButtons = document.querySelectorAll(".category-filter");

// Menyimpan array notes ke localStorage browser.
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Menampilkan note di halaman berdasarkan search dan kategori yang dipilih.
function renderNotes() {
  notesContainer.innerHTML = "";

  const keyword = searchInput.value.toLowerCase();
  const filteredNotes = [];

  // Memilih note yang sesuai dengan kata pencarian dan kategori.
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const matchSearch =
      note.title.toLowerCase().includes(keyword) ||
      note.content.toLowerCase().includes(keyword);
    const matchCategory =
      selectedCategory === "All" || note.category === selectedCategory;

    if (matchSearch && matchCategory) {
      filteredNotes.push(note);
    }
  }

  noteCount.textContent =
    filteredNotes.length + " dari " + notes.length + " catatan";

  if (filteredNotes.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-state";
    emptyMessage.textContent = "Belum ada catatan yang sesuai.";
    notesContainer.appendChild(emptyMessage);
    return;
  }

  // Loop dari data terakhir agar note terbaru tampil di atas.
  for (let i = filteredNotes.length - 1; i >= 0; i--) {
    const note = filteredNotes[i];

    const noteElement = document.createElement("article");
    noteElement.className = "note-card card";

    const noteTitle = document.createElement("h3");
    noteTitle.textContent = note.title;

    const noteContent = document.createElement("p");
    noteContent.className = "note-content";
    noteContent.textContent = note.content;

    const categoryText = document.createElement("span");
    categoryText.className = "tag";
    categoryText.textContent = note.category;

    const moodText = document.createElement("span");
    moodText.className = "tag";
    moodText.textContent = note.mood;

    const dateText = document.createElement("p");
    dateText.className = "metadata";
    dateText.textContent = "Dibuat: " + note.date;

    const actionContainer = document.createElement("div");
    actionContainer.className = "note-actions";

    const editButton = document.createElement("button");
    editButton.className = "button edit btn";
    editButton.type = "button";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      editNote(note.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "button delete btn";
    deleteButton.type = "button";
    deleteButton.textContent = "Hapus";
    deleteButton.addEventListener("click", function () {
      deleteNote(note.id);
    });

    actionContainer.appendChild(editButton);
    actionContainer.appendChild(deleteButton);
    noteElement.appendChild(noteTitle);
    noteElement.appendChild(noteContent);
    noteElement.appendChild(categoryText);
    noteElement.appendChild(moodText);
    noteElement.appendChild(dateText);
    noteElement.appendChild(actionContainer);
    notesContainer.appendChild(noteElement);
  }
}

// Mengembalikan form ke mode create note.
function resetForm() {
  noteForm.reset();
  editingId = null;
  submitButton.textContent = "Simpan catatan";
  cancelEditButton.hidden = true;
}

// Create note baru atau update note yang sedang diedit.
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const category = categoryInput.value;
  const mood = moodInput.value;

  if (title === "" || content === "") {
    alert("Judul dan isi catatan harus diisi.");
    return;
  }

  if (editingId !== null) {
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === editingId) {
        notes[i].title = title;
        notes[i].content = content;
        notes[i].category = category;
        notes[i].mood = mood;
        break;
      }
    }
  } else {
    const newNote = {
      id: Date.now(),
      title: title,
      content: content,
      category: category,
      mood: mood,
      date: new Date().toLocaleDateString("id-ID"),
    };

    notes.push(newNote);
  }

  saveNotes();
  resetForm();
  renderNotes();
});

// Mengisi form dengan data note yang dipilih agar bisa diedit.
function editNote(id) {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      titleInput.value = notes[i].title;
      contentInput.value = notes[i].content;
      categoryInput.value = notes[i].category;
      moodInput.value = notes[i].mood;
      editingId = id;
      submitButton.textContent = "Perbarui catatan";
      cancelEditButton.hidden = false;
      titleInput.focus();
      break;
    }
  }
}

// Menghapus note setelah user menyetujui konfirmasi.
function deleteNote(id) {
  const confirmDelete = confirm(
    "Apakah kamu yakin ingin menghapus catatan ini?",
  );

  if (!confirmDelete) {
    return;
  }

  const newNotes = [];

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id !== id) {
      newNotes.push(notes[i]);
    }
  }

  notes = newNotes;

  if (editingId === id) {
    resetForm();
  }

  saveNotes();
  renderNotes();
}

// Membatalkan edit dan mengosongkan form.
cancelEditButton.addEventListener("click", function () {
  resetForm();
});

// Menampilkan ulang note saat user mengetik di kolom search.
searchInput.addEventListener("input", function () {
  renderNotes();
});

// Memasang event listener pada setiap tombol kategori.
for (let i = 0; i < categoryButtons.length; i++) {
  categoryButtons[i].addEventListener("click", function () {
    selectedCategory = categoryButtons[i].dataset.category;

    for (let j = 0; j < categoryButtons.length; j++) {
      categoryButtons[j].classList.remove("active");
    }

    categoryButtons[i].classList.add("active");
    renderNotes();
  });
}

// Menampilkan data yang tersimpan ketika halaman pertama kali dibuka.
renderNotes();
