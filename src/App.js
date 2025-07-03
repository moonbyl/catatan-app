import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteData, setEditNoteData] = useState({ title: '', body: '' });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  // Ambil data dari localStorage saat pertama kali
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Simpan data ke localStorage setiap kali notes berubah
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    const noteWithId = {
      ...newNote,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      archived: false,
    };
    setNotes([...notes, noteWithId]);
  };

  const deleteNote = (id) => {
    const filtered = notes.filter((note) => note.id !== id);
    setNotes(filtered);
    if (id === editNoteId) {
      cancelEdit();
    }
  };

  const confirmDelete = (id) => {
    setNoteToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirmed = () => {
    deleteNote(noteToDelete);
    setShowConfirmModal(false);
  };

  const archiveNote = (id) => {
    const updated = notes.map((note) =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );
    setNotes(updated);
  };

  const startEditNote = (note) => {
    setEditNoteId(note.id);
    setEditNoteData({ title: note.title, body: note.body });
  };

  const updateNote = (updatedContent) => {
    const updatedNotes = notes.map((note) =>
      note.id === editNoteId
        ? { ...note, title: updatedContent.title, body: updatedContent.body }
        : note
    );
    setNotes(updatedNotes);
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditNoteId(null);
    setEditNoteData({ title: '', body: '' });
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const activeNotes = filteredNotes.filter((note) => !note.archived);
  const archivedNotes = filteredNotes.filter((note) => note.archived);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">📝 Aplikasi Catatan</h1>

      <NoteForm
        onAdd={addNote}
        onEdit={updateNote}
        onCancelEdit={cancelEdit}
        editNoteId={editNoteId}
        editNoteData={editNoteData}
      />

      <input
        type="text"
        placeholder="Cari judul catatan..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <h2 className="text-xl font-semibold mb-2">📂 Catatan Aktif</h2>
      <NoteList
        notes={activeNotes}
        onDelete={confirmDelete}
        onArchive={archiveNote}
        onEdit={startEditNote}
      />

      <h2 className="text-xl font-semibold mt-6 mb-2">📦 Arsip</h2>
      <NoteList
        notes={archivedNotes}
        onDelete={confirmDelete}
        onArchive={archiveNote}
        onEdit={startEditNote}
      />

      {/* Modal Konfirmasi Hapus */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p className="mb-4">Apakah kamu yakin ingin menghapus catatan ini?</p>
            <div className="flex gap-4">
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Ya
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
