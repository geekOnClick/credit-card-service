export interface IAccordion {
    title: string;
    content: string;
}
export interface IStep {
    number: number;
    title: string;
}
export interface IFormic {
    amount: number;
    lastName: string;
    firstName: string;
    middleName: string | null;
    term: string | number;
    email: string;
    birthdate: string;
    passportSeries: string;
    passportNumber: string;
}
export interface IFormItem {
    title: string;
    id: string;
    required: boolean;
    inputPlaceholder?: string;
    error?: string | undefined;
    touched?: boolean | undefined;
    values?: IFormic;
    validateFunc?(value: string): string | void;
}
export interface IFormInput {
    id: string;
    placeholder: string;
    error?: string;
    touched?: boolean;
    validateFunc?(value: string): string | void;
}
export interface IFormSelect {
    id: string;
}
export interface IFormLabel {
    id: string;
    title: string;
    required: boolean;
}
export interface IOffer {
    applicationId: number;
    requestedAmount: number;
    totalAmount: number;
    term: number;
    monthlyPayment: number;
    rate: number;
    isInsuranceEnabled: boolean;
    isSalaryClient: boolean;
}
export interface IScheduleItem {
    date: string;
    debtPayment: number;
    interestPayment: number;
    number: number;
    remainingDebt: number;
    totalPayment: number;
}
