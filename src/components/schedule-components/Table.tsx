/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState, useEffect } from 'react';
import { IScheduleItem } from 'types/loan';

const Table = (props: { data: IScheduleItem[] | [] }) => {
    const [payment, setPayment] = useState(props.data);
    const [order, setOrder] = useState('DSC');
    const [sortCol, setSortCol] = useState('');
    const [adaptiveVer, setAdaptiveVer] = useState(window.innerWidth <= 919 ? true : false);

    useEffect(() => {
        setPayment(props.data);
    }, [props]);

    window.addEventListener('resize', (event: Event) => {
        const target = event.target as Window;
        if (target.innerWidth <= 919) {
            if (adaptiveVer !== true) setAdaptiveVer(true);
        } else {
            if (adaptiveVer !== false) setAdaptiveVer(false);
        }
    });

    const sorting = (col: keyof IScheduleItem) => {
        if (order === 'ASC') {
            const sorted = [...payment].sort((a: IScheduleItem, b: IScheduleItem) => (a[col] > b[col] ? 1 : -1));
            setPayment(sorted);
            setSortCol(col);
            setOrder('DSC');
        }
        if (order === 'DSC') {
            const sorted = [...payment].sort((a, b) => (a[col] < b[col] ? 1 : -1));
            setPayment(sorted);
            setSortCol(col);
            setOrder('ASC');
        }
    };

    const getClassNameFor = (col: string) => {
        if (col !== sortCol) return 'sort-asc';
        if (col === sortCol) {
            const sortAs = order === 'DSC' ? 'sort-asc' : 'sort-dsc';
            return sortAs;
        }
    };
    const getAdaptiveClassNameFor = (col: string) => {
        if (col !== sortCol) return 'sort-adapt-asc';
        if (col === sortCol) {
            const sortAs = order === 'DSC' ? 'sort-adapt-asc' : 'sort-adapt-dsc';
            return sortAs;
        }
    };
    return (
        <table className='paymentShedule__table'>
            <thead className='paymentShedule__tr'>
                <tr>
                    <th className={`paymentShedule__title ${getClassNameFor('number')}`} onClick={() => sorting('number')}>
                        NUMBER
                    </th>
                    <th className={`paymentShedule__title ${getClassNameFor('date')}`} onClick={() => sorting('date')}>
                        DATE
                    </th>
                    <th
                        className={`paymentShedule__title ${getClassNameFor('totalPayment')}`}
                        onClick={() => sorting('totalPayment')}
                    >
                        TOTAL PAYMENT
                    </th>
                    <th
                        className={`paymentShedule__title ${getClassNameFor('interestPayment')}`}
                        onClick={() => sorting('interestPayment')}
                    >
                        INTEREST PAYMENT
                    </th>
                    <th
                        className={`paymentShedule__title ${getClassNameFor('debtPayment')}`}
                        onClick={() => sorting('debtPayment')}
                    >
                        DEBT PAYMENT
                    </th>
                    <th
                        className={`paymentShedule__title ${getClassNameFor('remainingDebt')}`}
                        onClick={() => sorting('remainingDebt')}
                    >
                        REMAINING DEBT
                    </th>
                </tr>
            </thead>
            <tbody>
                {payment.map((p) => (
                    <tr className='paymentShedule__tr' key={p.number}>
                        <td
                            data-label='NUMBER'
                            className={`paymentShedule__data ${adaptiveVer ? getAdaptiveClassNameFor('number') : ''}`}
                            onClick={() => {
                                if (adaptiveVer) sorting('number');
                            }}
                        >
                            {p.number}
                        </td>
                        <td
                            data-label='DATE'
                            className={`paymentShedule__data ${adaptiveVer ? getAdaptiveClassNameFor('date') : ''}`}
                            onClick={() => {
                                if (adaptiveVer) sorting('date');
                            }}
                        >
                            {p.date}
                        </td>
                        <td
                            data-label='TOTAL PAYMENT'
                            className={`paymentShedule__data ${adaptiveVer ? getAdaptiveClassNameFor('totalPayment') : ''}`}
                            onClick={() => {
                                if (adaptiveVer) sorting('totalPayment');
                            }}
                        >
                            {p.totalPayment}
                        </td>
                        <td
                            data-label='INTEREST PAYMENT'
                            className={`paymentShedule__data ${adaptiveVer ? getAdaptiveClassNameFor('interestPayment') : ''}`}
                            onClick={() => {
                                if (adaptiveVer) sorting('interestPayment');
                            }}
                        >
                            {p.interestPayment}
                        </td>
                        <td
                            data-label='DEBT PAYMENT'
                            className={`paymentShedule__data ${adaptiveVer ? getAdaptiveClassNameFor('debtPayment') : ''}`}
                            onClick={() => {
                                if (adaptiveVer) sorting('debtPayment');
                            }}
                        >
                            {p.debtPayment}
                        </td>
                        <td
                            data-label='REMAINING DEBT'
                            className={`paymentShedule__data ${adaptiveVer ? getAdaptiveClassNameFor('remainingDebt') : ''}`}
                            onClick={() => {
                                if (adaptiveVer) sorting('remainingDebt');
                            }}
                        >
                            {p.remainingDebt}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export { Table };
