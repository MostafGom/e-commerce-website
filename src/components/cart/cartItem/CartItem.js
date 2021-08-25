import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
function CartItem({ cartItem, handleUpdateCartQty, handleRemoveFromCart }) {

  const classes = useStyles()

  return (
    <Card>
      <CardMedia image={cartItem.media.source} alt={cartItem.name} className={classes.media} />

      <CardContent className={classes.cardContent}>
        <Typography variant='h5'>{cartItem.name}</Typography>
        <Typography variant='h5'>{cartItem.line_total.formatted_with_symbol}</Typography>
      </CardContent>

      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button type='button' size='small'
            onClick={() => handleUpdateCartQty(cartItem.id, cartItem.quantity - 1)}
          >
            -
          </Button>

          <Typography>{cartItem.quantity}</Typography>

          <Button type='button' size='small'
            onClick={() => handleUpdateCartQty(cartItem.id, cartItem.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button type='button' variant='contained' color='secondary' size='small'
          onClick={() => handleRemoveFromCart(cartItem.id)}

        >Remove</Button>
      </CardActions>

    </Card>

  )
}

export default CartItem
