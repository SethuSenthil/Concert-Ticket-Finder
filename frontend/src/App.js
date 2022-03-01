import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './Components/NavBar';
import ConcertTile from './Components/ConcertTile';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import {useState, useEffect} from 'react';


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#6002ee',
      },
      secondary: {
        main: '#90ee02',
      },
    },
  });
  useEffect(() => {
    fetch("http://localhost:4566/getHomeEvents")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.events);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  return (
    <ThemeProvider theme={darkTheme}>
    <div className="App">
     <NavBar/>
     <div style={{display: 'flex', flexDirection: 'row', margin: 20}}>
      <TextField id="filled-basic" label="Search" variant="filled" fullWidth/>
      &nbsp; &nbsp;
      <Button variant="outlined" startIcon={<FilterListIcon />}>
  Filter
</Button>

     </div>

<Grid container spacing={2}>
  <Grid item xs={3}>
  <ConcertTile/>
  </Grid>
  <Grid item xs={3}>
  <ConcertTile/>
  </Grid>
  <Grid item xs={3}>
  <ConcertTile/>
  </Grid>
  <Grid item xs={3}>
  <ConcertTile/>
  </Grid>
  <Grid item xs={3}>
  <ConcertTile/>
  </Grid>
</Grid>

    </div>
    </ThemeProvider>
  );
}

export default App;
