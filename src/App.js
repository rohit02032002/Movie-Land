import { useState,useEffect } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';
const API_KEY = '414ec745';

const movie1={
        "Title": "The Death of the Incredible Hulk",
        "Year": "1990",
        "imdbID": "tt0099387",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BM2MzMzc4ZmUtNmJiYi00ZTc4LThmZjgtMmRjZDdkMmFkZmUwXkEyXkFqcGdeQXVyMTEyNzgwMDUw._V1_SX300.jpg"

}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async (title) => {
        const response = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=${API_KEY}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    useEffect(() =>{
        searchMovies('hulk');
    }, []);


    return (
       <div className='app'>
        <h1>MovieLand</h1>

        <div className='search'>
        
            <input 
            placeholder='Search for movies'
             value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e)=> searchMovies(e.target.value)}
             /> 
            <img
            src={SearchIcon}
            alt="search"
            onClick={()=>searchMovies(searchTerm)}
            />
        </div>
        

        {
            movies?.length > 0
            ? (
                    <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie ={movie} />
                    ))}                    
                    </div>
                ) :
                (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
        }
       </div>
       

    );
}

export default App;