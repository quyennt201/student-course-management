import { NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-lg px-3 py-2 text-sm font-medium transition',
    isActive
      ? 'bg-primary/10 text-primary'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  ].join(' ')

export function AppLayout() {
  return (
    <div className="min-h-svh bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="text-lg font-semibold tracking-tight text-slate-900">
            Quản lý đào tạo
          </NavLink>
          <nav className="flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              Tổng quan
            </NavLink>
            <NavLink to="/student" className={navLinkClass}>
              Học viên
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
