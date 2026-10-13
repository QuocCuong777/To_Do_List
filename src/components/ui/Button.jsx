/**
 * Button — UI dùng chung
 * Props:
 *   variant: "primary" | "secondary" | "ghost" | "danger"  (default: "primary")
 *   size:    "sm" | "md" | "lg"                             (default: "md")
 *   disabled, onClick, type, children, className, ...rest
 */
import styles from './Button.module.css'

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  children,
  type = 'button',
  ...rest
}) {
  const cls = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    disabled ? styles['btn--disabled'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={cls} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}

export default Button
