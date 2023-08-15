import styles from './search-input.module.css'
import { OnChangeSearch } from './on-change-search'

export const SearchInput = ({ setIsSearch }) => {
  return (
    <input
      className={styles.search}
      type="text"
      placeholder="Поиск"
      onChange={(e) => OnChangeSearch(e, setIsSearch)}
    />
  )
}
