import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "todo-list:tasks";

const isValidTask = (task) =>
  task !== null &&
  typeof task === "object" &&
  typeof task.id === "string" &&
  typeof task.title === "string" &&
  typeof task.completed === "boolean" &&
  typeof task.createdAt === "string";

// Đọc an toàn: JSON lỗi, sai kiểu hoặc chưa có dữ liệu đều trả về []
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isValidTask) : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Storage đầy hoặc bị chặn: bỏ qua, app vẫn chạy
  }
}

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// Helper dùng chung: áp dụng hàm biến đổi lên đúng task theo id
const mapTaskById = (tasks, id, transform) =>
  tasks.map((task) => (task.id === id ? transform(task) : task));

export function useTasks() {
  const [tasks, setTasks] = useState(loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((title) => {
    const cleanTitle = String(title ?? "").trim();
    if (!cleanTitle) return;

    setTasks((prev) => [
      {
        id: generateId(),
        title: cleanTitle,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  }, []);

  const updateTask = useCallback((id, updates = {}) => {
    setTasks((prev) =>
      mapTaskById(prev, id, (task) => ({
        ...task,
        ...updates,
        // id và createdAt luôn giữ nguyên, title luôn được trim
        id: task.id,
        createdAt: task.createdAt,
        title:
          typeof updates.title === "string" ? updates.title.trim() : task.title,
      }))
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      mapTaskById(prev, id, (task) => ({ ...task, completed: !task.completed }))
    );
  }, []);

  return { tasks, addTask, updateTask, deleteTask, toggleTask };
}

export default useTasks;