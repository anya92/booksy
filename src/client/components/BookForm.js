import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { Buttons, Button } from './BookSide';

const Grid = styled.div`
  padding: 20px 40px;
  display: grid;
  grid-gap: 40px;
  grid-template-columns: 1fr 2fr;
`;

const Image = styled.div`
  display: grid;
  justify-content: center;
`;

const Form = styled.form`

`;

const FormElement = styled.div`
  padding: 10px;
  label {
    display: block;
    font-weight: 700;
    margin-bottom: 10px;
  }
  input, textarea, select {
    width: 100%;
    font-size: 16px;
    font-weight: 300;
    padding: 10px 15px;
    border: 1px solid #E0DDD9;
    outline: none;
    border-radius: 6px;
    transition: all .3s ease-out;
    &:focus {
      border-color: #9aecdb;
    }
  }
`;

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
      apiResults: [],
    };

    let timeout = this.timeout = null;
  }

  googleBooksAPICall() {    
    clearTimeout(this.timeout);

    this.timeout = setTimeout(async () => {
      if (this.state.title) {
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.title}&maxResults=5`);
        const apiResults = res.data.items.map(({ volumeInfo: result }) => ({
          title: result.title,
          author: result.authors && result.authors[0],
          image: result.imageLinks && result.imageLinks.thumbnail,
          description: result.description,
          categories: result.categories,
        }));
        this.setState({ apiResults });
      }
    }, 500);
  }

  handleInputChange(e, type) {
    const { value } = e.target;
    this.setState(() => ({ [type]: value }));
  }

  onSubmit(e) {
    e.preventDefault();
    // todo validation 
    const { title, author, image, description, category, toBorrow, toSell } = this.state;
    const book = { title, author, image, description, category, toBorrow, toSell };
    console.log(book);
    if (title && author) {
      this.props.onSubmit(book);
    } else {
      toast.error('Please supply a title and an author.');
    }
  }

  render() {
    const categoryOptions = ["Science fiction", "Drama", "Fiction", "Romance", "Horror", "Health", "Travel", "Children's", "Science", "History", "Poetry", "Comics", "Fantasy", "Biographies", "Other"]; // todo alphabetical order
    return (
      <Grid>
        <Image>
          { this.state.image && <img src={this.state.image} alt=""/> }
        </Image> 
        <Form onSubmit={e => this.onSubmit(e)}>
          {/* Title */}
          <FormElement>
            <label>Title</label>
            <input 
              type="text" 
              value={this.state.title}
              onChange={e => this.handleInputChange(e, 'title')}
              // onKeyUp={() => this.googleBooksAPICall()}
            />
          </FormElement>
          {/* Author */}
          <FormElement>
            <label>Author</label>
            <input
              type="text" 
              value={this.state.author}
              onChange={e => this.handleInputChange(e, 'author')}
            />
          </FormElement>
          {/* Image */}
          <FormElement>
            <label>Book Cover</label>
            <input
              type="text"
              placeholder="https://"
              value={this.state.image}
              onChange={e => this.handleInputChange(e, 'image')}
            />
          </FormElement>
          {/* Description */}
          <FormElement>
            <label>Description</label>
            <textarea
              value={this.state.description}
              onChange={e => this.handleInputChange(e, 'description')}
              rows={10}
              style={{ resize: 'none' }}
            />
          </FormElement>
          {/* Category */}
          <FormElement>
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
          </FormElement>
          {/* to borrow and/or sell */}
          <FormElement>
            <label>Set your book available to</label>
            <FormElement>
              <label htmlFor="borrow">borrow</label>
              <input
                type="checkbox"
                id="borrow"
                checked={this.state.toBorrow}
                onChange={() => this.setState(prevState => ({ toBorrow: !prevState.toBorrow }))}
              />
              <label htmlFor="sell">sell</label>
              <input
                type="checkbox"
                id="sell"
                checked={this.state.toSell}
                onChange={() => this.setState(prevState => ({ toSell: !prevState.toSell }))}
              />
            </FormElement>    
          </FormElement>
          <Buttons>
            <Button danger type="button" onClick={this.props.onCancel}>Cancel</Button>
            <Button type="submit">Save</Button>
          </Buttons>
        </Form>
      </Grid>
    );
  }
}

export default BookForm;
