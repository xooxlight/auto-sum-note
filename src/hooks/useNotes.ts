import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Note } from '../types';

const STORAGE_KEY = 'auto-sum-notes-data';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const activeNotes = notes.filter((n) => !n.isDeleted).sort((a, b) => b.updatedAt - a.updatedAt);
  const trashedNotes = notes.filter((n) => n.isDeleted).sort((a, b) => b.updatedAt - a.updatedAt);

  const getNote = useCallback(
    (id: string) => {
      return notes.find((n) => n.id === id);
    },
    [notes],
  );

  const addNote = useCallback(() => {
    const newNote: Note = {
      id: uuidv4(),
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isDeleted: false,
    };
    setNotes((prev) => [...prev, newNote]);
    return newNote.id;
  }, []);

  const updateNote = useCallback((id: string, content: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, content, updatedAt: Date.now() } : n)),
    );
  }, []);

  const moveToTrash = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isDeleted: true, updatedAt: Date.now() } : n)),
    );
  }, []);

  const restoreNote = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isDeleted: false, updatedAt: Date.now() } : n)),
    );
  }, []);

  const deletePermanently = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const emptyTrash = useCallback(() => {
    setNotes((prev) => prev.filter((n) => !n.isDeleted));
  }, []);

  return {
    notes,
    activeNotes,
    trashedNotes,
    getNote,
    addNote,
    updateNote,
    moveToTrash,
    restoreNote,
    deletePermanently,
    emptyTrash,
  };
}
