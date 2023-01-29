const Features = () => {
    return (
        <div className='features features_spacing d-block d-lg-flex justify-content-lg-between'>
            <div className='features__img'></div>
            <div className='features__textblock d-flex flex-column justify-content-lg-start justify-content-xl-center'>
                <div>We Provide Many Features You Can Use</div>
                <div>
                    You can explore the features that we provide with fun and
                    have their own functions each feature
                </div>
                <ul className='features__list d-flex justify-content-between flex-column'>
                    <li className='features__item'>
                        Powerfull online protection.
                    </li>
                    <li className='features__item'>
                        Cashback without borders.
                    </li>
                    <li className='features__item'>Personal design</li>
                    <li className='features__item'>
                        Work anywhere in the world
                    </li>
                </ul>
            </div>
        </div>
    );
};
export { Features };
