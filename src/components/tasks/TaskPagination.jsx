/**
 * TaskPagination — Phân trang
 *
 * Props (nhận từ App.jsx / Leader):
 *   currentPage  : number  — trang hiện tại (1-indexed)
 *   totalPages   : number  — tổng số trang
 *   onPageChange : (page: number) => void — callback khi đổi trang
 *
 * Quy tắc:
 *   - Không tự cắt mảng tasks; App.jsx chịu trách nhiệm truyền danh sách trang hiện tại.
 *   - Vô hiệu hoá nút "Trước" khi ở trang đầu, nút "Sau" khi ở trang cuối.
 *   - Xử lý totalPages === 0 hoặc 1: ẩn toàn bộ pagination.
 *   - Không import useTasks hay App.jsx.
 */
import styles from './TaskPagination.module.css'
import { Button } from '../ui/Button'

// Số trang tối đa hiển thị (không kể nút trước/sau)
const MAX_PAGE_BUTTONS = 5

/**
 * Tính dãy trang cần hiển thị.
 * Ví dụ: currentPage=5, totalPages=10, MAX=5 → [3,4,5,6,7]
 */
function getPageRange(currentPage, totalPages) {
  const half = Math.floor(MAX_PAGE_BUTTONS / 2)
  let start = Math.max(1, currentPage - half)
  let end = start + MAX_PAGE_BUTTONS - 1

  if (end > totalPages) {
    end = totalPages
    start = Math.max(1, end - MAX_PAGE_BUTTONS + 1)
  }

  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
}

export function TaskPagination({ currentPage, totalPages, onPageChange }) {
  // Không hiển thị nếu chỉ có 0 hoặc 1 trang
  if (!totalPages || totalPages <= 1) return null

  const pages = getPageRange(currentPage, totalPages)
  const isFirst = currentPage <= 1
  const isLast = currentPage >= totalPages

  return (
    <nav
      className={styles.pagination}
      aria-label="Phân trang danh sách công việc"
      role="navigation"
    >
      {/* Nút về trang đầu */}
      <Button
        id="pagination-first"
        variant="ghost"
        size="sm"
        disabled={isFirst}
        onClick={() => onPageChange(1)}
        aria-label="Trang đầu"
        title="Trang đầu"
      >
        «
      </Button>

      {/* Nút trang trước */}
      <Button
        id="pagination-prev"
        variant="ghost"
        size="sm"
        disabled={isFirst}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Trang trước"
        title="Trang trước"
      >
        ‹
      </Button>

      {/* Dấu … đầu nếu trang đầu dãy > 1 */}
      {pages[0] > 1 && (
        <span className={styles.ellipsis} aria-hidden="true">
          …
        </span>
      )}

      {/* Các nút số trang */}
      {pages.map((page) => (
        <Button
          key={page}
          id={`pagination-page-${page}`}
          variant={page === currentPage ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => onPageChange(page)}
          aria-label={`Trang ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </Button>
      ))}

      {/* Dấu … cuối nếu trang cuối dãy < totalPages */}
      {pages[pages.length - 1] < totalPages && (
        <span className={styles.ellipsis} aria-hidden="true">
          …
        </span>
      )}

      {/* Nút trang sau */}
      <Button
        id="pagination-next"
        variant="ghost"
        size="sm"
        disabled={isLast}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Trang sau"
        title="Trang sau"
      >
        ›
      </Button>

      {/* Nút về trang cuối */}
      <Button
        id="pagination-last"
        variant="ghost"
        size="sm"
        disabled={isLast}
        onClick={() => onPageChange(totalPages)}
        aria-label="Trang cuối"
        title="Trang cuối"
      >
        »
      </Button>

      {/* Thông tin trang hiện tại */}
      <span className={styles.info} aria-live="polite">
        Trang <strong>{currentPage}</strong> / {totalPages}
      </span>
    </nav>
  )
}

export default TaskPagination
