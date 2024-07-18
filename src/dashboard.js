import React, { useEffect, useState } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import './dashboard.css';
import 'daisyui/dist/full.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const getShows = async () => {
    try {
      toast.success("Login successful!");
      const response = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=2c1781fd77e8cd3bae37e7efe97c1d1d");
     // const res=await fetch("https://api.themoviedb.org/3/movie/changes?api_key=2c1781fd77e8cd3bae37e7efe97c1d1d")
      //console.log("HI",res.json());
      const data = await response.json();
      console.log(data)
      setMovies(data.results);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch movies.");
    }
  };

  useEffect(() => {
    getShows();
  }, []);
  const handleViewDetails = (id) => {

    navigate(`/movie/${id}`); // Navigate to the movie detail page
  };
 

  return (
    <div className="movie-container">
      {movies.map(movie => (
        <div key={movie.id} className="movie-card">
          <h1 className="movie-title">{movie.title}</h1>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <button className="btn btn-outline btn-wide mt-1 ms-10" onClick={() => handleViewDetails(movie.id)}>View Details</button>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
