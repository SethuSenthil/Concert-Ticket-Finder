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
import Place from '@mui/icons-material/Place';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import CountUp from 'react-countup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUber } from '@fortawesome/free-brands-svg-icons'


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
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
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
  );
}

ConcertTile.defaultProps = {
  title: "Title",
  concertDate: "TBD",
  price: null,
  editorsChoice: false,
  userLat: 0,
  userLon: 0,
  venueLat: 0,
  venueLon: 0,
  concertImage: "https://d1e00ek4ebabms.cloudfront.net/production/c108ede0-4538-4ad5-82bf-59e133a0f9a5.jpg",
  buyLink: "",
}