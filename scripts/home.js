let showExchangeList = false;
let pairs = [
    { from: 'USD', to: 'RUB' },
    { from: 'EUR', to: 'RUB' },
    { from: 'JPY', to: 'RUB' },
    { from: 'GBP', to: 'RUB' },
    { from: 'CNH', to: 'RUB' },
    { from: 'DKK', to: 'RUB' },
];
let news = [];
const slider = document.querySelector('.news-slider');
let sliderCount = null;
let startedSlidersCount = 3;
let currentSlider = 0;
const scroller = slider.querySelector('.scroller');
const nextBtn = slider.querySelector('.right-btn');
const prevBtn = slider.querySelector('.left-btn');
let itemWidth = null;

nextBtn.addEventListener('click', scrollToNextItem);
prevBtn.addEventListener('click', scrollToPrevItem);

document.querySelector('.burger-menu').addEventListener('click', () => {
    document
        .querySelector('.burger-menu')
        .classList.toggle('burger-menu_active');
});
/**
 * Scroll news block to the next news item after btn's click
 */
function scrollToNextItem() {
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
        if (currentSlider !== sliderCount - startedSlidersCount)
            nextBtn.disabled = false;
    }, 500);
    currentSlider++;

    if (currentSlider === sliderCount - startedSlidersCount) {
        nextBtn.disabled = true;
        nextBtn.classList.remove('right-btn_enabled');
        nextBtn.classList.add('right-btn_disabled');
    }
}

/**
 * Scroll news block to the previous news item after btn's click
 */
function scrollToPrevItem() {
    if (nextBtn.classList.contains('right-btn_disabled')) {
        nextBtn.disabled = false;
        nextBtn.classList.remove('right-btn_disabled');
        nextBtn.classList.add('right-btn_enabled');
    }
    // The scroll position is not at the beginning of first item
    prevBtn.disabled = true;
    scroller.scrollBy({
        left: -itemWidth,
        top: 0,
        behavior: 'smooth',
    });
    // Disable "Previous" Button until scroll animation has finished.
    setTimeout(() => {
        if (currentSlider !== 0) prevBtn.disabled = false;
    }, 500);
    currentSlider--;

    if (currentSlider === 0) {
        prevBtn.disabled = true;
        prevBtn.classList.remove('left-btn_enabled');
        prevBtn.classList.add('left-btn_disabled');
    }
}
/**
 * Fetch actual news, makes news items using received JSON data, inserting news items to news-items-block.
 */
function showActualNews() {
    // Temporary using Window global object until React app will be created
    fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${window.NEWS_API_KEY}`
    )
        .then((res) => res.json())
        .then((data) => (news = data.articles))
        // .then(() => filterImages())
        .then(() => {
            let loader = document.querySelector('.loader-news');
            loader.classList.add('hide-loader');
            scroller.classList.remove('scroller-loading');
            let newsBlock = document.querySelector('.news-items-block');
            let slider = document.querySelector('.news-slider');
            // Checking if there are any empty urls or null for images and filter them
            let requests = news.map((el) => {
                if (!el.urlToImage) el.urlToImage = './img/errImg.jpg';
                return new Promise(function (resolve, reject) {
                    let img = new Image();
                    img.onerror = img.onabort = function () {
                        el.urlToImage = './img/errImg.jpg';
                        resolve('error');
                    };
                    img.onload = function () {
                        resolve('success');
                    };
                    img.src = el.urlToImage;
                });
            });
            // render all items after filtering
            Promise.all(requests).then(() => {
                for (let i = 0; i < news.length; i++) {
                    newsBlock.insertAdjacentHTML(
                        'beforeend',
                        `
                        <div
                        class="news-item d-flex justify-content-center align-items-center"
                    >
                        <div class="card">
                            <img
                                src=${news[i].urlToImage}
                                alt="news image"
                            />
                            <p>
                            ${
                                news[i].title
                                    ? news[i].title
                                    : 'Title not avaliable'
                            }
                            </p>
                            <p>
                            <a href=${news[i].url} target="_blank">
                            ${filterDescription(
                                news[i].description,
                                news[i].content
                            )}
                            </a>
                            </p>
                        </div>
                    </div>
                    `
                    );
                }
                itemWidth = slider.querySelector('.news-item').clientWidth;
                sliderCount = document.querySelectorAll('.news-item').length;
                slider.classList.remove('news-slider-loading');
            });
        });
}

/**
 * Filters news item description before render
 * @param {string, string}
 * @returns {string} returns filtered description
 */
function filterDescription(description, content) {
    if (!description) return 'Read this article by clicking here...';
    if (description.includes('<a href=')) return content;
    return description;
}

/**
 * Creates and renders div elements in DOM with selected exchange rates
 * @param {Array} pairs
 */
function createCourses(pairs) {
    showExchangeList = true;
    let loader = document.querySelector('.loader');
    loader.classList.add('hide-loader');
    let list = document.querySelector('.exchange__list');
    for (let i = 0; i < pairs.length; i++) {
        list.insertAdjacentHTML(
            'beforeend',
            `
        <div class="exchange__item d-flex justify-content-between">
        <span class="exchange__item-currency">${pairs[i].from}</span>
        <span class="exchange__item-value">${pairs[i].course}</span>
        </div>
        `
        );
    }
}
/**
 * Updates value of selected exchange rates
 * @param {Array} pairs
 */
function updateCourses(pairs) {
    console.log('update!');
    let values = document.querySelectorAll('.exchange__item-value');
    for (let i = 0; i < pairs.length; i++) {
        values[i].innerHTML = pairs[i].course;
    }
}
/**
 * Makes request to rapidapi API for getting actual current exchange rates and launch renderCourses function if succeed
 * @param {Array} pairs
 */
function showActualCourses(pairs = [{ from: 'USD', to: 'RUB' }]) {
    // Temporary using Window global object until React app will be created
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': window.RAPID_API_KEY,
            'X-RapidAPI-Host': window.RAPID_API_HOST,
        },
    };

    let requests = pairs.map((el) =>
        fetch(
            `https://currency-exchange.p.rapidapi.com/exchange?from=${el.from}&${el.to}=MYR&q=1.0`,
            options
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Fetch error');
                }
                return response.json();
            })
            .then((response) => {
                el.course = response.toFixed(2);
            })
    );
    Promise.all(requests)
        .then(() => {
            if (!showExchangeList) createCourses(pairs);
            else updateCourses(pairs);
        })
        .catch((err) => {
            console.log(`${err}`);
        });
}
showActualNews();
showActualCourses(pairs);
setInterval(() => {
    showActualCourses(pairs);
}, 900000);
