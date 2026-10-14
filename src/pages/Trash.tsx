import { useNotes } from '../hooks/useNotes';
import { getFirstLine } from '../utils';

interface Props {
  notesHook: ReturnType<typeof useNotes>;
}

export default function Trash({ notesHook }: Props) {
  const { trashedNotes, restoreNote, deletePermanently, emptyTrash } = notesHook;

  return (
    <div className="page">
      <div className="page-header">
        <h2>Trash</h2>
        {trashedNotes.length > 0 && (
          <button onClick={emptyTrash} className="btn danger">
            Empty Trash
          </button>
        )}
      </div>

      {trashedNotes.length === 0 ? (
        <div className="empty-state">
          <p>Trash is empty.</p>
        </div>
      ) : (
        <div className="note-list">
          {trashedNotes.map((note) => (
            <div key={note.id} className="trash-item">
              <div className="trash-item-info">
                <strong>{getFirstLine(note.content)}</strong>
                <span>{new Date(note.updatedAt).toLocaleString()}</span>
              </div>
              <div className="trash-item-actions">
                <button onClick={() => restoreNote(note.id)} className="btn secondary">
                  Restore
                </button>
                <button onClick={() => deletePermanently(note.id)} className="btn danger">
                  Delete Permanently
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
