import { Header } from 'components/common/Header';
import { Footer } from 'components/common/Footer';
import { Main } from 'components/common/Main';
import ErrImg from '../assets/img/404_img.png';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <Main>
                <section className='errBlock'>
                    <div className='errBlock__inner container'>
                        <div className='errBlock__text'>
                            <h2 className='errBlock__title-first'>Oops....</h2>
                            <h2 className='errBlock__title-second'>Page not found</h2>
                            <p className='errBlock__desc'>This Page doesn`t exist or was removed! We suggest you go back.</p>
                            <button className='errBlock__btn' onClick={() => navigate(-1)}>
                                Go back
                            </button>
                        </div>
                        <img className='errBlock__img' src={ErrImg} alt='404' />
                    </div>
                </section>
            </Main>
            <Footer />
        </>
    );
};

export { NotFound };
