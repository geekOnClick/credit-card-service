import { Button } from 'components/common/Button';
import { ContactFormItem } from '../ContactFormItem';
import { Formik, Form, FormikProps } from 'formik';
import { useValidate } from 'hooks/use-validate';
import { useSelector } from 'react-redux';
import { selectFormRange } from 'features/loan/application/loan-selectors';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { IFormic } from 'types/loan';
import { RootState, useAppDispatch } from 'store';
import { changeLoanData, changeLoading, changeError } from 'features/loan/application/loan-slice';
import axios from 'axios';
import * as api from '_config';

const ContactForm = () => {
    const { validateName, validateEmail, validateBirthDay, validatePassNum, validatePassSeries } = useValidate();
    const range = useSelector((state: RootState) => selectFormRange(state));

    const formikRef = useRef<FormikProps<IFormic>>(null);

    const memoizedCallback = useCallback(() => {
        if (formikRef.current) {
            formikRef.current.setFieldValue('amount', Number(range));
        }
    }, [range]);

    useEffect(() => {
        memoizedCallback();
    }, [memoizedCallback]);

    const initialValues = {
        amount: range,
        lastName: '',
        firstName: '',
        middleName: '',
        term: '6',
        email: '',
        birthdate: '',
        passportSeries: '',
        passportNumber: '',
    };

    const dispatch = useAppDispatch();

    return (
        <Formik
            initialValues={initialValues}
            innerRef={formikRef}
            // enableReinitialize
            onSubmit={async (values) => {
                values.term = Number(values.term);
                if (typeof values.middleName === 'string') {
                    values.middleName = values.middleName.length !== 0 ? values.middleName : null;
                }
                dispatch(changeError(false));
                dispatch(changeLoading(true));
                await axios
                    .post(api.SUBMIT_FORM, values)
                    .then((res) => {
                        const { data } = res;
                        dispatch(changeLoading(false));
                        dispatch(
                            changeLoanData({
                                stage: 1,
                                data: data,
                            })
                        );
                        localStorage.setItem('stage', '2');
                        localStorage.setItem('offers', JSON.stringify(data));
                    })
                    .catch(() => {
                        dispatch(changeLoading(false));
                        dispatch(changeError(true));
                    });
            }}
        >
            {({ errors, touched }) => (
                <Form className='form registration__form' data-testid='contact-form'>
                    <div className='form__fields'>
                        <ContactFormItem
                            error={errors.lastName}
                            touched={touched.lastName}
                            id='lastName'
                            title='Your last name'
                            required={true}
                            inputPlaceholder='For Example Doe'
                            validateFunc={validateName}
                        />
                        <ContactFormItem
                            error={errors.firstName}
                            touched={touched.firstName}
                            id='firstName'
                            title='Your first name'
                            required={true}
                            inputPlaceholder='For Example John'
                            validateFunc={validateName}
                        />
                        <ContactFormItem
                            error={errors.middleName}
                            touched={touched.middleName}
                            id='middleName'
                            title='Your patronymic'
                            required={false}
                            inputPlaceholder='Victorovich'
                        />
                        <ContactFormItem title='Select term' id='term' required={true} />
                    </div>
                    <div className='form__fields'>
                        <ContactFormItem
                            error={errors.email}
                            touched={touched.email}
                            id='email'
                            title='Your email'
                            required={true}
                            inputPlaceholder='test@gmail.com'
                            validateFunc={validateEmail}
                        />
                        <ContactFormItem
                            error={errors.birthdate}
                            touched={touched.birthdate}
                            id='birthdate'
                            title='Your date of birth'
                            required={true}
                            inputPlaceholder='1992-08-14'
                            validateFunc={validateBirthDay}
                        />
                        <ContactFormItem
                            error={errors.passportSeries}
                            touched={touched.passportSeries}
                            id='passportSeries'
                            title='Your passport series'
                            required={true}
                            inputPlaceholder='0000'
                            validateFunc={validatePassSeries}
                        />
                        <ContactFormItem
                            error={errors.passportNumber}
                            touched={touched.passportNumber}
                            id='passportNumber'
                            title='Your passpor number'
                            required={true}
                            inputPlaceholder='000000'
                            validateFunc={validatePassNum}
                        />
                    </div>
                    <Button additional_class='form__btn' title='Continue' type='submit' />
                </Form>
            )}
        </Formik>
    );
};
export { ContactForm };
