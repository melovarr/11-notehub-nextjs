import SidebarNotes from './@sidebar/SidebarNotes';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <aside style={{ minWidth: '200px' }}>
        <SidebarNotes />
      </aside>
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}