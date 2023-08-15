import styles from './sorted-button.module.css'
import { SortedItems } from './sorted-items'

export const SortedButton = ({ isSorted, setIsSorted }) => {
  return (
    <button
      type="button"
      className={isSorted ? styles.sorted : styles.notSorted}
      onClick={(e) => SortedItems(e, setIsSorted, isSorted)}
    >
      Сортировка
    </button>
  )
}
