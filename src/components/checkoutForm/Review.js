import React from 'react'
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'


function Review({ checkoutToken }) {
  return (
    <>
      <Typography variant='h6' gutterBottom>Check Out Summary</Typography>
      <List disablePadding>
        {checkoutToken.live.line_items.map(product => (
          <ListItem style={{ padding: '30px 0' }} key={product.name}>
            <ListItemText primary={product.name} secondary={`Quantity : ${product.quantity}`} />
            <Typography variant='body2'>{product.line_total.formatted_with_symbol}</Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: '30px 0' }} >
          <ListItemText primary='Total' />
        </ListItem>
        <Typography variant='subtitle1' style={{ fontWeight: 800 }}>
          {checkoutToken.live.subtotal.formatted_with_symbol}
        </Typography>
      </List>
    </>
  )
}

export default Review
