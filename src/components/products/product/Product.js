import React from 'react'
import { Card, CardMedia, CardActions, Typography, IconButton, CardContent } from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import useStyles from './styles'

function Product({ productData, addToCart }) {
  const classes = useStyles()

  return (
    <Card className={classes.root} >
      <CardMedia
        className={classes.media}
        title={productData.name}
        image={productData.media.source}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant='h5' gutterBottom>{productData.name}</Typography>
          <Typography variant='h5' >{productData.price.formatted_with_symbol}</Typography>
        </div>
        <Typography className={classes.desc} variant='body2' color='textSecondary' dangerouslySetInnerHTML={{ __html: productData.description }} />
      </CardContent>

      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton style={{ color: '#ffa000' }} aria-label='add to cart' onClick={() => addToCart(productData.id, 1)}>
          <AddShoppingCartIcon fontSize='large' />
          <Typography variant='body2'>Add to Cart</Typography>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Product
