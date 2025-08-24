'use client';

import { useState, useEffect } from 'react';
import { NotesService, Note, NotesResponse } from '@/services/notesService';
import { StickyNote, Phone, Clock, User, Plus } from 'lucide-react';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: NotesResponse = await NotesService.getNotes();
      setNotes(response.notes);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notes');
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Notes</h1>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Notes</h1>
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
          <p className="text-red-400">Error: {error}</p>
          <button 
            onClick={() => fetchNotes()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Notes</h1>
        <div className="flex items-center space-x-4">
          <div className="text-gray-400 text-sm">
            Total: {total} notes
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Note</span>
          </button>
        </div>
      </div>

      {notes.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <StickyNote className="mx-auto h-12 w-12 text-gray-500 mb-4" />
          <h3 className="text-white font-medium mb-2">No Notes</h3>
          <p className="text-gray-400">No notes have been created yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">
                    {NotesService.formatPhoneNumber(note.phoneNumber)}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{NotesService.getRelativeTime(note.createdAt)}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-200 text-sm leading-relaxed">
                  {note.content}
                </p>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>Employee ID: {note.employeId.slice(-6)}</span>
                </div>
                <div>
                  {NotesService.formatDate(note.createdAt)}
                </div>
              </div>
              
              {note.updatedAt !== note.createdAt && (
                <div className="mt-2 text-xs text-gray-600">
                  Updated: {NotesService.getRelativeTime(note.updatedAt)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
