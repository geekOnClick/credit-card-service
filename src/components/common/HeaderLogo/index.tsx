import { Link } from 'react-router-dom';

const HeaderLogo = () => {
    return (
        <div data-testid='header-logo' className='bank-logo'>
            <span>
                <Link to='/'>NeoBank</Link>
            </span>
        </div>
    );
};
export { HeaderLogo };
