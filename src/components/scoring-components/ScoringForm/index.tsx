import { Button } from 'components/common/Button';
import { ScoringItem } from '../ScoringItem';
import { IScoring } from 'types/applicationId';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useValidate } from 'hooks/use-validate';
import * as selectOptions from '../../../utils/content';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { changeStepDone, changeStepData, changeLoading, changeError } from 'features/loan/applicationId/applicationId-slice';
import { selectStageData, selectLoading, selectError } from 'features/loan/applicationId/applicationId-selectors';
import { Loader } from 'components/common/Loader';

import axios from 'axios';
import * as api from '_config';

const ScoringForm = (props: { applicationId: string; account: string | null }) => {
    const { applicationId, account } = props;
    const loading = useSelector((state: RootState) => selectLoading(state));
    const error = useSelector((state: RootState) => selectError(state));
    const {
        validateSelect,
        validateIssueDate,
        validateIssueBranch,
        validateEmployerINN,
        validateSalary,
        validateWorkExperienceTotal,
        validateWorkExperienceCurrent,
    } = useValidate();

    const initialValues: IScoring = {
        gender: '',
        maritalStatus: '',
        dependentAmount: '',
        passportIssueDate: '',
        passportIssueBranch: '',
        employmentStatus: '',
        employerINN: '',
        salary: '',
        position: '',
        workExperienceTotal: '',
        workExperienceCurrent: '',
    };
    const [values, setValues] = useState(initialValues);
    const dispatch = useAppDispatch();
    const stageData = useSelector((state: RootState) => selectStageData(state));

    useEffect(() => {
        if (stageData) {
            setValues(stageData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Formik
            initialValues={values}
            enableReinitialize
            onSubmit={async (values) => {
                const data = {
                    gender: values.gender,
                    maritalStatus: values.maritalStatus,
                    dependentAmount: Number(values.dependentAmount),
                    passportIssueDate: values.passportIssueDate,
                    passportIssueBranch: `${values.passportIssueBranch.substring(
                        0,
                        values.passportIssueBranch.length - 3
                    )}-${values.passportIssueBranch.substring(values.passportIssueBranch.length - 3)}`,
                    employment: {
                        employmentStatus: values.employmentStatus,
                        employerINN: values.employerINN,
                        salary: Number(values.salary),
                        position: values.position,
                        workExperienceTotal: Number(values.workExperienceTotal),
                        workExperienceCurrent: Number(values.workExperienceCurrent),
                    },
                    account: account,
                };
                dispatch(changeError(false));
                dispatch(changeLoading(true));
                await axios
                    .put(`../${api.SCORING_FORM(applicationId)}`, data)
                    .then(() => {
                        dispatch(changeLoading(false));
                        dispatch(changeStepData(null));
                        dispatch(
                            changeStepDone({
                                stageDone: true,
                            })
                        );
                        localStorage.setItem('applicationIdStageDone', 'true');
                    })
                    .catch(() => {
                        dispatch(changeLoading(false));
                        dispatch(changeError(true));
                    });
            }}
        >
            {({ errors, touched }) => (
                <Form data-testid='scoring-form' className='continuation-form'>
                    {loading && (
                        <div className='loader-wrapper'>
                            <Loader />
                        </div>
                    )}
                    {!loading && (
                        <div className='continuation-form__inner'>
                            <div className='continuation-form__fields-top'>
                                <ScoringItem
                                    error={errors.gender}
                                    touched={touched.gender}
                                    id='gender'
                                    title="What's your gender"
                                    options={selectOptions.genderSelect}
                                    required={true}
                                    validateFunc={validateSelect}
                                />
                                <ScoringItem
                                    error={errors.maritalStatus}
                                    touched={touched.maritalStatus}
                                    id='maritalStatus'
                                    title='Your marital status'
                                    options={selectOptions.maritalStatusSelect}
                                    required={true}
                                    validateFunc={validateSelect}
                                />
                                <ScoringItem
                                    error={errors.dependentAmount}
                                    touched={touched.dependentAmount}
                                    id='dependentAmount'
                                    title='Your number of dependents'
                                    options={selectOptions.dependentAmountSelect}
                                    required={true}
                                    validateFunc={validateSelect}
                                />
                            </div>
                            <div className='continuation-form__fields-center'>
                                <ScoringItem
                                    error={errors.passportIssueDate}
                                    touched={touched.passportIssueDate}
                                    id='passportIssueDate'
                                    title='Date of issue of the passport'
                                    required={true}
                                    inputPlaceholder='Select Date and Time'
                                    validateFunc={validateIssueDate}
                                />
                                <ScoringItem
                                    error={errors.passportIssueBranch}
                                    touched={touched.passportIssueBranch}
                                    id='passportIssueBranch'
                                    title='Division code'
                                    required={true}
                                    inputPlaceholder='000000'
                                    validateFunc={validateIssueBranch}
                                />
                            </div>
                            <h2 className='continuation-form__title'>Employment</h2>
                            <div className='continuation-form__fields-bottom'>
                                <ScoringItem
                                    error={errors.employmentStatus}
                                    touched={touched.employmentStatus}
                                    id='employmentStatus'
                                    title='Your employment status'
                                    options={selectOptions.employmentStatusSelect}
                                    required={true}
                                    validateFunc={validateSelect}
                                />
                                <ScoringItem
                                    error={errors.employerINN}
                                    touched={touched.employerINN}
                                    id='employerINN'
                                    title='Your employer INN'
                                    required={true}
                                    inputPlaceholder='000000000000'
                                    validateFunc={validateEmployerINN}
                                />
                                <ScoringItem
                                    error={errors.salary}
                                    touched={touched.salary}
                                    id='salary'
                                    title='Your salary'
                                    required={true}
                                    inputPlaceholder='For example 100000'
                                    validateFunc={validateSalary}
                                />
                            </div>
                            <div className='continuation-form__fields'>
                                <ScoringItem
                                    error={errors.position}
                                    touched={touched.position}
                                    id='position'
                                    title='Your position'
                                    options={selectOptions.positionSelect}
                                    required={true}
                                    validateFunc={validateSelect}
                                />
                                <ScoringItem
                                    error={errors.workExperienceTotal}
                                    touched={touched.workExperienceTotal}
                                    id='workExperienceTotal'
                                    title='Your work experience total'
                                    required={true}
                                    inputPlaceholder='For example 10'
                                    validateFunc={validateWorkExperienceTotal}
                                />
                                <ScoringItem
                                    error={errors.workExperienceCurrent}
                                    touched={touched.workExperienceCurrent}
                                    id='workExperienceCurrent'
                                    title='Your work experience current'
                                    required={true}
                                    inputPlaceholder='For example 2'
                                    validateFunc={validateWorkExperienceCurrent}
                                />
                            </div>
                        </div>
                    )}
                    <Button additional_class='continuation-form__btn' title='Continue' type='submit' />
                    {error && <h4 className='list-error'>Error occured. Try again later.</h4>}
                </Form>
            )}
        </Formik>
    );
};
export { ScoringForm };
