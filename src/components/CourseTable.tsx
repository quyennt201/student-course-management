import {
  getCourseCapacityInfo,
  getCourseSlotLabel,
  getCourseStatusLabel,
} from '@/lib/courses/course.capacity'
import type { Course } from '@/types/course'

type CourseTableProps = {
  courses: Course[]
  hasCourses: boolean
  onView: (course: Course) => void
  onEdit: (course: Course) => void
  onDelete: (course: Course) => void
}

const statusBadgeClass: Record<Course['status'], string> = {
  draft: 'bg-slate-100 text-slate-600',
  open: 'bg-emerald-50 text-emerald-700',
  closed: 'bg-red-50 text-red-700',
}

function StatusBadge({ course }: { course: Course }) {
  return (
    <span
      className={[
        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
        statusBadgeClass[course.status],
      ].join(' ')}
    >
      {getCourseStatusLabel(course.status)}
    </span>
  )
}

function SlotBadge({ course }: { course: Course }) {
  const { slotStatus } = getCourseCapacityInfo(course)

  if (course.status === 'draft') {
    return (
      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
        Chưa mở
      </span>
    )
  }

  if (course.status === 'closed') {
    return (
      <span className="inline-flex rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
        Không áp dụng
      </span>
    )
  }

  if (slotStatus === 'full') {
    return (
      <span className="inline-flex rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
        Đã đầy
      </span>
    )
  }

  return (
    <span className="inline-flex rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700">
      Còn chỗ
    </span>
  )
}

export function CourseTable({
  courses,
  hasCourses,
  onView,
  onEdit,
  onDelete,
}: CourseTableProps) {
  const hasResults = courses.length > 0

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-medium text-slate-600">Mã KH</th>
              <th className="px-4 py-3 font-medium text-slate-600">Tên khóa học</th>
              <th className="px-4 py-3 font-medium text-slate-600">Trạng thái</th>
              <th className="px-4 py-3 font-medium text-slate-600">Đăng ký / Giới hạn</th>
              <th className="px-4 py-3 font-medium text-slate-600">Tình trạng chỗ</th>
              <th className="px-4 py-3 font-medium text-slate-600">Chi tiết</th>
              <th className="px-4 py-3 text-right font-medium text-slate-600">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {!hasCourses && (
              <tr>
                <td colSpan={7} className="px-4 py-16 text-center text-slate-500">
                  Chưa có
                </td>
              </tr>
            )}

            {hasCourses && !hasResults && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                  Không tìm thấy khóa học phù hợp
                </td>
              </tr>
            )}

            {hasResults &&
              courses.map((course) => {
                const { enrolledCount, maxStudents } = getCourseCapacityInfo(course)

                return (
                  <tr
                    key={course.id}
                    onClick={() => onView(course)}
                    className="cursor-pointer border-b border-slate-100 last:border-b-0 hover:bg-slate-50/80"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{course.id}</td>
                    <td className="px-4 py-3 font-medium text-primary">{course.name}</td>
                    <td className="px-4 py-3">
                      <StatusBadge course={course} />
                    </td>
                    <td className="px-4 py-3 tabular-nums text-slate-600">
                      {enrolledCount}/{maxStudents}
                    </td>
                    <td className="px-4 py-3">
                      <SlotBadge course={course} />
                    </td>
                    <td className="px-4 py-3 text-slate-600">{getCourseSlotLabel(course)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onEdit(course)
                          }}
                          className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete(course)
                          }}
                          className="rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
