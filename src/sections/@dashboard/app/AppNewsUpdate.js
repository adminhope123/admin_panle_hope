// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { useDispatch, useSelector } from 'react-redux';

// ----------------------------------------------------------------------

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  viewDataShow:PropTypes.any.isRequired,
  list: PropTypes.array.isRequired,
};

export default function AppNewsUpdate({ title, subheader, list,viewDataShow, ...other }) {
  
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list?.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />
{
  viewDataShow===true?<Box sx={{ p: 2, textAlign: 'right' }}>
  <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
    View all
  </Button>
</Box>:""
}
      
    </Card>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    start:PropTypes.string,
    online: PropTypes.string
  }),
};

function NewsItem({ news }) {
  const { image, title, description, postedAt,online,start } = news;
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box component="img" alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0,objectFit:"cover" }} />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap sx={{textTransform:"capitalize"}}>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary',textTransform:"capitalize" }} noWrap >
          {description}
        </Typography>
      </Box>
       {
                          online==='running'
                          &&((
                            <div class="online-indicator">
                            <span class="blink"></span>
                            <table id="header-fixed"></table>
                            <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, marginLeft:"-8px",position:"absolute",top:"20px",color: 'text.secondary' }}>
           Online
        </Typography> 
        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, marginLeft:"-8px",left:"-107px",position:"absolute",top:"20px",color: 'text.secondary' }}>
           Start Time : {start?.slice(11,16)}
        </Typography> 
                          </div>
                          ))
                         }
                         {
                          online===undefined&&((
                            <div class="online-indicator-stopped">
                            <span class="blink-stopped"></span>
                            <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, marginLeft:"-8px",position:"absolute",top:"20px",color: 'text.secondary' }}>
           Offline
        </Typography> 
                          </div>
                          ))
                         }
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        
      </Typography>
    </Stack>
  );
}
