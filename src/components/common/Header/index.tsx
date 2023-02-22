import { Button } from 'components/common/Button';
import { HeaderBurgerMenu } from '../HeaderBurgerMenu';
import { HeaderLogo } from '../HeaderLogo';
import { HeaderNav } from '../HeaderNav';
const Header = () => {
    return (
        <header data-testid='header' className='header container d-flex justify-content-between align-items-center'>
            <HeaderLogo />
            <HeaderNav />
            <Button title='Online Bank' additional_class='btn_online' />
            <HeaderBurgerMenu />
        </header>
    );
};
export { Header };
