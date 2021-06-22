import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MoviesCard';
import {Box, LinearProgress, Typography} from '@material-ui/core'

const Movies = (props) => {
  const [movies, setMovies] = useState([])
  const [loader, setLoader] = useState(false);

  useEffect(async () => {
    try {
      setLoader(true);
      const requestConfig = {
        headers: {
          "x-access-token": props.token
        }
      }
      const moviesRequest = await axios.get("https://mov-review-api.herokuapp.com/movies/list-all-movies", requestConfig);
      setMovies(moviesRequest.data.movies);
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  }, [])



  if (movies) {
    return (
      <>
      {loader ? <LinearProgress /> : null}
      <Box display="flex" width="100%" flexWrap="wrap">
        {
          movies.map(movie => {
            return(<MovieCard data={movie} />)
          })
        }
      </Box>
      </>
    )
  } else {
    return (
      <Typography variant="subtitle1" color="initial">No nay</Typography>
    )
  }


}

export default Movies;
