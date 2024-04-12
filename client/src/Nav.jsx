import { useState } from 'react';
import styles from './Nav.module.css'

const Nav = ({ onSearch }) => {

    const [name, setName] = useState('')

    const handleChange = (event) => {
        setName(event.target.value);
    }

     const handleSearch = () => {
        onSearch(name);
    }

    return (
        <nav className={styles.nav}>
            <input type="text" value={name} onChange={handleChange}/>
            <button onClick={handleSearch}>busqueda</button>
        </nav>
    )
}

export default Nav;