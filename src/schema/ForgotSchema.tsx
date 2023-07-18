import * as Yup from 'yup';

export const ForgotSchema = Yup.object({
    email: Yup.string().email().required('Please enter the email')
})