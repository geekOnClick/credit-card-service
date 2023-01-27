import React, { useState } from 'react';
import { IAccordion } from 'types/loan';
import arrow from '../../assets/img/faq_arrow_svg.svg';

const Accordion: React.FC<IAccordion> = (props: IAccordion) => {
    const { title, content } = props;
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className='accordion-item' onClick={() => handleClick()}>
            <div className='accordion-title'>
                <div className='accordion-desc'>{title}</div>
                <div className='accordion-arrow'>
                    {isActive ? (
                        <img src={arrow} alt={'svg'} />
                    ) : (
                        <img
                            src={arrow}
                            alt={'svg'}
                            className='accordion-arrow'
                        />
                    )}
                </div>
            </div>
            {isActive && <div className='accordion-content'>{content}</div>}
        </div>
    );
};
export { Accordion };
