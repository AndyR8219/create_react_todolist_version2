import { useState, useEffect } from 'react'
import styles from './App.module.css'
import { URL_TODOS } from './constants/constants'
import { TodoItem } from './components/todoItem/todo-item'

function App() {
  const [todos, setTodos] = useState([])
  const [valueInput, setValueInput] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [isSearch, setIsSearch] = useState('')
  const [isSorted, setIsSorted] = useState(false)

  const refreshTodos = () => setRefreshFlag(!refreshFlag)
  const sortedTodo = (e) => {
    e.preventDefault()
    setIsSorted(!isSorted)
  }

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
      fetch(URL_TODOS)
        .then((loadedData) => loadedData.json())
        .then((loadedTodos) => setTodos(loadedTodos))
    }
  }, [refreshFlag, isSorted])

  const OnChangeInputValue = ({ target }) => {
    setValueInput(target.value)
  }

  const changeSearch = ({ target }) => {
    setIsSearch(target.value)
  }

  const requestAddItem = (e) => {
    e.preventDefault()
    if (valueInput.trim()) {
      setIsCreating(true)
      fetch(URL_TODOS, {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          title: valueInput,
        }),
      })
        .then((rawResponse) => rawResponse.json())
        .then((res) => {
          refreshTodos()
          console.log(res)
        })
        .finally(() => {
          setValueInput('')
          setIsCreating(false)
        })
    } else {
      alert('Поле не должно быть пустым')
    }
  }

  return (
    <form className={styles.form}>
      <div className={styles.inputBlock}>
        <input
          className={styles.input}
          type="text"
          onChange={OnChangeInputValue}
          placeholder="Введите название заметки"
        />
        <button
          className={styles.button}
          type="submit"
          onClick={requestAddItem}
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
          onChange={changeSearch}
        />
        <button
          type="button"
          className={isSorted ? styles.sorted : styles.notSorted}
          onClick={sortedTodo}
        >
          Сортировка
        </button>
      </div>
      <TodoItem
        isSearch={isSearch}
        todos={todos}
        refreshTodos={refreshTodos}
        valueInput={valueInput}
      />
    </form>
  )
}

export default App
