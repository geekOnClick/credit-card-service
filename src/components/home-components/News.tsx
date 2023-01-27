import { NewsSlider } from 'features/home/news/NewsSlider';

const News = () => {
    return (
        <div className='news news_spacing d-flex flex-column align-items-center'>
            <h3>Current news from the world of finance</h3>
            <h5>
                We update the news feed every 15 minutes. You can learn more by
                clicking on the news you are interested in.
            </h5>
            <NewsSlider />
        </div>
    );
};
export { News };
