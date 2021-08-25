import { Grid } from '@material-ui/core'
import React from 'react'
import Product from './product/Product'
import useStyles from './styles'
import bg from '../../assets/bg2.jpg'

function Products({ products, addToCart }) {
  const classes = useStyles()

  return (
    <main className={classes.content}>
      <img
        className={classes.home__img}
        src={bg}
        alt="banner"
      />
      <div className={classes.toolbar} />
      <Grid container justifyContent='center'>
        {products.map(product => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product productData={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  )
}

export default Products
