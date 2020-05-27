const setNews = newNews => ({
    type: 'SET_NEWS',
    payload: newNews,
});

const newsLoadingStatus = () => ({
    type: 'LOADING_STATUS',
});

export { setNews, newsLoadingStatus };



