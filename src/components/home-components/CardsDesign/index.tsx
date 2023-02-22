import { Button } from 'components/common/Button';
import card1 from '../../../assets/img/promo_cards/cardImage1.jpg';
import card2 from '../../../assets/img/promo_cards/cardImage2.jpg';
import card3 from '../../../assets/img/promo_cards/cardImage3.jpg';
import card4 from '../../../assets/img/promo_cards/cardImage4.jpg';
import { useNavigate } from 'react-router-dom';

const CardsDesign = () => {
    const navigate = useNavigate();

    return (
        <div className='cards-design cards-design_spacing d-block d-md-flex align-items-md-center flex-md-column flex-lg-row justify-content-between'>
            <div>
                <h2 className='cards-design__promo-text'>Choose the design you like and apply for card right now</h2>
                <Button title='Choose the card' additional_class='cards-design__choose-btn' callback={() => navigate('/loan')} />
            </div>
            <div className='cards-design__promo-cards d-flex justify-content-between flex-wrap'>
                <img src={card1} alt='promo-card 1' />
                <img src={card2} alt='promo-card 2' />
                <img src={card3} className='align-self-end' alt='promo-card 3' />
                <img src={card4} className='align-self-end' alt='promo-card 4' />
            </div>
        </div>
    );
};
export { CardsDesign };
