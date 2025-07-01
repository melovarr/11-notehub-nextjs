'use client';

import css from './SidebarNotes.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';

export default function SidebarNotes() {
  return (
    <aside className={css.sidebar}>
      <TagsMenu />
    </aside>
  );
}