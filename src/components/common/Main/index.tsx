import { IMain } from 'types/common';

const Main = ({ children }: IMain) => {
    return (
        <main className='main container d-flex flex-grow-1 flex-column'>
            {children}
        </main>
    );
};
export { Main };
