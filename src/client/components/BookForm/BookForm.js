import React, { Component } from 'react';

import Form from './Form';

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
    };
  }

  handleInputChange = (e, type) => {
    const { value } = e.target;
    this.setState(() => ({ [type]: value }));
  }

  handleSwitchChange = (e, type) => {
    this.setState({ [type]: e.target.checked });
  }

  onSubmit = e => {
    e.preventDefault();
    const { title, author, image, description, category, toBorrow, toSell } = this.state;
    const book = { title, author, image, description, category, toBorrow, toSell };
    
    this.props.onSubmit(book);
  }

  render() {
    const { onCancel } = this.props;

    return (
      <Form
        {...this.state}
        handleInputChange={this.handleInputChange}
        handleSwitchChange={this.handleSwitchChange}
        onCancel={onCancel}
        handleSubmit={this.onSubmit}
      />
    );
  }
}

export default BookForm;
