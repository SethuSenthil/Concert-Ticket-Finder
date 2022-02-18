import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './Components/NavBar';
import ConcertTile from './Components/ConcertTile';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import Grid from '@mui/material/Grid';


function App() {
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
