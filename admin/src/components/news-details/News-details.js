import React, { useState, useEffect } from 'react';
import { Paper, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useStyles } from './News-details-style';
import { SaveButton } from '../buttons';
import wrapWithAdminService from '../wrappers';

import {
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage,
    setNewsItem,
} from '../../actions';

const NewsDetails = props => {
    const classes = useStyles();
    const [newsAuthor, setNewsAuthor] = useState('');
    const {
        adminService,
        setSnackBarStatus,
        setSnackBarSeverity,
        setSnackBarMessage,
        setNewsItem,
        newsItem,
        match,
        history,
    } = props;
    const { id } = match.params;
    const { newsService } = adminService;

    useEffect(() => {
        newsService.getNewsItemById(id).then(res => {
            console.log(res.author)
            setNewsItem(res);
            setNewsAuthor(res.author);
        });
    }, [newsService, id, setNewsItem]);

    const brandSaveHandler = async e => {
        e.preventDefault();
        const newNewsItem = { ...newsItem };
        newNewsItem.author = newsAuthor;
        console.log(newNewsItem)
        await newsService.putNewsItem(newNewsItem);

        setSnackBarSeverity('success');
        setSnackBarMessage(`Brand succesfully edited!`);
        setSnackBarStatus(true);
        history.push(`/news`);
    };
    const changeHandler = e => {
        setNewsAuthor(e.target.value);
    };

    return (
        <form onSubmit={brandSaveHandler}>
            <Paper className={classes.brandEdit}>
                <TextField
                    id="authorName"
                    className={classes.textfield}
                    variant="outlined"
                    label="Author"
                    value={newsAuthor}
                    onChange={changeHandler}
                    required
                />
                <SaveButton type="submit" title="Save" />
            </Paper>
        </form>
    );
};

const mapStateToProps = ({ newsState: { newsItem } }) => ({
    newsItem,
});
const mapDispatchToProps = {
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage,
    setNewsItem,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(NewsDetails))
);