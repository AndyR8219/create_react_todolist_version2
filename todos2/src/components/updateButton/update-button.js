import { RequestUpdateItem } from './request-update-item'
import styles from './update-button.module.css'

export const UpdateButton = ({
  value,
  refreshTodos,
  valueInput,
  setValueInput,
}) => {
  return (
    <button
      className={styles.button}
      type="button"
      value={value}
      onClick={(e) =>
        RequestUpdateItem(e, refreshTodos, valueInput, setValueInput)
      }
    >
      Изменить
    </button>
  )
}
