import { URL_TODOS } from '../constants/constants'

export const RequestUpdateItem = (
  e,
  refreshTodos,
  valueInput,
  setValueInput,
  setIsUpdate,
  idItem
) => {
  e.preventDefault()
  if (valueInput.trim()) {
    fetch(URL_TODOS + `/${idItem}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        title: valueInput,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then(() => {
        refreshTodos()
        setValueInput('')
      })
      .catch((error) => console.log('Ошибка', error))
  } else {
    alert('Поле не должно быть пустым')
  }
  setIsUpdate(0)
}
