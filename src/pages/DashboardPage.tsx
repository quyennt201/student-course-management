import { Link } from 'react-router-dom'
import { useStudentStore } from '@/stores/useStudentStore'

export function DashboardPage() {
  const studentCount = useStudentStore((s) => s.students.length)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Tổng quan</h1>
        <p className="mt-1 text-sm text-slate-500">
          Chào mừng bạn đến bảng điều khiển quản lý đào tạo
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Tổng số học viên</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-slate-900">
            {studentCount}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:col-span-2">
          <h2 className="text-sm font-medium text-slate-900">Thao tác nhanh</h2>
          <p className="mt-1 text-sm text-slate-500">
            Quản lý danh sách, thêm mới và cập nhật thông tin học viên
          </p>
          <Link
            to="/student"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            Đi tới quản lý học viên
          </Link>
        </div>
      </div>
    </div>
  )
}
