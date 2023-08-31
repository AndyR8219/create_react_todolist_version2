import { URL_TODOS } from '../constants/constants'

export const RequestUpdateItem = (
  e,
  refreshTodos,
  valueInput,
  setValueInput
) => {
  e.preventDefault()

  fetch(URL_TODOS + `/${e.target.value}`, {
    method: 'GET',
    headers: { 'Content-type': 'application/json;charset=utf-8' },
  })
    .then((loadedData) => loadedData.json())
    .then((loadedTodos) => setValueInput(loadedTodos.title))
    .catch((err) => console.log('Ошибка', err))

  // if (valueInput.trim()) {
  //   fetch(URL_TODOS + `/${e.target.value}`, {
  //     method: 'PUT',
  //     headers: { 'Content-type': 'application/json;charset=utf-8' },
  //     body: JSON.stringify({
  //       title: valueInput,
  //     }),
  //   })
  //     .then((rawResponse) => rawResponse.json())
  //     .then(() => {
  //       refreshTodos()
  //       setValueInput('')
  //     })
  //     .catch((error) => console.log('Ошибка', error))
  // } else {
  //   alert('Поле не должно быть пустым')
  // }
}
