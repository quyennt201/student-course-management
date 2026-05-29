import { Link } from 'react-router-dom'
import { getCourseCapacityInfo } from '@/lib/courses/course.capacity'
import { useCourseStore } from '@/stores/useCourseStore'
import { useStudentStore } from '@/stores/useStudentStore'

export function DashboardPage() {
  const studentCount = useStudentStore((s) => s.students.length)
  const courses = useCourseStore((s) => s.courses)

  const draftCourses = courses.filter((c) => c.status === 'draft')
  const openCourses = courses.filter((c) => c.status === 'open')
  const closedCourses = courses.filter((c) => c.status === 'closed')
  const coursesWithSlots = openCourses.filter(
    (c) => getCourseCapacityInfo(c).slotStatus === 'available',
  )
  const fullCourses = openCourses.filter((c) => getCourseCapacityInfo(c).slotStatus === 'full')

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Tổng quan</h1>
        <p className="mt-1 text-sm text-slate-500">
          Chào mừng bạn đến bảng điều khiển quản lý đào tạo
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Tổng số học viên</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-slate-900">
            {studentCount}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Tổng khóa học</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-slate-900">
            {courses.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Khóa đang mở</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-emerald-700">
            {openCourses.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Bản nháp: {draftCourses.length} · Đã đóng: {closedCourses.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Chỗ khóa học (đang mở)</p>
          <p className="mt-2 text-sm text-slate-700">
            <span className="font-semibold text-sky-700">{coursesWithSlots.length}</span> còn chỗ
            {' · '}
            <span className="font-semibold text-red-700">{fullCourses.length}</span> đã đầy
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-medium text-slate-900">Quản lý học viên</h2>
          <p className="mt-1 text-sm text-slate-500">
            Danh sách, thêm mới và cập nhật thông tin học viên
          </p>
          <Link
            to="/student"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            Đi tới quản lý học viên
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-medium text-slate-900">Quản lý khóa học</h2>
          <p className="mt-1 text-sm text-slate-500">
            Bản nháp, mở/đóng, giới hạn học viên và chỗ trống
          </p>
          <Link
            to="/course"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            Đi tới quản lý khóa học
          </Link>
        </div>
      </div>
    </div>
  )
}
