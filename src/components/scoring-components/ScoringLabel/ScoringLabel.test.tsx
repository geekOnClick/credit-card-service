import { render, screen } from '@testing-library/react';
import { ScoringLabel } from '.';
import { Formik } from 'formik';

describe('ScoringLabel test', () => {
    it('renders ScoringLabel', () => {
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
                <ScoringLabel id={'123'} title={'test'} required={true} />
            </Formik>
        );
        const elem = screen.getByText('test');
        expect(elem).toBeInTheDocument();
    });
});
