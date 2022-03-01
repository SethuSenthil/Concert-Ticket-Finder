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

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.artistName}
        subheader={props.consertDate}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.consertImage}
        alt="Thumnail Image"
      />
      <CardActions disableSpacing>
        <IconButton aria-label="price">
          <AttachMoney /> <Typography variant="caption">000</Typography>
        </IconButton>

        <IconButton aria-label="location">

          <Place /> <Typography variant="caption">NJ</Typography>
        </IconButton>

        <Button variant="outlined" startIcon={<BuyNow />}>
        Buy
      </Button>
      </CardActions>
    </Card>
  );
}

ConcertTile.defaultProps = {
  artistName: "Artist Name",
  consertDate: "00/00/0000",
  consertImage: "https://d1e00ek4ebabms.cloudfront.net/production/c108ede0-4538-4ad5-82bf-59e133a0f9a5.jpg",
}