import styles from './todolist.module.css'
import { RequestDeleteItem, ChangeButton } from '../../components'

export const TodoList = ({
  isSearch,
  todos,
  refreshTodos,
  valueInput,
  setValueInput,
  setIdItem,
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
              name="changeButton"
              className={styles.changeButton}
              type="button"
              value={id}
              onClick={(e) =>
                ChangeButton(
                  e,
                  setIdItem,
                  setValueInput,
                  valueInput,
                  refreshTodos
                )
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
