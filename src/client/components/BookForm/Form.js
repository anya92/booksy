import React from 'react'
import { withStyles } from '@material-ui/core/styles';

import Input from './Input';
import BookCoverInput from './BookCoverInput';
import CategoryInput from './CategoryInput';
import Switches from './Switches';
import Buttons from './Buttons';

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

const Form = ({
  classes,
  title,
  author,
  image,
  description,
  category,
  toBorrow,
  toSell,
  onCancel,
  handleSubmit,
  handleInputChange,
  handleSwitchChange,
}) => {
  return (
    <form onSubmit={e => handleSubmit(e)} className={classes.form}>
      <Input
        name="title"
        required={true}
        value={title}
        handleChange={handleInputChange}
      />
      <Input
        name="author"
        required={true}
        value={author}
        handleChange={handleInputChange}
      />
      <BookCoverInput
        image={image}
        title={title}
        handleChange={handleInputChange}
      />
      <Input
        name="description"
        multiline={true}
        rows={4}
        value={description}
        handleChange={handleInputChange}
      />
      <CategoryInput
        category={category}
        handleChange={handleInputChange}
      />
      <Switches
        toBorrow={toBorrow}
        toSell={toSell}
        handleChange={handleSwitchChange}
      />
      <Buttons onCancel={onCancel} />
    </form>
  );
}

export default withStyles(styles)(Form);
