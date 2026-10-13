
import TaskItem from "./TaskItem";

function TaskList({
  tasks = [],
  onToggle,
  onEdit,
  onDelete,
}) {
  return (
    <div>
      <h2>Danh sách công việc</h2>

      {tasks.length === 0 ? (
        <p>Chưa có công việc nào.</p>
      ) : (
        <div>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
