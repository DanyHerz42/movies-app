import React, { useState } from 'react';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Divider} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    marginRight: 24,
    marginBottom: 24,
  },
  iconColor: {
    color: theme.palette.primary
  }
}));

export default function MovieCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [fav, setFav] = useState(false);
  const dataMovie = props.data;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={dataMovie.imageURL}
          title="img..src"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle" component="p" color="primary" style={{fontWeight: "bold"}}>
            {dataMovie.name}
          </Typography>
          <Typography gutterBottom variant="p" component="p" color="primary">
          <span style={{fontWeight: "bold"}}>Sinopsis:</span>{dataMovie.sinopsis}
          </Typography>
          <Divider />
          <Typography gutterBottom variant="p" component="p" color="primary">
            <span style={{fontWeight: "bold"}}>Produced by:</span> {dataMovie.producedBy}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}