import './App.css'
import ToDoLayout from './components/layout/TodoLayout'
import TaskList from './components/tasks/TaskList'
import useTasks from './hooks/useTasks'
import TaskPagination from './components/tasks/TaskPagination'
import { useMemo, useState, useCallback } from 'react'

const TASKS_PER_PAGE = 5

function App() {
  const { tasks, toggleTask, deleteTask } = useTasks()

  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(tasks.length / TASKS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)

  const paginatedTasks = useMemo(() => {
    const start = (safePage - 1) * TASKS_PER_PAGE
    return tasks.slice(start, start + TASKS_PER_PAGE)
  }, [tasks, safePage])

  const handleToggle = useCallback((task) => toggleTask(task.id), [toggleTask])
  const handleDelete = useCallback((task) => deleteTask(task.id), [deleteTask])

  return (
    <>
      <ToDoLayout>
        <TaskList
          tasks={paginatedTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
        <TaskPagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </ToDoLayout>
    </>
  )
}

export default App
