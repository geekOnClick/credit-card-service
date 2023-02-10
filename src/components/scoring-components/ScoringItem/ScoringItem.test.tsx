import { render, screen } from '@testing-library/react';
import { ScoringItem } from '.';
import { Formik } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('ScoringItem test', () => {
    it('renders ScoringItem', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Formik
                        initialValues={{ input: '' }}
                        onSubmit={() => {
                            console.log();
                        }}
                        validate={() => {
                            console.log();
                        }}
                    >
                        <ScoringItem
                            error={'error'}
                            touched={true}
                            id='lastName'
                            title='Your last name'
                            required={true}
                            inputPlaceholder='For Example Doe'
                            validateFunc={() => {
                                console.log();
                            }}
                        />
                    </Formik>
                </MemoryRouter>
            </Provider>
        );
        const elem = document.querySelector('.continuation-form__wrapper-input');
        expect(elem).toBeInTheDocument();
    });
    it('has input item', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Formik
                        initialValues={{ input: '' }}
                        onSubmit={() => {
                            console.log();
                        }}
                        validate={() => {
                            console.log();
                        }}
                    >
                        <ScoringItem
                            error={'error'}
                            touched={true}
                            id='lastName'
                            title='Your last name'
                            required={true}
                            inputPlaceholder='For Example Doe'
                            validateFunc={() => {
                                console.log();
                            }}
                        />
                    </Formik>
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByPlaceholderText(/For Example Doe/i);
        expect(elem).toBeInTheDocument();
    });
});
