import React from 'react';

export interface IBtn extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    additional_class: string;
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button';
    callback?(event: Event | undefined): void;

    // callback?: ((e: MouseEvent) => Promise<void>) | ((() => void) | null);
}
export interface IDevider {
    additional_class: string;
}
export interface ITooltip {
    text: string;
    children: React.ReactNode;
}
export interface IMain {
    children: React.ReactElement | React.ReactElement[];
}
export interface IDropDownList {
    options: Array<number>;
}
