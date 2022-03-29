import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import ConcertTile from './Components/ConcertTile';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import {useState, useEffect} from 'react';
import Constants from './Constants';
import InputAdornment from '@mui/material/InputAdornment';
import GpsFixed from '@mui/icons-material/GpsFixed';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';



function parseDate(timestamp){
  const d = new Date(timestamp)
  var currentMonth = d.toDateString().split(' ')[1];
  return currentMonth + ' ' +  d.getDate();
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [geolocation, setGeolocation] = useState({lat: 0, lng: 0, zip: null});
  const [zipCode, setZipCode] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchResultStats, setSearchResultStats] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterControls, setFilterControls] = React.useState(false);


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

  const onAllFetch = (result) => {
    setIsLoaded(true);
          setItems(result.events);
          setSearchResultStats(`${result.meta.total} results in ${result.meta.took/100} seconds`);
  }

  const fetchEvents = (settings) => {
    if (settings == null){
      settings = {}
    }

    if(settings.page == null){
      settings.page = 1
      setCurrentPage(1)
    }

    if(settings.page === 'next'){
      settings.page = currentPage + 1
    }

    const body = {
       'postal_code': zipCode,
       'q': searchInput,
       'page': settings.page,
       'per_page': 25,
    }
    //alert(JSON.stringify(body))
    fetch(Constants.endpoint() + '/getEvents', {
      method: 'POST',
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(
      (result) => {
        if(settings.page === 'next'){
          setItems(items.concat(result.events));
        }else{
          setItems(result.events);
        }
        setIsLoaded(true);
        setSearchResultStats(`${result.meta.total} results in ${result.meta.took/100} seconds`);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }

  useEffect(() => {
    fetch(Constants.endpoint() + '/getHomeEvents')
      .then(res => res.json())
      .then(
        (result) => {
          onAllFetch(result)
          setZipCode(result.meta.geolocation.postal_code);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )

      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        setGeolocation({lat: lat, lng: long});
      });
  }, [])

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  }

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  }

  const handleZipCodeSubmit = (e) => {
    //TODO: Check if zip code is valid
      if (e.key === 'Enter') {
        setZipCode(e.target.value);
        fetchEvents();
      }
  }

  const handleSearchInputSubmit = (e) => {
    //TODO: Check if search input is valid
    if (e.key === 'Enter') {
      setSearchInput(e.target.value);
      fetchEvents();
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
    <div className="App">
     <NavBar/>
     <div style={{display: 'flex', flexDirection: 'row', margin: 20}}>
      <TextField id="filled-basic" label="Search" variant="filled" fullWidth value={searchInput} onChange={handleSearchInputChange} onKeyPress={handleSearchInputSubmit}/>
      &nbsp; &nbsp;
      <TextField id="filled-basic" label="ZIP" variant="filled" width={50} value={zipCode} onChange={handleZipCodeChange} onKeyPress={handleZipCodeSubmit} InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <GpsFixed />
            </InputAdornment>
          ),
        }}/>
      &nbsp; &nbsp;
      <Button variant="outlined" startIcon={<FilterListIcon /> } onClick={() => {setFilterControls(true)}}>
  Filter
</Button>

<Modal
        open={filterControls}
        onClose={() => {setFilterControls(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color="white">
            Filters and Sorting
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} color="white">
            Radius from ZIP (Miles):
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} color="white">
            Radius from ZIP (Miles):
          </Typography>
        </Box>
      </Modal>

     </div>

<Typography variant="subtitle1" gutterBottom component="div" color="primary">
        {searchResultStats}
 </Typography>

<Grid container spacing={2}>
        {items.map(item => (
            <Grid item xs={3}>
              <ConcertTile title={item.short_title} concertDate={parseDate(item.datetime_utc)} concertImage={item.performers[0].image} price={item.stats.lowest_price} userLat={geolocation.lat} userLon={geolocation.long} venueLat={item.venue.location.lat} venueLon={item.venue.location.lon}/>
            </Grid>
          ))}
</Grid>

<br/>

<Button variant="outlined" onClick={() => {
  fetchEvents({page: 'next'})
}}>
  Load More
</Button>

<br/>

<Footer/>

    </div>
    </ThemeProvider>
  );
}

export default App;
