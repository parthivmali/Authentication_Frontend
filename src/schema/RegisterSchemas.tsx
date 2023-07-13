import * as Yup from 'yup';


export const RegisterSchemas = Yup.object({
    firstname : Yup.string().min(2).max(20).required("First name is mandatory"),
    lastname : Yup.string().min(2).max(20).required("Last name is mandatory"),
    phone : Yup.string().min(10).max(10).required("Phone number is mandatory"),
    email: Yup.string().email().required('Email is mandatory'),
    password: Yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character").required("Password is mandatory"),
    confirmpassword : Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords does not match')
    .required('Password is mendatory'),
    gender: Yup.string().oneOf(['male', 'female'], 'Please select a valid gender').required('Gender is mandatory'),
    age: Yup.string().required('Age is mandatory'),
})