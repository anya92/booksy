import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import ImageIcon from '@material-ui/icons/Image';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

class BookCoverInput extends Component {
  state = {
    showBookCover: false,
  }

  render() {
    const { classes, image, title, handleChange } = this.props;
    return (
      <FormControl className={classes.textField} margin="normal">
        <InputLabel htmlFor="book-cover">Book cover link</InputLabel>
        <Input
          id="book-cover"
          value={image}
          onChange={e => handleChange(e, 'image')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle image visibility"
                onClick={() => this.setState({ showBookCover: true })}
              >
                <ImageIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        <Modal
          open={this.state.showBookCover}
          onClose={() => this.setState({ showBookCover: false })}
        >
          <img
            src={image}
            alt={title}
            className={classes.modalContent} />
        </Modal>
      </FormControl>
    );
  }
}

export default withStyles(styles)(BookCoverInput);
