import { getEnrolledCourses } from '@/lib/enrollments/enrollment.queries'
import type { Course } from '@/types/course'
import type { Student } from '@/types/student'

type StudentTableProps = {
  students: Student[]
  courses: Course[]
  hasStudents: boolean
  onEdit: (student: Student) => void
  onDelete: (student: Student) => void
  onManageEnrollment: (student: Student) => void
}

export function StudentTable({
  students,
  courses,
  hasStudents,
  onEdit,
  onDelete,
  onManageEnrollment,
}: StudentTableProps) {
  const hasResults = students.length > 0

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-medium text-slate-600">Mã HV</th>
              <th className="px-4 py-3 font-medium text-slate-600">Họ và tên</th>
              <th className="px-4 py-3 font-medium text-slate-600">Email</th>
              <th className="px-4 py-3 font-medium text-slate-600">Số điện thoại</th>
              <th className="px-4 py-3 font-medium text-slate-600">Ngày sinh</th>
              <th className="px-4 py-3 font-medium text-slate-600">Khóa học</th>
              <th className="px-4 py-3 text-right font-medium text-slate-600">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {!hasStudents && (
              <tr>
                <td colSpan={7} className="px-4 py-16 text-center text-slate-500">
                  Chưa có
                </td>
              </tr>
            )}

            {hasStudents && !hasResults && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                  Không tìm thấy học viên phù hợp
                </td>
              </tr>
            )}

            {hasResults &&
              students.map((student) => {
                const enrolledCourses = getEnrolledCourses(courses, student.id)

                return (
                  <tr
                    key={student.id}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/80"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{student.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{student.fullName}</td>
                    <td className="px-4 py-3 text-slate-600">{student.email}</td>
                    <td className="px-4 py-3 text-slate-600">{student.phone}</td>
                    <td className="px-4 py-3 text-slate-600">{student.dateOfBirth}</td>
                    <td className="px-4 py-3">
                      {enrolledCourses.length === 0 ? (
                        <span className="text-slate-400 italic">Chưa đăng ký</span>
                      ) : (
                        <ul className="space-y-0.5">
                          {enrolledCourses.map((course) => (
                            <li key={course.id} className="text-slate-700">
                              {course.name}{' '}
                              <span className="font-mono text-xs text-slate-500">
                                ({course.id})
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onManageEnrollment(student)}
                          className="rounded-md border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition hover:bg-primary/10"
                        >
                          Đăng ký khóa
                        </button>
                        <button
                          type="button"
                          onClick={() => onEdit(student)}
                          className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(student)}
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
