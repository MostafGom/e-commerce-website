import React from 'react'
import { Container, Grid, Typography, Button } from '@material-ui/core'
import useStyles from './styles'
import CircularProgress from '@material-ui/core/CircularProgress';
import CartItem from './cartItem/CartItem';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';

function Cart({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) {

  // const isEmpty = !cart.total_items
  const classes = useStyles()

  // When cart is empty
  const EmptyCart = () => (
    <>
      <Typography variant='h6'>You have no items in your cart</Typography>
      <Container component={Link} to='/' className={classes.emptyCart} >
        <Typography variant='h4'>
          <ShoppingCartIcon style={{ fontSize: '50px' }} color='secondary' />
          Start Shopping Right Now!
          <ShoppingCartIcon style={{ fontSize: '50px' }} color='secondary' />
        </Typography>
      </Container>
    </>
  )

  // when cart has items
  const FileCart = () => (
    <>
      <Grid container spacing={1} >
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              cartItem={item}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>

      <div className={classes.cardDetails} >
        <Typography variant='h4' gutterBottom>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
        <div>
          <Button className={classes.emptyButton} variant='contained' type='submit' size='medium' color='secondary' onClick={handleEmptyCart}>Empty Cart</Button>

          <Button
            className={classes.checkoutButton}
            variant='contained' type='submit'
            size='large' color='primary'
            component={Link} to='/checkout'>
            Check Out
          </Button>
        </div>
      </div>
    </>
  )

  /*Loading until it fetches data*/
  if (!cart.line_items) return <CircularProgress />



  return (
    <Container>
      <div className={classes.toolbar} />

      <Typography className={classes.title} variant='h3' gutterBottom>Your Cart Items</Typography>
      {!cart.total_items ? <EmptyCart /> : <FileCart />}
    </Container>
  )
}

export default Cart
