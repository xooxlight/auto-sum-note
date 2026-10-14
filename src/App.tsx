import { Routes, Route, NavLink } from 'react-router-dom';
import { useNotes } from './hooks/useNotes';
import NoteList from './pages/NoteList';
import NoteDetail from './pages/NoteDetail';
import Trash from './pages/Trash';

export default function App() {
  const notesHook = useNotes();

  return (
    <>
      <header className="app-header">
        <h1>AutoSumNote</h1>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Notes
          </NavLink>
          <NavLink to="/trash" className={({ isActive }) => (isActive ? 'active' : '')}>
            Trash
          </NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<NoteList notesHook={notesHook} />} />
          <Route path="/note/:id" element={<NoteDetail notesHook={notesHook} />} />
          <Route path="/trash" element={<Trash notesHook={notesHook} />} />
        </Routes>
      </main>
    </>
  );
}
