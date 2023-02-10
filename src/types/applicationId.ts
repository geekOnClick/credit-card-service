import React from 'react';

export interface IScoring {
    gender: 'MALE' | 'FEMALE' | '';
    maritalStatus: 'MARRIED' | 'DIVORCED' | 'SINGLE' | 'WIDOW_WIDOWER' | '';
    dependentAmount: number | string;
    passportIssueDate: string;
    passportIssueBranch: string;
    employmentStatus: 'UNEMPLOYED' | 'SELF_EMPLOYED' | 'EMPLOYED' | 'BUSINESS_OWNER' | '';
    employerINN: number | string;
    salary: number | string;
    position: 'WORKER' | 'MID_MANAGER' | 'TOP_MANAGER' | 'OWNER' | '';
    workExperienceTotal: number | string;
    workExperienceCurrent: number | string;
}
export interface IScoringSelect {
    id: string;
    error?: string;
    touched?: boolean;
    options: number[] | string[];
    validateFunc?(value: string): string | void;
}
export interface IScoringItem {
    title: string;
    id: string;
    required: boolean;
    inputPlaceholder?: string;
    error?: string | undefined;
    touched?: boolean | undefined;
    values?: IScoring;
    options?: number[] | string[];
    validateFunc?(value: string): string | void;
}
export interface IModal {
    title: string;
    text: string;
    closeModal(event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent> | Event | MouseEvent): void;
}
export interface ICheckbox {
    name: string;
    checked: boolean;
    callback(): void;
}

export interface IPin {
    first: string;
    second: string;
    third: string;
    fourth: string;
}
