import { render, screen } from '@testing-library/react';
import { ContactFormSelect } from '.';
import { Formik } from 'formik';

describe('ContactFormSelect test', () => {
    it('renders ContactFormSelect', () => {
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
                <ContactFormSelect id={'123'} />
            </Formik>
        );
        const elem = document.querySelector('.form__field');
        expect(elem).toBeInTheDocument();
    });
    it('has option in childrens', () => {
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
                <ContactFormSelect id={'123'} />
            </Formik>
        );
        const ddl = screen.getByTestId('select');
        expect(ddl.childElementCount).toBe(4);
    });
});
