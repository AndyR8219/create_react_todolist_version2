import { useState, useEffect } from 'react'
import styles from './App.module.css'
import { URL_TODOS } from './constants/constants'
import {
  RequestAddItem,
  SortedItems,
  TodoList,
  OnChangeInputValue,
  OnChangeSearch,
} from './components/'

function App() {
  const [todos, setTodos] = useState([])
  const [valueInput, setValueInput] = useState('')
  const [isSearch, setIsSearch] = useState('')
  const [isSorted, setIsSorted] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [refreshFlag, setRefreshFlag] = useState(false)

  const refreshTodos = () => setRefreshFlag(!refreshFlag)

  useEffect(() => {
    if (isSorted) {
      fetch(URL_TODOS + '?_sort=title&_order=asc', {
        method: 'GET',
        headers: { 'Content-type': 'application/json;charset=utf-8' },
      })
        .then((rawResponse) => rawResponse.json())
        .then((res) => {
          setTodos(res)
        })
        .catch((err) => console.log('Ошибка', err))
    } else {
      fetch(URL_TODOS, {
        method: 'GET',
        headers: { 'Content-type': 'application/json;charset=utf-8' },
      })
        .then((loadedData) => loadedData.json())
        .then((loadedTodos) => setTodos(loadedTodos))
        .catch((err) => console.log('Ошибка', err))
    }
  }, [refreshFlag, isSorted])

  return (
    <form className={styles.form}>
      <div className={styles.inputBlock}>
        <input
          className={styles.input}
          value={valueInput}
          type="text"
          onChange={(e) => OnChangeInputValue(e, setValueInput)}
          placeholder="Введите название заметки"
        />
        <button
          name="addButton"
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
      </div>
      <div className={styles.optionBlock}>
        <input
          className={styles.search}
          type="text"
          placeholder="Поиск"
          onChange={(e) => OnChangeSearch(e, setIsSearch)}
        />
        <button
          name="sortedButton"
          type="button"
          className={isSorted ? styles.sorted : styles.notSorted}
          onClick={(e) => SortedItems(e, setIsSorted, isSorted)}
        >
          Сортировка
        </button>
      </div>
      <TodoList
        isSearch={isSearch}
        todos={todos}
        refreshTodos={refreshTodos}
        valueInput={valueInput}
        setValueInput={setValueInput}
      />
    </form>
  )
}

export default App
