
function TaskItem({ task, onToggle, onEdit, onDelete }) {
  if (!task) return null;

  const isCompleted = task.completed ?? false;

  const createdDate = task.createdAt
    ? new Date(task.createdAt)
    : null;

  const formattedDate =
    createdDate && !Number.isNaN(createdDate.getTime())
      ? createdDate.toLocaleDateString("vi-VN")
      : "Chưa có ngày tạo";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px",
        marginBottom: "10px",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flex: 1,
          minWidth: 0,
        }}
      >
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle?.(task)}
        />

        <div>
          <div
            style={{
              textDecoration: isCompleted
                ? "line-through"
                : "none",
              color: isCompleted
                ? "#9ca3af"
                : "#111827",
              fontWeight: "500",
            }}
          >
            {task.title}
          </div>

          <div
            style={{
              fontSize: "13px",
              marginTop: "5px",
              color: "#6b7280",
            }}
          >
            Trạng thái:{" "}
            {isCompleted
              ? "Đã hoàn thành"
              : "Chưa hoàn thành"}
          </div>

          <div
            style={{
              fontSize: "13px",
              marginTop: "4px",
              color: "#6b7280",
            }}
          >
            Ngày tạo: {formattedDate}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
        }}
      >
        <button
          type="button"
          onClick={() => onEdit?.(task)}
        >
          Sửa
        </button>

        <button
          type="button"
          onClick={() => onDelete?.(task)}
        >
          Xóa
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
