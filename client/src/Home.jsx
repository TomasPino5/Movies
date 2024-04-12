import Nav from './Nav'
import styles from './Home.module.css'
import { useEffect, useState } from 'react';

const Home = () => {

    const [movies, setMovies] = useState([])
    const [moviesCount, setMoviesCount] = useState(0)
    const [next, setNext] = useState(1)

    useEffect(() => {
        fetch(`http://localhost:3000/movies?page=${next}`)
        .then(response => response.json())
        .then(data => setMovies(data))
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
    }, [next])

    useEffect(() => {
        fetch('http://localhost:3000/count')
        .then(response => response.json())
        .then(data => setMoviesCount(data))
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        })
    }, [movies])

    const searchMovies = (searchTerm) => {
        fetch(`http://localhost:3000/search?name=${searchTerm}`)
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => {
                console.error('Hubo un problema con la solicitud:', error);
            });
    };

    const handleNextPage = () => {
        setTimeout(() => {
            setNext(next + 1)
            setMovies([])
            window.scrollTo(0, 0);
        }, 500)
    }

    const handlePreviousPage = () => {
        setTimeout(() => {
            setNext(next - 1)
            setMovies([])
            window.scrollTo(0, 0);
        }, 500)
    }

    const endIndex = Math.ceil(moviesCount / 16);
     

    return (
        <div>
            <Nav onSearch={searchMovies}/>
            <div className={styles.container}>
                {movies.map(({ id, title, year, genres, extract, image, rating}) => (
                    <div key={id} className={styles.cardContainer}>
                        <h2 className={title}>{title}</h2>
                        <img src={image} alt={title} className={styles.img}/>
                        {/* <p>Año: {year}</p>
                        <p>Géneros: {genres.join(', ')}</p>
                        <p>Sipnosis: {extract}</p>
                        <p>Rating: {rating}</p> */}
                    </div>
                ))}
            </div>
            <div className={styles.paginated}>
                <button onClick={handlePreviousPage} disabled={next <= 1}>Previous</button>
                <p>{next} de {endIndex}</p>
                <button onClick={handleNextPage} disabled={next >= endIndex}>Next</button> 
                <p>Mostrando {movies.length}/{moviesCount}</p>
            </div>
        </div>
    )
}

export default Home;