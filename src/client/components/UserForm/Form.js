import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '../BookForm/Input';

const styles = theme => ({
  form: {
    marginTop: '40px',
    display: 'grid',
    gridGap: '20px',
    gridTemplateColumns: '1fr',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
});

const Form = ({ name, email, firstName, lastName, city, country, handleSubmit, handleChange, classes }) => {
  return (
    <form onSubmit={e => handleSubmit(e)} className={classes.form}>
      <Input
        name="name"
        value={name}
        handleChange={handleChange}
      />
      <Input
        name="email"
        value={email}
        disabled
      />
      <Input
        name="firstName"
        value={firstName}
        label="First name"
        handleChange={handleChange}
      />
      <Input
        name="lastName"
        value={lastName}
        label="Last name"
        handleChange={handleChange}
      />
      <Input
        name="city"
        value={city}
        handleChange={handleChange}
      />
      <Input
        name="country"
        value={country}
        handleChange={handleChange}
      />
      <div>
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary">
          Save
        </Button>
      </div>
    </form>
  );
}

export default withStyles(styles)(Form);
