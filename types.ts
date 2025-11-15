export interface User {
  _id: string;
  username: string;
  email: string;
  password: // In a real app, this would be a hash.
  string;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  code?: string;
  language?: string;
  image?: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  color?: string;
  userId: string;
}

export const NOTE_COLORS = [
  { name: 'Default', bg: 'bg-slate-700', text: 'text-slate-300' },
  { name: 'Teal', bg: 'bg-teal-500', text: 'text-teal-100' },
  { name: 'Green', bg: 'bg-green-500', text: 'text-green-100' },
  { name: 'Red', bg: 'bg-red-500', text: 'text-red-100' },
  { name: 'Yellow', bg: 'bg-yellow-500', text: 'text-yellow-100' },
  { name: 'Purple', bg: 'bg-purple-500', text: 'text-purple-100' },
];