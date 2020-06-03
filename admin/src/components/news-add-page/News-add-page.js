import React, { useState } from 'react';
import { FormControl, Paper, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useStyles } from './News-add-page-style';
import { SaveButton } from '../buttons';
import wrapWithAdminService from '../wrappers';

import {
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
} from '../../actions';

const NewsAddPage = props => {
  const classes = useStyles();

  const {
    adminService,
    history,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage
  } = props;

  const { newsService } = adminService;

  const [author, setAuthor] = useState('');
  const [authorPhoto, setAuthorPhoto] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  const newsSaveHandler = async e => {
    e.preventDefault();
    const newNewsItem = {
      author: e.target.author.value,
      authorPhoto: e.target.authorPhoto.value,
      newsImage: e.target.newsImage.value,
      text: e.target.text.value,
      title: e.target.title.value
    };

    const res = await newsService.postNewsItem(newNewsItem);
    setSnackBarSeverity('success');
    setSnackBarMessage(`"${res.title}" succesfully saved!`);
    setSnackBarStatus(true);
    setAuthor('');
    setAuthorPhoto('');
    setNewsImage('');
    setText('');
    setTitle('');
    history.push(`/news`);
  };

  const authorHandler = e => {
    setAuthor(e.target.value);
  };
  const authorPhotoHandler = e => {
    setAuthorPhoto(e.target.value);
  };
  const newsImageHandler = e => {
    setNewsImage(e.target.value);
  };
  const textHandler = e => {
    setText(e.target.value);
  };
  const titleHandler = e => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={newsSaveHandler}>
      <FormControl>
        <Paper className={classes.brandAdd}>
          <TextField
            id='author'
            className={classes.textfield}
            variant='outlined'
            label='author'
            value={author}
            onChange={authorHandler}
            required
          />
          <TextField
            id='authorPhoto'
            className={classes.textfield}
            variant='outlined'
            label='Author Photo'
            value={authorPhoto}
            onChange={authorPhotoHandler}
            required
          />
          <TextField
            id='newsImage'
            className={classes.textfield}
            variant='outlined'
            label='News Image'
            value={newsImage}
            onChange={newsImageHandler}
            required
          />
          <TextField
            id='text'
            className={classes.textfield}
            variant='outlined'
            label='text'
            value={text}
            onChange={textHandler}
            required
          />
          <TextField
            id='title'
            className={classes.textfield}
            variant='outlined'
            label='title'
            value={title}
            onChange={titleHandler}
            required
          />
          <SaveButton id='save' type='submit' title='Save' />
        </Paper>
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = {
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
};

export default wrapWithAdminService()(
  connect(null, mapDispatchToProps)(withRouter(NewsAddPage))
);
