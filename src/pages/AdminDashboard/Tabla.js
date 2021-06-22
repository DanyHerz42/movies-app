import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Tabla(props) {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false)
  const classes = useStyles();
  useEffect(async () => {
    try {
      setLoader(true);
      const requestConfig = {
        headers: {
          "x-access-token": props.token
        }
      }
      const moviesRequest = await axios.get("http://localhost:4000/movies/list-all-movies", requestConfig);
      setMovies(moviesRequest.data.movies);
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  }, [setMovies])

  if (!movies) {
    return (
      <LinearProgress />
    )
  } else {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell >Sinopsis</TableCell>
              <TableCell >Produced By</TableCell>
              <TableCell >imageURL</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.sinopsis ? "True" : null}</TableCell>
                <TableCell>{row.producedBy}</TableCell>
                <TableCell>{row.imageURL ? "True" : null}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

  }


}