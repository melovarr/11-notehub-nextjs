import { Metadata } from 'next';
import NotesClient from './Notes.client';

export const metadata: Metadata = {
  title: 'Notes | NoteHub',
  description: 'View and manage your notes',
};

export default function NotesPage() {
  return <NotesClient />;
}