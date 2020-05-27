import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import wrapWithAdminService from '../wrappers';

import {
    setNews,
    newsLoadingStatus
} from '../../actions';

import useStyle from './News-page-style';
import LoadingBar from '../loading-bar';
import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

import { config } from '../../config';

const tableTitles = config.tableHeadRowTitles.news;


const TestList = ({
    news,
    adminService,
    loading,
    setNews,
    newsLoadingStatus
}) => {
    const { newsService } = adminService;

    const classes = useStyle();

    useEffect(() => {
        newsLoadingStatus();
        newsService.getAllNews().then(res => setNews(res));
    }, [newsService, setNews, newsLoadingStatus]);

    const newsItems = news.map((news, index) => (
        <TableContainerRow
            key={index}
            id={news._id}
            author={news.author}
            title={news.title}
        />
    ));


    if (loading) {
        return <LoadingBar />;
    }
    return (
        <div>
            <div className={classes.tableNav}>
                <Button
                    id="add-news"
                    component={Link}
                    variant="contained"
                    color="primary"
                >
                    Create News
                </Button>
            </div>
            <TableContainerGenerator id="newsTable" tableTitles={tableTitles} tableItems={newsItems} />
        </div>
    );
};

const mapStateToProps = ({ newsState: { news, loading } }) => ({
    news,
    loading,
});

const mapDispatchToProps = {
    setNews,
    newsLoadingStatus,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(TestList))
);
