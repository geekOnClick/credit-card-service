import { render, screen } from '@testing-library/react';
import { ScoringInput } from '.';
import { Formik } from 'formik';

describe('ScoringInput test', () => {
    it('renders ScoringInput', () => {
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
                <ScoringInput
                    placeholder={'test'}
                    id={'1'}
                    error={'false'}
                    touched={true}
                    validateFunc={() => {
                        console.log();
                    }}
                />
            </Formik>
        );
        const elem = screen.getByPlaceholderText('test');
        expect(elem).toBeInTheDocument();
    });
    it("doesn't show error message if not occured", () => {
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
                <ScoringInput
                    placeholder={'test'}
                    id={'1'}
                    error={'true'}
                    touched={false}
                    validateFunc={() => {
                        console.log();
                    }}
                />
            </Formik>
        );

        const elem = document.querySelector('.form__error');
        expect(elem).not.toBeInTheDocument();
    });
});
