import { NavLink } from 'react-router-dom';
const HeaderNav = () => {
    return (
        <nav>
            <ul className='product-nav justify-content-between'>
                <li>
                    <NavLink
                        to='/loan'
                        id='header-link'
                        className={({ isActive }) => (isActive ? 'product-nav_active' : 'product-nav_inactive')}
                    >
                        Credit card
                    </NavLink>
                </li>
                <li>Product</li>
                <li>Account</li>
                <li>Resources</li>
            </ul>
        </nav>
    );
};
export { HeaderNav };
