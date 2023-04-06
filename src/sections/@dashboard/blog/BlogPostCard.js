import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import POSTS from '../../../_mock/blog';
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop:'320px',
});

const StyledTitle = styled(Link)({
  marginBottom:"5px",
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  textTransform:"capitalize",
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 39,
  height: 39,
  position: 'absolute',
  left: '21px',
  bottom:'-23px',
  background:"linear-gradient(90deg, #61aa71 0%, #319793 100%)"
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  postData: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ postData, index }) {
  const { image,birthDate,fullname,post,cover,city, title, view, comment, share, author, createdAt } = postData;
  // const latestPostLarge = index === 0;
  // const latestPost = index === 1 || index === 2;

  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];

  return (
    <Grid item xs={12} sm={ 6} md={ 3}>
  <Box>
  <Card sx={{ position: 'relative' }}>
        <StyledCardMedia
        >
          <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
            }}
          />
       
                <StyledAvatar>
                  <Typography sx={{fontSize:"13px"}}>{postData?.E_Id}</Typography>
                </StyledAvatar>
          <StyledCover alt={fullname} src={`https://hopebackend.hopeinfosys.com/${image}`} />
        </StyledCardMedia>

        <CardContent
        sx={{marginTop:"10px"}}
        >
         

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
          >
            {postData?.userName}
          </StyledTitle>
          <Typography gutterBottom variant="caption" sx={{ display: 'block' }}>
            {"10/02/200"}
          </Typography>
          <Typography gutterBottom variant="caption" sx={{ display: 'block' }}>
            {postData?.mobileNumber}
          </Typography>
          <Typography gutterBottom variant="caption" sx={{ display: 'block' }}>
          {"Surat"}
          </Typography>
          {/* <StyledInfo>
            {POST_INFO?.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                }}
              >
                <img icon={info.icon} />
                <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </StyledInfo> */}
        </CardContent>
      </Card>
  </Box>
    </Grid>
  );
}
