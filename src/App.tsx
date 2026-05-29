import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { StudentsPage } from '@/pages/StudentsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="student" element={<StudentsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
