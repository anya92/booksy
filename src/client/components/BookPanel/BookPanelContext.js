import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Loadable from 'react-loadable';

const loading = () => null;

const AsyncBookPanel = Loadable({
  loader: () => import(/* webpackChunkName: "book_panel" */ './BookPanel'),
  loading,
});

const { Provider, Consumer } = React.createContext();

class BookPanelProvider extends Component {
  state = {
    BookPanelOpen: false,
    bookId: ''
  }

  handleClose = () => {
    this.setState({
      BookPanelOpen: false,
      bookId: ''
    });
  }

  handleCloseAsync = () => {
    setTimeout(() => {
      this.setState({
        BookPanelOpen: false,
        bookId: ''
      });
    }, 600);
  }

  render() {
    return (
      <Provider value={{
        showPanel: id => {
          this.setState(() => ({ BookPanelOpen: true, bookId: id }));
        },
      }}>
        <Modal
          open={this.state.BookPanelOpen}
          onClose={this.handleClose}
        >
          <AsyncBookPanel
            open={this.state.BookPanelOpen}
            bookId={this.state.bookId}
            close={this.handleCloseAsync}
            auth={this.props.auth}
          />
        </Modal>
        { this.props.children }
      </Provider>
    );
  }
}

export { BookPanelProvider, Consumer };
