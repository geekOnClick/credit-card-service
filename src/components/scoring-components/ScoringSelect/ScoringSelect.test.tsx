import { render, screen } from '@testing-library/react';
import { ScoringSelect } from '.';
import { Formik } from 'formik';

describe('ScoringSelect test', () => {
    it('renders ScoringSelect', () => {
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
                <ScoringSelect id={'1'} error={'false'} touched={true} options={[1, 2, 3]} />
            </Formik>
        );
        const elem = document.querySelector('.continuation-form__field ');
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
                <ScoringSelect id={'1'} error={'false'} touched={true} options={[1, 2, 3]} />
            </Formik>
        );
        const elem = document.querySelector('.continuation-form__field ');

        if (elem) expect(elem.childElementCount).toBe(4);
    });
});
