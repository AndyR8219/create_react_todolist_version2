import { URL_TODOS } from '../../constants/constants'

export const RequestUpdateItem = (e, refreshTodos, valueInput) => {
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
