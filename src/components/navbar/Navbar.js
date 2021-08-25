import React from 'react'
import { AppBar, Toolbar, Badge, Typography, IconButton, MenuItem, Menu } from '@material-ui/core'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import logo from '../../assets/logo.jpg'
import useStyles from './styles'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ totalItems }) {
  const classes = useStyles()
  const location = useLocation()
  return (
    <>
      <AppBar position='fixed' className={classes.apppBar} >
        <Toolbar style={{ backgroundColor: 'black' }}>
          <Typography component={Link} to='/' variant='h6' className={classes.title} color="primary">
            <img src={logo} alt="cosmic commerce" height='25px' className={classes.image} />
            Cosmic Commerce
          </Typography>

          <div className={classes.grow} />

          {location.pathname === '/' &&
            <div className={classes.button}>
              <IconButton component={Link} to='/cart' aria-label='show cart items'>
                <Badge badgeContent={totalItems} color='primary' >
                  <ShoppingCart style={{ color: 'white' }} />
                </Badge>
              </IconButton>
            </div>
          }
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
