import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  showDataEmployee: PropTypes.array.isRequired,
};

export default function ProductList({ showDataEmployee, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {showDataEmployee?.map((item) => (
        <Grid key={item.id} item xs={12} sm={6} md={3}>
          <ShopProductCard dataa={item} />
        </Grid>
      ))}
    </Grid>
  );
}
