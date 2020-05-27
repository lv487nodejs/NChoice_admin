import AdminService from './Admin-service';

class NewsService extends AdminService {

    getAllNews = async () => {
        const news = await this.getResource('news');
        return news;
    };

}

const newsService = new NewsService();

export default newsService;
