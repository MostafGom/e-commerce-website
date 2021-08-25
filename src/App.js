import React, { useState, useEffect } from 'react'
import { Navbar, Products, Cart, Checkout } from './components'
import { commerce } from './lib/Commerce'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

/*
start Custom Theme
*/
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { amber, brown } from "@material-ui/core/colors";
const theme = createTheme({
  palette: {
    primary: amber,
    secondary: brown

  }
})
/*
end Custom Theme
*/

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [error, setError] = useState('')
  const fetchProducts = async () => {
    const { data } = await commerce.products.list()

    setProducts(data)
  }
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())

  }

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity)

    setCart(cart)
  }


  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity })

    setCart(cart)
  }


  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId)

    setCart(cart)
  }


  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty()

    setCart(cart)
  }

  const refreshCart = async () => {
    const newCart = commerce.cart.refresh()
    setCart(newCart)
  }
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incomingOrder)
      refreshCart()
    } catch (error) {
      setError(error.data.error.message)
    }
  }
  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])


  return (
    <ThemeProvider theme={theme}>
      <Router>

        <div className="App">
          <Navbar totalItems={cart.total_items} />

          <Switch>

            <Route exact path='/'>
              <Products products={products} addToCart={handleAddToCart} />
            </Route>

            <Route exact path='/cart'>
              <Cart cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            </Route>

            <Route exact to='/checkout'>
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={error}
              />
            </Route>

          </Switch>

        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
