import { URL_TODOS } from '../constants/constants'

export const ChangeButton = (e, setIdItem, setValueInput) => {
  setIdItem(e.target.value)
  e.preventDefault()

  fetch(URL_TODOS + `/${e.target.value}`, {
    method: 'GET',
    headers: { 'Content-type': 'application/json;charset=utf-8' },
  })
    .then((loadedData) => loadedData.json())
    .then((loadedTodos) => setValueInput(loadedTodos.title))
    .catch((err) => console.log('Ошибка', err))
}
