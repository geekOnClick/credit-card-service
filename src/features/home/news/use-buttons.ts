import { useSelector } from 'react-redux';
import { selectNewsInfo } from './news-selectors';

export const useButtons = () => {
    const { qty } = useSelector(selectNewsInfo);

    const sliderOptions = {
        sliderCount: qty,
        startedSlidersCount: 3,
        currentSlider: 0,
    };
    const scrollToNextItem = (
        nextBtn: HTMLButtonElement | null,
        prevBtn: HTMLButtonElement | null,
        scroller: HTMLDivElement | null
    ) => {
        if (scroller && prevBtn && nextBtn) {
            const itemWidth = scroller.querySelector('.news-item')?.clientWidth;

            if (prevBtn.classList.contains('left-btn_disabled')) {
                prevBtn.disabled = false;
                prevBtn.classList.remove('left-btn_disabled');
                prevBtn.classList.add('left-btn_enabled');
            }
            // The scroll position is not at the beginning of last item
            nextBtn.disabled = true;
            scroller.scrollBy({
                left: itemWidth,
                top: 0,
                behavior: 'smooth',
            });
            // Disable "Next" Button until scroll animation has finished.
            setTimeout(() => {
                if (
                    sliderOptions.currentSlider !==
                    sliderOptions.sliderCount -
                        sliderOptions.startedSlidersCount
                )
                    nextBtn.disabled = false;
            }, 700);

            sliderOptions.currentSlider++;
            if (
                sliderOptions.currentSlider ===
                sliderOptions.sliderCount - sliderOptions.startedSlidersCount
            ) {
                nextBtn.disabled = true;
                nextBtn.classList.remove('right-btn_enabled');
                nextBtn.classList.add('right-btn_disabled');
            }
        }
    };

    const scrollToPrevItem = (
        nextBtn: HTMLButtonElement | null,
        prevBtn: HTMLButtonElement | null,
        scroller: HTMLDivElement | null
    ) => {
        if (scroller && prevBtn && nextBtn) {
            const itemWidth = scroller.querySelector('.news-item')?.clientWidth;

            if (nextBtn.classList.contains('right-btn_disabled')) {
                nextBtn.disabled = false;
                nextBtn.classList.remove('right-btn_disabled');
                nextBtn.classList.add('right-btn_enabled');
            }
            // The scroll position is not at the beginning of first item
            prevBtn.disabled = true;
            scroller.scrollBy({
                left: itemWidth ? -itemWidth : 0,
                top: 0,
                behavior: 'smooth',
            });
            // Disable "Previous" Button until scroll animation has finished.
            setTimeout(() => {
                if (sliderOptions.currentSlider !== 0) prevBtn.disabled = false;
            }, 500);

            if (sliderOptions.currentSlider !== 0)
                sliderOptions.currentSlider--;

            if (sliderOptions.currentSlider === 0) {
                prevBtn.disabled = true;
                prevBtn.classList.remove('left-btn_enabled');
                prevBtn.classList.add('left-btn_disabled');
            }
        }
    };
    return [scrollToNextItem, scrollToPrevItem];
};
