import { useNavigate } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import { calculateSum, formatNumber, getFirstLine } from '../utils';

interface Props {
  notesHook: ReturnType<typeof useNotes>;
}

export default function NoteList({ notesHook }: Props) {
  const { activeNotes, addNote } = notesHook;
  const navigate = useNavigate();

  const handleCreate = () => {
    const newId = addNote();
    navigate(`/note/${newId}`);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Your Notes</h2>
        <button onClick={handleCreate} className="btn primary">
          New Note
        </button>
      </div>

      {activeNotes.length === 0 ? (
        <div className="empty-state">
          <p>No notes yet. Click "New Note" to create one.</p>
        </div>
      ) : (
        <div className="note-grid">
          {activeNotes.map((note) => {
            const sum = calculateSum(note.content);
            const preview = getFirstLine(note.content);
            const dateStr = new Date(note.updatedAt).toLocaleDateString();

            return (
              <div key={note.id} className="note-card" onClick={() => navigate(`/note/${note.id}`)}>
                <div className="note-card-sum">Σ {formatNumber(sum)}</div>
                <div className="note-card-preview">{preview}</div>
                <div className="note-card-date">{dateStr}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
