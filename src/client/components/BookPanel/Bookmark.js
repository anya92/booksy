import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

export default ({ auth, bookId, bookmarkBook }) => {
  if (auth) {
    const bookmarksIds = auth.bookmarks.map(bookmark => bookmark.id);
    return bookmarksIds.includes(bookId)
      ? (
        <IconButton onClick={() => bookmarkBook(bookId)}>
          <BookmarkIcon />
        </IconButton>
      ) : ( 
        <IconButton onClick={() => bookmarkBook(bookId)}>
          <BookmarkBorderIcon />
        </IconButton>
      );
  } else return <div />;
}
