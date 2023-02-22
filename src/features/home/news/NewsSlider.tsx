import { useNews } from './use-news';
import { NewsCard } from './NewsCard';
import { useButtons } from './use-buttons';
import { useRef } from 'react';
import { Loader } from 'components/common/Loader';
const NewsSlider = () => {
    const [news, { error, status }] = useNews();
    const [scrollToNextItem, scrollToPrevItem] = useButtons();
    const nextBtn = useRef(null);
    const prevBtn = useRef(null);
    const scroller = useRef(null);

    return (
        <>
            {error && <h4 className='list-error'>{error}</h4>}
            {!error && (
                <div
                    data-testid='news-slider'
                    className={`news-slider news-slider_spacing ${status === 'loading' ? 'news-slider-loading' : ''}`}
                >
                    <div ref={scroller} className={`scroller ${status === 'loading' ? 'scroller-loading' : ''}`}>
                        <div className='news-items-block'>
                            {error && <h4 className='list-error'>Can&apos;t get news list</h4>}
                            {status === 'loading' && <Loader />}
                            <>
                                {status === 'received' &&
                                    news.map((item, index) => {
                                        return (
                                            <NewsCard
                                                key={index}
                                                description={item.description}
                                                title={item.title}
                                                url={item.url}
                                                urlToImage={item.urlToImage}
                                            />
                                        );
                                    })}
                            </>
                        </div>
                    </div>
                    <div className='btns-block btns-block_spacing'>
                        <button
                            className='left-btn left-btn_disabled'
                            ref={prevBtn}
                            onClick={() => scrollToPrevItem(nextBtn.current, prevBtn.current, scroller.current)}
                        ></button>
                        <button
                            className='right-btn right-btn_enabled'
                            ref={nextBtn}
                            onClick={() => scrollToNextItem(nextBtn.current, prevBtn.current, scroller.current)}
                        ></button>
                    </div>
                </div>
            )}
        </>
    );
};
export { NewsSlider };
