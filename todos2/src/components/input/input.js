import styles from './input.module.css'
import { OnChangeInputValue } from './on-change-input-value'

export const Input = ({ valueInput, setValueInput }) => {
  return (
    <input
      className={styles.input}
      value={valueInput}
      type="text"
      onChange={(e) => OnChangeInputValue(e, setValueInput)}
      placeholder="Введите название заметки"
    />
  )
}
