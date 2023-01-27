import { FooterContacts } from './FooterContacts';
import { FooterLogo } from './FooterLogo';
import { FooterNav } from './FooterNav';
import { Devider } from './Devider';
const Footer = () => {
    return (
        <footer className='footer footer__spacer d-flex flex-column'>
            <div className='container'>
                <div className='footer__top d-flex justify-content-between'>
                    <FooterLogo />
                    <FooterContacts />
                </div>
                <div className='footer__bottom d-flex flex-column justify-content-between'>
                    <FooterNav />
                    <Devider additional_class='spacer spacer__spacing' />
                    <div className='cookies-info cookies-info__spacing'>
                        We use cookies to personalize our services and improve
                        the user experience of our website. Cookies are small
                        files containing information about previous visits to a
                        website. If you do not want to use cookies, please
                        change your browser settings
                    </div>
                </div>
            </div>
        </footer>
    );
};
export { Footer };
