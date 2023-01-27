import { INews } from 'types/home';
import errImg from '../../../assets/img/errImg.jpg';

const NewsCard = (article: INews) => {
    const { urlToImage, title, url, description } = article;
    return (
        <div className='news-item d-flex justify-content-center align-items-center'>
            <div className='card'>
                <img src={urlToImage ? urlToImage : errImg} alt='news' />
                <p>{title ? title : 'Title not avaliable'}</p>
                <p>
                    {' '}
                    <a href={url} target='_blank' rel='noreferrer'>
                        {description}
                    </a>
                </p>
            </div>
        </div>
    );
};
export { NewsCard };
