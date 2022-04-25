import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import AttachMoney from '@mui/icons-material/AttachMoney';
import BuyNow from '@mui/icons-material/ShoppingCartCheckout';
import PinDrop from '@mui/icons-material/PinDrop';
import Place from '@mui/icons-material/Place';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import CountUp from 'react-countup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUber, faWikipediaW } from '@fortawesome/free-brands-svg-icons'
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CalenderIcon from '@mui/icons-material/Event';
import Stack from '@mui/material/Stack';
import Constants from '../Constants';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ReadMoreReact from 'read-more-react';
import Gallery from 'react-photo-gallery'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ConcertTile(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [artistData, setArtistData] = React.useState({
    'video': {
      'link': 'https://www.youtube.com/watch?v=dofpuYDmQj8'
    },
    'summary': "Sorry: Can't Scrape Artist Summary! (They are probably not popular enough)",
    'images': ['0', '1']
  });
  const handleOpen = () => {
    setOpen(true)
    //alert(Constants.endpoint() + '/getArtistSummary/' + props.artist)
    fetch(Constants.endpoint() + '/getArtistSummary/' + props.artist, {
       method: 'GET',
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log('artist data', result)
        setArtistData(result)
      });
  };
  const handleClose = () => setOpen(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function distance() {
    let lat1 = props.userLat
    let lon1 = props.userLon
    let lat2 = props.venueLat
    let lon2 = props.venueLon

    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  return (
    <>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
      onClick={handleOpen}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="music">
            ♫
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader={props.concertDate}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.concertImage}
        alt="Thumnail Image"
        onClick={handleOpen}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="price">
          <AttachMoney /> <Typography variant="caption">{props.price == null ? "TBD" : <CountUp end={props.price} duration={1.5}/>}</Typography>
        </IconButton>

        <IconButton aria-label="uber"  onClick={()=>{
         window.open('https://m.uber.com/ul/' + `?action=setPickup&dropoff[latitude]=${props.venueLat}&dropoff[longitude]=${props.venueLon}`)
        }}>
          <FontAwesomeIcon icon={faUber} />
        </IconButton>

        <IconButton aria-label="location" onClick={()=>{
          window.open(`https://www.google.com/maps/search/?api=1&query=${props.venueLat},${props.venueLon}`);
        }}>

          <Place /> <Typography variant="caption">Near</Typography>
        </IconButton>

        <Button variant="outlined" startIcon={<BuyNow />}  onClick={()=>{
          window.open(props.buyLink);
        }}>
        Buy
      </Button>
      </CardActions>
    </Card>

    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          overflow: 'scroll',
        }}
      >
        <Fade in={open}>
          <Box sx={{
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  color: 'white',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}}>
  <br/> <br/> <br/> <br/> <br/> <br/> <br/>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {props.title}
            </Typography>
            <Stack spacing={1} direction="row" >
            <Chip icon={<CalenderIcon />} label={props.concertDate}  color="primary"/>
            <Chip icon={<AttachMoney />} label={props.price} color="success"/>
            <Chip icon={<FontAwesomeIcon icon={faUber}/>} label={"Book Uber"} onClick={()=>{
         window.open('https://m.uber.com/ul/' + `?action=setPickup&dropoff[latitude]=${props.venueLat}&dropoff[longitude]=${props.venueLon}`)
        }}/>
        <Chip icon={<PinDrop/>} label={"Find Parking"} color='warning' onClick={()=>{
         window.open(`https://www.google.com/maps/search/parking+near+${props.venueName}`)
        }}/>
            </Stack>
            <br/>

            <Grid container spacing={2}>
            <Grid item xs={4}>
             <iframe
             height='400'
             width='400'
             src={`https://www.youtube.com/embed/${artistData.video.link.split('youtu.be/')[1]}?&autoplay=1`}
        frameborder='0'
        allow='autoplay; encrypted-media'
        allowfullscreen
        title='video'
        />
        </Grid>
    <ImageList sx={{ width: 450, height: 400 }} cols={3} rowHeight={164}>
    {artistData.images.map((item) => (
      <ImageListItem key={item.img}>
        <img
          src={`${item}`}
          srcSet={`${item}`}
          loading="lazy"
        />
      </ImageListItem>
    ))}
  </ImageList>
        </Grid>

        <Grid item xs={8}>

        </Grid>

        <br/>
        <br/>

        <Chip icon={<FontAwesomeIcon icon={faWikipediaW}/>} label="Open in Wikipedia"/>
         <p>{artistData.summary}</p>

          </Box>

        </Fade>
      </Modal>
    </>
  );
}

ConcertTile.defaultProps = {
  title: "Title",
  concertDate: "TBD",
  price: null,
  artist: null,
  editorsChoice: false,
  userLat: 0,
  userLon: 0,
  venueName: '',
  venueLat: 0,
  venueLon: 0,
  concertImage: "https://d1e00ek4ebabms.cloudfront.net/production/c108ede0-4538-4ad5-82bf-59e133a0f9a5.jpg",
  buyLink: "",
}