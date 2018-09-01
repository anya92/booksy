import React, { Component } from 'react';
// import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';

import * as Form from '../styled/Form';
import { ButtonsContainer, Button } from '../styled/Buttons';

const styles = () => ({
  textInput: {

  }
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

    let timeout = this.timeout = null;
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
    // todo validation 
    const { title, author, image, description, category, toBorrow, toSell } = this.state;
    const book = { title, author, image, description, category, toBorrow, toSell };

    if (title && author) {
      this.props.onSubmit(book);
    } else {
      toast.error('Please supply a title and an author.');
    }
  }

  render() {
    const categoryOptions = ["Science fiction", "Drama", "Fiction", "Romance", "Horror", "Health", "Travel", "Children's", "Science", "History", "Poetry", "Comics", "Fantasy", "Biographies", "Other"]; // todo alphabetical order
    return (
      <div> 
        <form onSubmit={e => this.onSubmit(e)}>
          {/* Title */}
          {/* <Form.Element> */}
            {/* <label>Title</label> */}
            <TextField
              id="title"
              label="Title"
              fullWidth
              required
              margin="normal"
              // type="text" 
              value={this.state.title}
              onChange={e => this.handleInputChange(e, 'title')}
              // onKeyUp={() => this.googleBooksAPICall()}
            />
          {/* </Form.Element> */}
          {/* Author */}
          <Form.Element>
            <label>Author</label>
            <input
              type="text" 
              value={this.state.author}
              onChange={e => this.handleInputChange(e, 'author')}
            />
          </Form.Element>
          {/* Book Cover */}
          <Form.Element>
            <label>Book Cover</label>
            <Form.ElementWithAddon>
              <Form.Addon>https://</Form.Addon>
              <input
                type="text"
                value={this.state.image}
                onChange={e => this.handleInputChange(e, 'image')}
              />
              <Form.Addon 
                onClick={() => this.setState({ showBookCover: true })}>
                <i className="fa fa-image" />
              </Form.Addon>
            </Form.ElementWithAddon>
            <Form.BookCoverModal
              open={this.state.showBookCover}
            >
              <img src={this.state.image} alt={this.state.title} />
              <span onClick={() => this.setState({ showBookCover: false })}>&#x2715;</span>
            </Form.BookCoverModal> 
          </Form.Element>
          {/* Description */}
          <Form.Element>
            <label>Description</label>
            <textarea
              value={this.state.description}
              onChange={e => this.handleInputChange(e, 'description')}
              rows={10}
              style={{ resize: 'none' }}
            />
          </Form.Element>
          {/* to borrow and/or sell */}
          <Form.Element>
            <label>Set your book available to</label>
            <Form.Checkboxes>
              <Form.Checkbox>
                <input
                  type="checkbox"
                  id="borrow"
                  checked={this.state.toBorrow}
                  onChange={() => this.setState(prevState => ({ toBorrow: !prevState.toBorrow }))}
                />
                <label htmlFor="borrow">borrow</label>
              </Form.Checkbox>             
              <Form.Checkbox>
                <input
                  type="checkbox"
                  id="sell"
                  checked={this.state.toSell}
                  onChange={() => this.setState(prevState => ({ toSell: !prevState.toSell }))}
                />
                <label htmlFor="sell">sell</label>
              </Form.Checkbox>           
            </Form.Checkboxes>    
          </Form.Element>
          {/* Category */}
          <Form.Element>
            <label>Category</label>
            <select
              id="category"
              value={this.state.category || 'Choose'}
              onChange={e => this.handleInputChange(e, 'category')}
            >
              <option disabled hidden>Choose</option>
              {
                categoryOptions.map((category, i) => (
                  <option key={i} value={category}>{category}</option>
                ))
              }
            </select>
          </Form.Element>
          <ButtonsContainer>
            <Button danger type="button" onClick={this.props.onCancel}>Cancel</Button>
            <Button type="submit">Save</Button>
          </ButtonsContainer>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(BookForm);
