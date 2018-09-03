import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import ImageIcon from '@material-ui/icons/Image';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

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
  button: {
    margin: theme.spacing.unit,
  },
});

class BookForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.book ? props.book.title : '',
      author: props.book ? props.book.author : '',
      image: props.book ? props.book.image : '',
      description: props.book ? props.book.description : '',
      category: props.book ? props.book.category : '',
      toBorrow: props.book ? props.book.toBorrow : true,
      toSell: props.book ? props.book.toSell : false,
      // apiResults: [],
      showBookCover: false,
    };

    // let timeout = this.timeout = null;
  }

  // googleBooksAPICall() {    
  //   clearTimeout(this.timeout);

  //   this.timeout = setTimeout(async () => {
  //     if (this.state.title) {
  //       const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.title}&maxResults=5`);
  //       const apiResults = res.data.items.map(({ volumeInfo: result }) => ({
  //         title: result.title,
  //         author: result.authors && result.authors[0],
  //         image: result.imageLinks && result.imageLinks.thumbnail,
  //         description: result.description,
  //         categories: result.categories,
  //       }));
  //       this.setState({ apiResults });
  //     }
  //   }, 500);
  // }

  handleInputChange(e, type) {
    const { value } = e.target;
    this.setState(() => ({ [type]: value }));
  }

  onSubmit(e) {
    e.preventDefault();
    const { title, author, image, description, category, toBorrow, toSell } = this.state;
    const book = { title, author, image, description, category, toBorrow, toSell };

    if (title && author) {
      this.props.onSubmit(book);
    } else {
      toast.error('Please supply a title and an author.');
    }
  }

  render() {
    const categoryOptions = ["Biographies", "Children's", "Comics", "Drama", "Fantasy", "Fiction", "Horror", "Poetry", "Romance", "Science fiction", "Other"]; 
    const { classes, theme } = this.props;
    // TODO tags
    return (
      <div> 
        <form onSubmit={e => this.onSubmit(e)} className={classes.form}>
          {/* Title */}
          <TextField
            id="title"
            label="Title"
            required
            margin="normal"
            className={classes.textField}
            value={this.state.title}
            onChange={e => this.handleInputChange(e, 'title')}
          />
          {/* Author */}
          <TextField
            id="author"
            label="Author"
            required
            className={classes.textField}
            margin="normal"
            value={this.state.author}
            onChange={e => this.handleInputChange(e, 'author')}
          />
          {/* Book Cover */}
          <FormControl className={classes.textField} margin="normal">
            <InputLabel htmlFor="book-cover">Book cover link</InputLabel>
            <Input 
              id="book-cover"
              value={this.state.image}
              onChange={e => this.handleInputChange(e, 'image')}
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
                src={this.state.image}
                alt={this.state.title}
                className={classes.modalContent} />
            </Modal> 
          </FormControl>
          {/* Description */}
          <TextField
            id="description"
            label="Description"
            className={classes.textField}
            margin="normal"
            multiline
            rows={4}
            value={this.state.description}
            onChange={e => this.handleInputChange(e, 'description')}
          />
          {/* Category */}
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="select-category">Category</InputLabel>
            <Select
              value={this.state.category}
              onChange={e => this.handleInputChange(e, 'category')}
              input={<Input id="select-category" />}
            >
              {categoryOptions.map(category => (
                <MenuItem
                  key={category}
                  value={category}
                  style={{
                    fontWeight:
                      this.state.category === category
                        ? theme.typography.fontWeightMedium
                        : theme.typography.fontWeightRegular
                  }}
                >
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* to borrow and/or sell */}
          <div>
            <Typography variant="body1">Set your book available to</Typography>
            <FormGroup row className={classes.textField}
              margin="normal">
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.toBorrow}
                    onChange={e => this.setState({ toBorrow: e.target.checked })}
                    value="toBorrow"
                    color="primary"
                  />
                }
                label="borrow"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.toSell}
                    onChange={e => this.setState({ toSell: e.target.checked })}
                    value="toSell"
                    color="primary"
                  />
                }
                label="sell"
              />
            </FormGroup>
          </div>
          <div>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.button}
              onClick={this.props.onCancel}  
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BookForm);
