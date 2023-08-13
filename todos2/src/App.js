import { useState, useEffect } from 'react'
import styles from './App.module.css'
import { URL_TODOS } from './constants/constants'

function App() {
  const [todos, setTodos] = useState([])
  const [valueInput, setValueInput] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [refreshFlag, setRefreshFlag] = useState(false)

  const refreshTodos = () => setRefreshFlag(!refreshFlag)

  useEffect(() => {
    fetch(URL_TODOS)
      .then((loadedData) => loadedData.json())
      .then((loadedTodos) => setTodos(loadedTodos))
  }, [refreshFlag])

  const OnChangeInputValue = ({ target }) => {
    setValueInput(target.value)
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
          setIsCreating(false)
        })
    } else {
      alert('Поле не должно быть пустым')
    }
  }

  const requestUpdateItem = (e) => {
    e.preventDefault()
    if (valueInput.trim()) {
      fetch(URL_TODOS + `/${e.target.value}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          title: valueInput,
        }),
      })
        .then((rawResponse) => rawResponse.json())
        .then(() => {
          refreshTodos()
        })
    } else {
      alert('Поле не должно быть пустым')
    }
  }

  const requestDeleteItem = (e) => {
    e.preventDefault()
    fetch(URL_TODOS + `/${e.target.value}`, { method: 'DELETE' })
      .then((rawResponse) => rawResponse.json())
      .then(() => {
        refreshTodos()
      })
  }

  const search = todos.filter((item) => {
    return item.title.toLowerCase().includes(valueInput.toLocaleLowerCase())
  })

  const filterTodo = () => {
    fetch(URL_TODOS + '?_sort=title&_order=asc', {
      method: 'GET',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
    })
      .then((rawResponse) => rawResponse.json())
      .then((res) => {
        setTodos(res)
      })
      .catch((err) => console.log('Ошибка', err))
  }

  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        type="text"
        onChange={OnChangeInputValue}
        placeholder="Введите название заметки"
      />
      <button type="submit" onClick={requestAddItem} disabled={isCreating}>
        Добавить запись
      </button>

      <button onClick={filterTodo}>Сортировка</button>
      <input type="checkbox" isChecked={filterTodo} />

      {search.map(({ id, title }) => (
        <div className={styles.item} key={id}>
          {id}. {title}{' '}
          <button value={id} onClick={requestUpdateItem}>
            Изменить запись
          </button>
          <button value={id} onClick={requestDeleteItem}>
            Удалить запись
          </button>
        </div>
      ))}
    </form>
  )
}

export default App