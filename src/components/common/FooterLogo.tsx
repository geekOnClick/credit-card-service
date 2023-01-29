import logo from '../../assets/img/logo.png';
const FooterLogo = () => {
    return (
        <div className='logo d-flex flex-column justify-content-center'>
            <a href='!#'>
                <img src={logo} alt='logo' />
            </a>
        </div>
    );
};
export { FooterLogo };
