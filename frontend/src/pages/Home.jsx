import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import "../css/Home.css";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPopularMovies = async () => {
        try {
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
        } catch (error) {
            console.log(error);
            setError("Failed to load movies...");
        }
        finally {
            setLoading(false);
        }
    }
    loadPopularMovies();
    }, []);


    const handleSearch = async(e) => {
        e.preventDefault()
        if (!searchQuery.trim() ) return;
        if (loading) return;

        setLoading(true);

        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
        }
        catch (error) {
            console.log("Error searching movies:", error);
            setError("Failed to search movies. Please try again later.");
        }
        finally {
            setLoading(false);
        }

    };



  return (
    <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text" 
            placeholder="Search movies..." 
            className="search-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type="submit" className="search-button">Search</button>
        </form>

        {loading ?(<p>Loading movies...</p>) : null}
        {error && <p className="error-message">{error}</p>}

        <div className="movies-grid">
            {movies.map(movie =>(
                 movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && <MovieCard key={movie.id} movie={movie} />
                 
                 ))}
        </div>

    </div>
  );
}

export default Home