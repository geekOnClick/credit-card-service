export interface IAccordion {
    title: string;
    content: string;
}
export interface IStep {
    number: number;
    title: string;
    width: number;
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
