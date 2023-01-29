import { Footer } from 'components/common/Footer';
import { Header } from 'components/common/Header';
import { Main } from 'components/common/Main';
import { CardsDesign } from 'components/home-components/CardsDesign';
import { Exchange } from 'components/home-components/Exchange';
import { Features } from 'components/home-components/Features';
import { News } from 'components/home-components/News';
import { Presence } from 'components/home-components/Presence';
import { Subscribe } from 'components/home-components/Subscribe';
const Home = () => {
    return (
        <div className='wrapper h-100'>
            <Header />
            <Main>
                <CardsDesign />
                <Features />
                <Exchange />
                <Presence />
                <News />
                <Subscribe />
            </Main>
            <Footer />
        </div>
    );
};

export { Home };
