import { RequestAddItem } from './request-add-item'
import { useState } from 'react'
import styles from './add-button.module.css'

export const AddButton = ({ valueInput, refreshTodos, setValueInput }) => {
  const [isCreating, setIsCreating] = useState(false)

  return (
    <button
      className={styles.button}
      type="submit"
      onClick={(e) =>
        RequestAddItem(
          e,
          setIsCreating,
          valueInput,
          refreshTodos,
          setValueInput
        )
      }
      disabled={isCreating}
    >
      Добавить запись
    </button>
  )
}
