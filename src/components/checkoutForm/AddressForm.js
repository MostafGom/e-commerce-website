import React, { useState } from 'react'
import { InputLabel, Select, MenuItem, Grid, Button, Typography } from '@material-ui/core'
import { FormProvider, useForm } from 'react-hook-form'
import CustomInputField from './CustomInputField'
import { commerce } from '../../lib/Commerce'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function AddressForm({ checkoutToken, nextForm }) {
  const methods = useForm()
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState('')

  const countries = Object.entries(shippingCountries)
    .map(([code, name]) => ({ id: code, name: name }))
  const subdivisions = Object.entries(shippingSubdivisions)
    .map(([code, name]) => ({ id: code, name: name }))

  const options = shippingOptions.map(shipOption =>
    ({ id: shipOption.id, name: `${shipOption.description} - (${shipOption.price.formatted_with_symbol})` }))

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)

    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0])

  }

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)

    setShippingSubdivisions(subdivisions)
    setShippingSubdivision(Object.keys(subdivisions)[0])

  }

  const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })

    setShippingOptions(options)
    setShippingOption(Object.keys(options)[0])

  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
  }, [])

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry)
  }, [shippingCountry])

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)

  }, [shippingSubdivision])

  return (
    <>
      <Typography variant='h6' gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit((data) =>
          nextForm({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}
        >
          <Grid container spacing={3}>
            <CustomInputField name='firstName' label='First Name' required />
            <CustomInputField name='secondName' label='Second Name' required />
            <CustomInputField name='address' label='Address' required />
            <CustomInputField name='email' label='Email' required />
            <CustomInputField name='city' label='City' required />
            <CustomInputField name='zip' label='Zip / Postal Code' required />

            <Grid item xs={12} sm={6} style={{ marginTop: '40px' }}>
              <InputLabel>Shipping Countries</InputLabel>
              <Select value={shippingCountry} fullWidth
                onChange={e => setShippingCountry(e.target.value)}>
                {countries.map(country =>
                (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6} style={{ marginTop: '40px' }}>
              <InputLabel>Shipping Subdivisions</InputLabel>
              <Select value={shippingSubdivision} fullWidth
                onChange={e => setShippingSubdivision(e.target.value)}>
                {subdivisions.map(subdivision =>
                (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>



            <Grid item xs={12} sm={6} style={{ marginTop: '40px' }}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth
                onChange={e => setShippingOption(e.target.value)}>
                {options.map(option =>
                (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
            <Button color='primary' type='submit' variant='contained'>Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
