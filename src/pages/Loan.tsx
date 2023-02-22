import { Footer } from 'components/common/Footer';
import { Header } from 'components/common/Header';
import { Main } from 'components/common/Main';
import { CardAds } from 'components/loan-components/CardAds';
import { Tabs } from 'components/loan-components/Tabs';
import { Wizard } from 'components/loan-components/Wizard';
const Loan = () => {
    return (
        <div data-testid='loan' className='wrapper h-100'>
            <Header />
            <Main>
                <CardAds />
                <Tabs />
                <Wizard />
            </Main>
            <Footer />
        </div>
    );
};

export { Loan };
