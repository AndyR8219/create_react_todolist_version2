import { RequestDeleteItem } from './request-delete-item'
import styles from './delete-button.module.css'

export const DeleteButton = ({ value, refreshTodos }) => {
  return (
    <button
      className={styles.button}
      type="button"
      value={value}
      onClick={(e) => RequestDeleteItem(e, refreshTodos)}
    >
      &times;
    </button>
  )
}
