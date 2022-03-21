
export const validationMessages = {
    iban: { type: 'required', message: 'Enter valid error msg' },
    amount: [
        { type: 'required', message: 'Enter amount' },
        { type: 'max', message: 'Enter less then 20000000' },
        { type: 'min', message: 'Enter greater then 50 amount' }
    ],
    date: { type: 'required', message: 'select date' },
    fullName: { type: 'required', message: 'Validation.Full_name_required' },
};
