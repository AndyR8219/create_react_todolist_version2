import { URL_TODOS } from '../constants/constants'

export const RequestDeleteItem = (e, refreshTodos) => {
  e.preventDefault()
  fetch(URL_TODOS + `/${e.target.value}`, { method: 'DELETE' })
    .then((rawResponse) => rawResponse.json())
    .then(() => {
      refreshTodos()
    })
    .catch((err) => console.log(err))
}
