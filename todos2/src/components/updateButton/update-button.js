import { RequestUpdateItem } from './request-update-item'

export const UpdateButton = ({ value, refreshTodos, valueInput }) => {
  return (
    <button
      type="button"
      value={value}
      onClick={(e) => RequestUpdateItem(e, refreshTodos, valueInput)}
    >
      Изменить
    </button>
  )
}
