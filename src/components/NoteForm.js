import React, { useState, useEffect } from 'react';

function NoteForm({ onAdd, onEdit, onCancelEdit, editNoteId, editNoteData }) {
  const MAX_TITLE_LENGTH = 50;

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (editNoteId) {
      setTitle(editNoteData.title);
      setBody(editNoteData.body);
    } else {
      setTitle('');
      setBody('');
    }
  }, [editNoteId, editNoteData]);

  const handleTitleChange = (e) => {
    const input = e.target.value;
    // Batasi input sampai 50 karakter
    if (input.length <= MAX_TITLE_LENGTH) {
      setTitle(input);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = { title, body };

    if (editNoteId) {
      onEdit(newNote);
    } else {
      onAdd(newNote);
    }

    setTitle('');
    setBody('');
  };

  const isValid = title.trim().length > 0; // Misal valid jika judul ada isinya

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md mb-6 border border-gray-300 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input Judul */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Judul Catatan
            </label>
            <input
              type="text"
              placeholder="Judul catatan"
              value={title}
              onChange={handleTitleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            />
            {/* Tampilkan jumlah karakter tersisa */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {MAX_TITLE_LENGTH - title.length} karakter tersisa
            </p>
          </div>

          {/* Input Isi */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Isi Catatan
            </label>
            <textarea
              placeholder="Tulis isi catatan..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white bg-white dark:bg-gray-700 min-h-[180px]"
            />
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            type="submit"
            disabled={!isValid}
            className={`${
              isValid
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-300 cursor-not-allowed'
            } text-white px-4 py-2 rounded transition`}
          >
            {editNoteId ? '💾 Simpan Perubahan' : '➕ Tambah Catatan'}
          </button>
          {editNoteId && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition"
            >
              ❌ Batal
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default NoteForm;
