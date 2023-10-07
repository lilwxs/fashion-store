import { Typography, Link as MuiLink, Box } from '@mui/material';
import Link from 'next/link';

const Footer = () => {
  return (
    <Box component='footer' sx={{ margin: '50px 0 0' }}>
      <Typography variant='subtitle2' align='center' color='text.secondary' component='p'>
        Cửa hang của chúng tôi chuyên cung cấp các loại thời trang thời thượng nhất thị trường hiện nay.
        <br />
      </Typography>
      <Typography variant='body2' sx={{ display: 'block' }} color='text.secondary' align='center'>
        {'Copyright © '}
        <MuiLink
          component={Link}
          underline='always'
          // color='inherit'
          href='hoangthaininh'
          target='_blank'
        >
          Hoang Thai Ninh
        </MuiLink>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};

export default Footer;
