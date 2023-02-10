import { render, screen } from '@testing-library/react';
import { ContactFormItem } from '.';
import { Formik } from 'formik';

describe('ContactFormItem test', () => {
    it('renders ContactFormItem', () => {
        render(
            <Formik
                initialValues={{ input: '' }}
                onSubmit={() => {
                    console.log();
                }}
                validate={() => {
                    console.log();
                }}
            >
                <ContactFormItem
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
        );
        const elem = screen.getByTestId('input__wrapper');
        expect(elem).toBeInTheDocument();
    });
    it('has input item', () => {
        render(
            <Formik
                initialValues={{ input: '' }}
                onSubmit={() => {
                    console.log();
                }}
                validate={() => {
                    console.log();
                }}
            >
                <ContactFormItem
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
        );
        const elem = screen.getByPlaceholderText(/For Example Doe/i);
        expect(elem).toBeInTheDocument();
    });
});
