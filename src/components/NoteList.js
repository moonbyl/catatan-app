import React from 'react';
import NoteItem from './NoteItem';

function NoteList({ notes, onDelete, onArchive, onEdit }) {
  if (notes.length === 0) {
    return <p className="text-gray-500 italic">Tidak ada catatan.</p>;
  }

  
  const sortedNotes = [...notes].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedNotes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchive={onArchive}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default NoteList;
