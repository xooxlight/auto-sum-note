import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import { calculateSum, formatNumber } from '../utils';

interface Props {
  notesHook: ReturnType<typeof useNotes>;
}

export default function NoteDetail({ notesHook }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getNote, updateNote, moveToTrash } = notesHook;

  const note = id ? getNote(id) : undefined;

  const [content, setContent] = useState(note?.content || '');

  useEffect(() => {
    if (note) {
      setContent(note.content);
    }
  }, [note?.id]);

  if (!note || note.isDeleted) {
    return (
      <div className="page">
        <div className="empty-state">
          <h2>Note not found</h2>
          <br />
          <button onClick={() => navigate('/')} className="btn secondary">
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);
    updateNote(note.id, val);
  };

  const handleDelete = () => {
    moveToTrash(note.id);
    navigate('/');
  };

  const currentSum = calculateSum(content);

  return (
    <div className="page detail-page">
      <div className="detail-header">
        <button onClick={() => navigate('/')} className="btn secondary">
          ← Back
        </button>
        <div className="detail-sum-display">
          Sum: <strong>{formatNumber(currentSum)}</strong>
        </div>
        <button onClick={handleDelete} className="btn danger">
          Delete
        </button>
      </div>

      <textarea
        className="note-editor"
        value={content}
        onChange={handleChange}
        placeholder="Start typing your note here... Numbers like 42, -5.5 will be automatically summed up."
        autoFocus
      />
    </div>
  );
}
