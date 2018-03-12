import React, { Component } from 'react';
import axios from 'axios';

class BookForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      author: '',
      image: '',
      description: '',
      category: '',
      toBorrow: true,
      toSell: false,
      apiResults: [],
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
    // todo validation 
    const { title, author, image, description, category, toBorrow, toSell } = this.state;
    const book = { title, author, image, description, category, toBorrow, toSell };
    console.log(book);
    this.props.onSubmit(book);
  }

  render() {
    const categoryOptions = ["Science fiction", "Drama", "Fiction", "Romance", "Horror", "Health", "Travel", "Children's", "Science", "History", "Poetry", "Comics", "Fantasy", "Biographies", "Other"]; // todo alphabetical order
    return (
      <div>
        <form onSubmit={e => this.onSubmit(e)}>
          {/* Title */}
          <div>
          <label htmlFor="">Title</label>
            <input 
              type="text" 
              value={this.state.title}
              onChange={e => this.handleInputChange(e, 'title')}
              // onKeyUp={() => this.googleBooksAPICall()}
            />
          </div>
          {/* Author */}
          <div>
            <label htmlFor="">Author</label>
            <input
              type="text" 
              value={this.state.author}
              onChange={e => this.handleInputChange(e, 'author')}
            />
          </div>
          {/* Image */}
          <div>
            <label htmlFor="">Book Cover</label>
            <input
              type="text"
              placeholder="https://"
              value={this.state.image}
              onChange={e => this.handleInputChange(e, 'image')}
            />
            { this.state.image && <img src={this.state.image} alt=""/> }
          </div>
          {/* Description */}
          <div>
            <label htmlFor="">Description</label>
            <textarea
              value={this.state.description}
              onChange={e => this.handleInputChange(e, 'description')}
              rows={5}
              style={{ resize: 'none' }}
            />
          </div>
          {/* Category */}
          <div>
            <label htmlFor="">Category</label>
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
          </div>
          {/* to borrow and/or sell */}
          <div>
            <label>Set your book available</label>
            <div>
              <label htmlFor="borrow">to borrow</label>
              <input
                type="checkbox"
                id="borrow"
                checked={this.state.toBorrow}
                onChange={() => this.setState(prevState => ({ toBorrow: !prevState.toBorrow }))}
              />
              <label htmlFor="sell">to sell</label>
              <input
                type="checkbox"
                id="sell"
                checked={this.state.toSell}
                onChange={() => this.setState(prevState => ({ toSell: !prevState.toSell }))}
              />
            </div>    
          </div>
          <button type="button" onClick={this.props.onCancel}>Cancel</button>
          <button type="submit">Save</button>
        </form>
        {/* <div>
          <h3>Results</h3>
          {
            this.state.apiResults.map(result => (
              <div>{result}</div>
            ))
          }
        </div> */}
      </div>
    );
  }
}

export default BookForm;
