import React from 'react';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    alignItems: 'flex-end',
    padding: '16px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    boxSizing: 'border-box',
    width: '100%',
  },
  filterItemSearch: {
    flex: '3 1 240px',
    minWidth: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  filterItemStatus: {
    flex: '1 1 180px',
    minWidth: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#334155',
    cursor: 'pointer',
    display: 'inline-block',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#0f172a',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  select: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#0f172a',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
};

const TaskFilters = ({
  search = '',
  onSearchChange,
  filter = 'all',
  onFilterChange,
}) => {
  return (
    <div className="task-filters-container" style={styles.container}>
      <style>{`
        .task-filter-input:focus,
        .task-filter-select:focus {
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2) !important;
        }
      `}</style>

      {/* Ô tìm kiếm */}
      <div className="filter-item" style={styles.filterItemSearch}>
        <label htmlFor="search-input" style={styles.label}>
          Tìm kiếm công việc
        </label>
        <input
          id="search-input"
          className="task-filter-input"
          type="text"
          placeholder="Nhập tên công việc..."
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Bộ lọc trạng thái */}
      <div className="filter-item" style={styles.filterItemStatus}>
        <label htmlFor="status-filter" style={styles.label}>
          Trạng thái
        </label>
        <select
          id="status-filter"
          className="task-filter-select"
          value={filter}
          onChange={(e) => onFilterChange?.(e.target.value)}
          style={styles.select}
        >
          <option value="all">Tất cả</option>
          <option value="active">Đang làm</option>
          <option value="completed">Đã hoàn thành</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;