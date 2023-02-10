import { ITooltip } from 'types/common';

const Tooltip = (props: ITooltip) => {
    const { text, children } = props;
    return (
        <>
            <div className='tooltip'>
                {children}
                <div className='tooltiptext tooltip-bottom'>{text}</div>
            </div>
        </>
    );
};
export { Tooltip };
