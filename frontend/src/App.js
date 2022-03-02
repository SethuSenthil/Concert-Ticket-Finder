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
import Constants from './Constants';

function parseDate(timestamp){
  const d = new Date(timestamp)
  var currentMonth = d.toDateString().split(' ')[1];
  return currentMonth + ' ' +  d.getDate();
}


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
    fetch(Constants.endpoint() + '/getHomeEvents')
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
        {items.map(item => (
            <Grid item xs={3}>
              <ConcertTile title={item.short_title} concertDate={parseDate(item.datetime_utc)} concertImage={item.performers[0].image} price={item.stats.lowest_price}/>
            </Grid>
          ))}
</Grid>

    </div>
    </ThemeProvider>
  );
}

export default App;
