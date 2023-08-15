import styles from './todo-item.module.css'
import { UpdateButton } from '../updateButton/update-button'
import { DeleteButton } from '../deleteButton/delete-button'

export const TodoItem = ({
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
          {id}. {title}
          <div className={styles.button}>
            <UpdateButton
              value={id}
              valueInput={valueInput}
              refreshTodos={refreshTodos}
              setValueInput={setValueInput}
            />
            <DeleteButton value={id} refreshTodos={refreshTodos} />
          </div>
        </div>
      ))}
    </div>
  )
}
