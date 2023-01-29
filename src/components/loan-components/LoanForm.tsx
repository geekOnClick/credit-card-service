import { Button } from 'components/common/Button';
import { LoanFormItem } from './LoanFormItem';
import { Formik, Form, FormikProps } from 'formik';
import { useValidate } from 'hooks/use-validate';
import { useSelector } from 'react-redux';
import { selectRangeValue } from 'features/loan/range/range-selectors';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { IFormic } from 'types/loan';
import { RootState, useAppDispatch } from 'store';
import {
    changeStepData,
    changeLoading,
    changeError,
} from 'features/loan/form/form-slice';
import axios from 'axios';
import * as api from '_config';

const LoanForm = () => {
    const [
        validateName,
        validateEmail,
        validateBirthDay,
        validatePassNum,
        validatePassSeries,
    ] = useValidate();
    const range = useSelector((state: RootState) => selectRangeValue(state));

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
                    values.middleName =
                        values.middleName.length !== 0
                            ? values.middleName
                            : null;
                }
                dispatch(changeError(false));
                dispatch(changeLoading(true));
                await axios
                    .post(api.SUBMIT_FORM, values)
                    .then((data) => {
                        console.log(data);
                        dispatch(changeLoading(false));
                        dispatch(
                            changeStepData({
                                stepNum: 'first',
                                data: values,
                            })
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                        dispatch(
                            changeStepData({
                                stepNum: 'first',
                                data: values,
                            })
                        );
                        dispatch(changeLoading(false));
                        dispatch(changeError(true));
                    });
                console.log('submit', values);
            }}
        >
            {({ errors, touched }) => (
                <Form className='form registration__form'>
                    <div className='form__fields'>
                        <LoanFormItem
                            error={errors.lastName}
                            touched={touched.lastName}
                            id='lastName'
                            title='Your last name'
                            required={true}
                            inputPlaceholder='For Example Doe'
                            validateFunc={validateName}
                        />
                        <LoanFormItem
                            error={errors.firstName}
                            touched={touched.firstName}
                            id='firstName'
                            title='Your first name'
                            required={true}
                            inputPlaceholder='For Example John'
                            validateFunc={validateName}
                        />
                        <LoanFormItem
                            error={errors.middleName}
                            touched={touched.middleName}
                            id='middleName'
                            title='Your patronymic'
                            required={false}
                            inputPlaceholder='Victorovich'
                        />
                        <LoanFormItem
                            title='Select term'
                            id='term'
                            required={true}
                        />
                    </div>
                    <div className='form__fields'>
                        <LoanFormItem
                            error={errors.email}
                            touched={touched.email}
                            id='email'
                            title='Your email'
                            required={true}
                            inputPlaceholder='test@gmail.com'
                            validateFunc={validateEmail}
                        />
                        <LoanFormItem
                            error={errors.birthdate}
                            touched={touched.birthdate}
                            id='birthdate'
                            title='Your date of birth'
                            required={true}
                            inputPlaceholder='1992-08-14'
                            validateFunc={validateBirthDay}
                        />
                        <LoanFormItem
                            error={errors.passportSeries}
                            touched={touched.passportSeries}
                            id='passportSeries'
                            title='Your passport series'
                            required={true}
                            inputPlaceholder='0000'
                            validateFunc={validatePassSeries}
                        />
                        <LoanFormItem
                            error={errors.passportNumber}
                            touched={touched.passportNumber}
                            id='passportNumber'
                            title='Your passpor number'
                            required={true}
                            inputPlaceholder='000000'
                            validateFunc={validatePassNum}
                        />
                    </div>
                    <Button
                        additional_class='form__btn'
                        title='Continue'
                        type='submit'
                    />
                </Form>
            )}
        </Formik>
    );
};
export { LoanForm };
