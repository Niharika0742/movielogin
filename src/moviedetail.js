import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=2c1781fd77e8cd3bae37e7efe97c1d1d`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch movie details: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Movie details:', data);
                setMovie(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch movie details');
                console.error('Error fetching movie details:', err);
            }
        };

        if (id) {
            fetchMovieDetail();
        }
    }, [id]);

    const handleLogout = () => {
        // Perform logout logic here (e.g., clearing session, state, etc.)
        // Navigate back to the login page
        navigate('/'); // Assuming your login page route is '/login'
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div class="card bg-base-100 w-96 shadow-xl">
                <figure>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        style={{ width: '100%', height: '350px' }}
                        alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h1 class="card-title">{movie.title}</h1>
                    <p>Tagline:{movie.tagline}</p>
                    <p>Overview:{movie.overview}</p>
                    <p>Release Date: {movie.release_date}</p>
                    <p>Status:{movie.status}</p>
                    <p>Origin country:{movie.origin_country}</p>
                    <div class="card-actions justify-end">
                         <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
