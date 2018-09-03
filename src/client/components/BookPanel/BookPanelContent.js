import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';

import Bookmark from './Bookmark';
import Buttons from './Buttons';
import * as BookPanel from './BookPanelStyled';

export default ({
  error,
  hide,
  auth,
  book,
  isOwner,
  bookmarkBook,
  removeBook,
  requestBook,
  closePanel,
}) => {
  return (
    <BookPanel.Container className={hide ? 'hide' : ''}>
      { error ? <div>Error</div> : (
        <React.Fragment>
          <BookPanel.Slide down>
            <BookPanel.TopIcons>
              <Bookmark
                auth={auth}
                bookId={book.id}
                bookmarkBook={bookmarkBook}
              />
              <IconButton onClick={closePanel} id="close-bookPanel">
                <CloseIcon />
              </IconButton>
            </BookPanel.TopIcons>
            <BookPanel.BookAuthor>{book.author}</BookPanel.BookAuthor>
            <BookPanel.CoverAndTitle>
              <img src={book.image} alt={book.title} />
              <div>
                <BookPanel.BookTitle>{book.title}</BookPanel.BookTitle>
                <BookPanel.BookCategory>
                  { book.category && <Chip label={`# ${book.category}`} variant="outlined" /> }
                </BookPanel.BookCategory>
              </div>
            </BookPanel.CoverAndTitle>
          </BookPanel.Slide>
          <BookPanel.Slide up>
            <BookPanel.BookDescription>{book.description}</BookPanel.BookDescription>
            <BookPanel.BookOwner>
              Book owned by <strong>{book.owner.name}</strong>,
            </BookPanel.BookOwner>
            <Buttons
              auth={auth}
              book={book}
              isOwner={isOwner}
              removeBook={removeBook}
              closePanel={closePanel}
              requestBook={requestBook}
            />
          </BookPanel.Slide>
        </React.Fragment>
      ) }
    </BookPanel.Container>
  );
}
