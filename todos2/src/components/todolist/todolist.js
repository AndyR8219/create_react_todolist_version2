import styles from './todolist.module.css'
import { RequestDeleteItem, RequestUpdateItem } from '../../components'

export const TodoList = ({
  isSearch,
  todos,
  refreshTodos,
  valueInput,
  setValueInput,
}) => {
  const searchItem = todos.filter((item) => {
    return item.title.toLowerCase().includes(isSearch.toLocaleLowerCase())
  })
  return (
    <div>
      {searchItem.map(({ id, title }) => (
        <div className={styles.item} key={id}>
          {title}
          <div className={styles.button}>
            <button
              name="updateButton"
              className={styles.updateButton}
              type="button"
              value={id}
              onClick={(e) =>
                RequestUpdateItem(e, refreshTodos, valueInput, setValueInput)
              }
            >
              Изменить
            </button>
            <button
              name="deleteButton"
              className={styles.deleteButton}
              type="button"
              value={id}
              onClick={(e) => RequestDeleteItem(e, refreshTodos)}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
