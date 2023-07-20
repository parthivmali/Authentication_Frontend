import * as Yup from 'yup';

export const UserProfileSchema = Yup.object({
    firstname : Yup.string().min(2).max(20).required("First name is mandatory"),
    lastname : Yup.string().min(2).max(20).required("Last name is mandatory"),
    phone : Yup.string().min(10).max(10).required("Phone number is mandatory"),
    email: Yup.string().email().required('Email is mandatory'),
    gender: Yup.string().oneOf(['male', 'female'], 'Please select a valid gender').required('Gender is mandatory'),
    age: Yup.string().required('Age is mandatory'),
})