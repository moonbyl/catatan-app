import React from 'react';

function NoteItem({ note, onDelete, onArchive, onEdit }) {
  const isArchived = note.archived;

  
  const formattedDate = new Date(note.createdAt).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 mb-4 border border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
      <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">
        {note.title}
      </h3>

      <p className="text-gray-700 dark:text-gray-300 mb-2">
        {note.body}
      </p>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        🕒 {formattedDate}
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onDelete(note.id)}
          className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 px-3 py-1 rounded-full text-sm transition"
        >
          🗑️ Hapus
        </button>

        <button
          onClick={() => onArchive(note.id)}
          className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800 px-3 py-1 rounded-full text-sm transition"
        >
          {isArchived ? '📤 Kembalikan' : '📥 Arsipkan'}
        </button>

        {!isArchived && (
          <button
            onClick={() => onEdit(note)}
            className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 px-3 py-1 rounded-full text-sm transition"
          >
            ✏️ Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default NoteItem;
