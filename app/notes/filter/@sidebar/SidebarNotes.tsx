'use client';

import Link from 'next/link';
import { Tag } from '@/types/note';
import css from '@/components/TagsMenu/TagsMenu.module.css';

const tags: (Tag | 'All')[] = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link 
            href={tag === 'All' ? '/notes' : `/notes/filter/${tag}`}
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}