import { useMemo, useState } from 'react'
import { AddStudentModal } from '@/components/AddStudentModal'
import { DeleteStudentConfirmModal } from '@/components/DeleteStudentConfirmModal'
import { EditStudentModal } from '@/components/EditStudentModal'
import { StudentTable } from '@/components/StudentTable'
import { useDeleteStudent } from '@/hooks/useDeleteStudent'
import { filterStudentsByQuery } from '@/lib/students/student.search'
import { useStudentStore } from '@/stores/useStudentStore'
import type { Student } from '@/types/student'

export function StudentsPage() {
  const students = useStudentStore((s) => s.students)
  const [search, setSearch] = useState('')
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null)
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null)
  const { removeStudent } = useDeleteStudent()

  const filteredStudents = useMemo(
    () => filterStudentsByQuery(students, search),
    [students, search],
  )

  const hasStudents = students.length > 0

  return (
    <div className="min-h-svh bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Danh sách học viên
            </h1>
            <p className="mt-1 text-sm text-slate-500">Quản lý thông tin học viên</p>
          </div>
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Thêm học viên
          </button>
        </header>

        <div className="mb-6">
          <label htmlFor="student-search" className="sr-only">
            Tìm kiếm học viên
          </label>
          <input
            id="student-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên, email, SĐT, mã HV..."
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:max-w-md"
          />
        </div>

        <StudentTable
          students={filteredStudents}
          hasStudents={hasStudents}
          onEdit={(student) => setEditingStudentId(student.id)}
          onDelete={(student) => setDeletingStudent(student)}
        />
      </div>

      <AddStudentModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />
      <EditStudentModal
        studentId={editingStudentId}
        open={editingStudentId !== null}
        onClose={() => setEditingStudentId(null)}
      />
      <DeleteStudentConfirmModal
        student={deletingStudent}
        open={deletingStudent !== null}
        onClose={() => setDeletingStudent(null)}
        onConfirm={() => {
          if (!deletingStudent) return
          removeStudent(deletingStudent.id)
          if (editingStudentId === deletingStudent.id) {
            setEditingStudentId(null)
          }
          setDeletingStudent(null)
        }}
      />
    </div>
  )
}
