import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

function CustomInputField({ name, label, required }) {
  const { control } = useFormContext()
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render={({ field }) => (
          <TextField
            fullWidth
            label={label}
            required
          />
        )}
        control={control}
        fullWidth
        name={name}
        label={label}
        required={required}
      />
    </Grid>
  )
}

export default CustomInputField
