export const useValidate = () => {
    const validateEmail = (value: string) => {
        if (!value) {
            return 'Required Field';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return 'Incorrect email address';
        }
    };
    const validateName = (value: string) => {
        if (!value) {
            return 'Required Field';
        }
    };
    const validateBirthDay = (value: string) => {
        if (!value) {
            return 'Required Field';
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return 'Incorrect day of birth';
        }
        const parts = value.split('-');
        const now = new Date();

        const year = parseInt(parts[0], 10);
        const currentYear = now.getFullYear();
        const month =
            parts[1][0] === '0'
                ? parseInt(parts[1][1], 10)
                : parseInt(parts[1], 10);
        const day =
            parts[2][0] === '0'
                ? parseInt(parts[2][1], 10)
                : parseInt(parts[2], 10);
        if (year >= currentYear) {
            return 'Incorrect day of birth';
        }
        if (month < 1 || month > 12) {
            return 'Incorrect day of birth';
        }
        if (day < 1 || day > 31) {
            return 'Incorrect day of birth';
        }
        if (currentYear - year < 18) {
            return 'Customer must be older then 18 years';
        }
    };
    const validatePassSeries = (value: string) => {
        if (!value) {
            return 'Required Field';
        }
        if (value.length < 4 || value.length > 4) {
            return 'The series must be 4 digits';
        }
    };
    const validatePassNum = (value: string) => {
        if (!value) {
            return 'Required Field';
        }
        if (value.length < 6 || value.length > 6) {
            return 'The number must be 6 digits';
        }
    };

    return [
        validateName,
        validateEmail,
        validateBirthDay,
        validatePassNum,
        validatePassSeries,
    ];
};
