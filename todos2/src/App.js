import { useState, useEffect } from 'react'
import styles from './App.module.css'
import { URL_TODOS } from './constants/constants'
import { TodoItem } from './components/todoItem/todo-item'
import { SortedButton } from './components/sortedButton/sorted-button'
import { SearchInput } from './components/searchInput/search-input'
import { AddButton } from './components/addButton/add-button'
import { Input } from './components/input/input'

function App() {
  const [todos, setTodos] = useState([])
  const [valueInput, setValueInput] = useState('')
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [isSearch, setIsSearch] = useState('')
  const [isSorted, setIsSorted] = useState(false)

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
      fetch(URL_TODOS)
        .then((loadedData) => loadedData.json())
        .then((loadedTodos) => setTodos(loadedTodos))
    }
  }, [refreshFlag, isSorted])

  return (
    <form className={styles.form}>
      <div className={styles.inputBlock}>
        <Input valueInput={valueInput} setValueInput={setValueInput} />

        <AddButton
          valueInput={valueInput}
          refreshTodos={refreshTodos}
          setValueInput={setValueInput}
        />
      </div>

      <div className={styles.optionBlock}>
        <SearchInput setIsSearch={setIsSearch} />
        <SortedButton isSorted={isSorted} setIsSorted={setIsSorted} />
      </div>

      <TodoItem
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
