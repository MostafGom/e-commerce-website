import React, { useEffect, useState } from 'react'
import { Paper, Stepper, Step, CircularProgress, Typography, StepLabel, Divider, Button, CssBaseline } from '@material-ui/core'
import useStyles from './styles.js'
import AddressForm from '../AddressForm.js'
import PaymentForm from '../PaymentForm.js'
import { commerce } from '../../../lib/Commerce.js'
import { Link, useHistory } from 'react-router-dom'

const stepsArr = ['Shipping Address', ['Payment Details']]
function Checkout({ cart, onCaptureCheckout, order, error }) {

  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})
  const [isFinished, setIsFinished] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
        // console.log(token);
        setCheckoutToken(token)
      } catch (error) {
        // history.pushState('/');
        console.log(error);
      }
    }

    generateToken()

  }, [cart])

  const nextStep = () => setActiveStep((prev) => prev += 1)
  const backStep = () => setActiveStep((prev) => prev -= 1)

  const nextForm = (data) => {
    setShippingData(data)
    nextStep()
  }

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true)
    }, 3000);
  }
  const Form = () => activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} nextForm={nextForm} />
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken}
      backStep={backStep} onCaptureCheckout={onCaptureCheckout}
      nextStep={nextStep} timeout={timeout} />


  let Confirmation = () => order.customer ? (
    <>
      <div>
        <Typography variant='h5'>Than you {order.customer.firstname} {order.customer.lastname} for trusting our products</Typography>
        <Divider className={classes.divider} />
        <Typography variant='subtitle2'>Order reference : {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} to='/' variant='contained' type='button' color='primary'>
        Back to Home
      </Button>
    </>
  ) : isFinished ? (
    <>
      <div>
        <Typography variant='h5'>Than you for trusting our products</Typography>
        <Divider className={classes.divider} />
        <Typography variant='subtitle2'>Order reference : xxxx-xxxx-xxx</Typography>
      </div>
      <br />
      <Button component={Link} to='/' variant='contained' type='button' color='primary'>
        Back to Home
      </Button>
    </>
  ) :
    (
      <div>
        <CircularProgress />
      </div>
    )
  if (error) {
    return (
      <>
        <Typography variant='h5' color='secondary'>Error : {error}</Typography>
        <br />
        <Button component={Link} to='/' variant='contained' type='button' color='primary'>
          Back to Home
        </Button>
      </>
    )
  }


  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>Check Out</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {stepsArr.map(step => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === stepsArr.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </div>
    </>
  )
}

export default Checkout
