import * as Yup from 'yup';

export const ResetPasswordSchema = Yup.object({
    code: Yup.string().max(4).required('OTP is mendatory'),
    password: Yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character").required("Please enter the password"),
    confirmpassword : Yup.string()
    .required('Password is mendatory')
    .oneOf([Yup.ref('password')], 'Passwords does not match')
})