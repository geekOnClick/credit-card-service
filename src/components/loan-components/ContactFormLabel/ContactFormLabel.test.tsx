import { render, screen } from '@testing-library/react';
import { ContactFormLabel } from '.';
import { Formik } from 'formik';

describe('ContactFormLabel test', () => {
    it('renders ContactFormLabel', () => {
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
                <ContactFormLabel id={'123'} title={'test'} required={true} />
            </Formik>
        );
        const elem = screen.getByText('test');
        expect(elem).toBeInTheDocument();
    });
});
