import { URL_TODOS } from '../../constants/constants'

export const RequestAddItem = (
  e,
  setIsCreating,
  valueInput,
  refreshTodos,
  setValueInput
) => {
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
