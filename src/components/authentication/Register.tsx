import { useFormik } from 'formik'
import { RegisterSchemas } from "../../schema/RegisterSchemas";
import { ChangeEvent, useState } from "react";
import { register } from '../../services/Auth-services';
import { IRegisterUser } from '../../interfaces/IFormInterface';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Toaster from '../../hooks/Toaster';
import { AxiosError, AxiosResponse } from 'axios';

const Register = () => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            phone: '',
            email:'',
            gender: '',
            age:'',
            password:'',
            confirmpassword: ''
        },
        validationSchema:RegisterSchemas,
        onSubmit : (values:IRegisterUser) => {
            const {firstname, lastname, phone, email, gender, age, password, confirmpassword} = values
            const regValue = {
                firstname,
                lastname,
                phone,
                email,
                gender,
                age,
                password,
                confirmpassword
            }
            register(regValue)
            .then((res:AxiosResponse<string>)=>{
                if(res.data){
                    localStorage.setItem("userData", JSON.stringify(res.data))
                }
                void Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                }).then(() => {
                    navigate('/login')
                });    
            }).catch((err:AxiosError<string>)=>{
                if(err.response && err.response.data){
                    Toaster.error(err.response.data)
                }else{
                    console.log("Please check your credentials");
                    
                }
                
            });
        }
    })
    return (
        <>
          <div className="flex min-h-screen flex-1">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <img
                        className="h-20 w-20 mx-auto"
                        src="/images/registration_icon.svg"
                        alt="Your Company"
                        />
                        <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
                        Register Your Account
                        </h2>
                    </div>
                    <div className="mt-10">
                        <div>
                            <form className="space-y-2" method="POST" onSubmit={formik.handleSubmit}>
                                <div className="grid gap-6 mb-5 md:grid-cols-2">
                                    {/* First Name */}
                                    <div>
                                        <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">First name</label>
                                        <input 
                                        type="text" 
                                        id="firstname" 
                                        name='firstname'
                                        autoComplete='firstname'
                                        onChange={formik.handleChange}
                                        value={formik.values.firstname}
                                        className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-1.5"/>
                                        {formik.errors.firstname && formik.touched.firstname ? <p className="text-red-500">{formik.errors.firstname}</p> : null}

                                    </div>
                                    {/* Last Name */}
                                    <div>
                                        <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Last name</label>
                                        <input 
                                        type="text" 
                                        id="lastname" 
                                        name='lastname'
                                        autoComplete='lastname'
                                        onChange={formik.handleChange}
                                        value={formik.values.lastname}
                                        className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-1.5"/>
                                        {formik.errors.lastname && formik.touched.lastname ? <p className="text-red-500">{formik.errors.lastname}</p> : null}
                                    </div> 
                                </div>
                                <div className="grid gap-6 mb-5 md:grid-cols-2">
                                    {/* Email */}
                                    <div className="mb-5">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email address</label>
                                        <input 
                                        type="email" 
                                        id="email" 
                                        name='email'
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        autoComplete="email"
                                        className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-1.5"/>
                                        {formik.errors.email && formik.touched.email ? <p className="text-red-500">{formik.errors.email}</p> : null}
                                    </div>
                                    {/* Phone Number */}
                                    <div className='mb-5'>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Phone number</label>
                                        <input 
                                        type="tel"
                                        id="phone"
                                        name='phone'
                                        onChange={formik.handleChange}
                                        value={formik.values.phone}
                                        className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-1.5"/>
                                        {formik.errors.phone && formik.touched.phone ? <p className="text-red-500">{formik.errors.phone}</p> : null}
                                    </div>
                                </div>
                                <div className="grid gap-6 mb-5 md:grid-cols-2">
                                    {/* Password */} 
                                    <div className="mb-5">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>
                                        <input 
                                        type="password" 
                                        id="password" 
                                        name='password'
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        autoComplete="new-password"
                                        className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-1.5"/>
                                        {formik.errors.password && formik.touched.password ? <p className="text-red-500">{formik.errors.password}</p> : null}

                                    </div>
                                    {/* Confirm Password */}
                                    <div className="mb-5">
                                        <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Confirm password</label>
                                        <input 
                                        type="password" 
                                        id="confirmpassword" 
                                        name='confirmpassword'
                                        onChange={formik.handleChange}
                                        value={formik.values.confirmpassword} 
                                        autoComplete="new-password"
                                        className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-1.5"/>
                                        {formik.errors.confirmpassword && formik.touched.confirmpassword ? <p className="text-red-500">{formik.errors.confirmpassword}</p> : null}

                                    </div> 
                                </div>
                                <div className="grid mb-5 gap-6 md:grid-cols-2">
                                    {/* Age */}
                                    <div className="mb-5">
                                        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Age</label>
                                        <input 
                                        type="number" 
                                        id="age" 
                                        name='age'
                                        onChange={formik.handleChange}
                                        value={formik.values.age} 
                                        className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-1.5"/>
                                        {formik.errors.age && formik.touched.age ? <p className="text-red-500">{formik.errors.age}</p> : null}

                                    </div>
                                    {/* Gender */}
                                    <div className="">
                                        <label className="block mb-2 font-medium text-gray-900" htmlFor="gender">
                                            Gender
                                        </label>
                                        <div className="flex items-center">
                                            <div>
                                            <input
                                                type="radio"
                                                name="gender"
                                                id="male"
                                                onChange={(event:ChangeEvent<HTMLInputElement>):any => formik.setFieldValue('gender', 'male')}
                                                checked={formik.values.gender === 'male'}
                                                className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg"
                                            />
                                            <label className="text-gray-800 font-semibold px-4 cursor-pointer rounded-l" htmlFor="male">
                                                Male
                                            </label>
                                            </div>
                                            <div>
                                            <input
                                                name="gender"
                                                type="radio"
                                                id="female"
                                                onChange={(event:ChangeEvent<HTMLInputElement>):any => formik.setFieldValue('gender', 'female')}
                                                checked={formik.values.gender === 'female'}
                                                className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg"
                                            />
                                            <label className="text-gray-800 font-semibold px-4 cursor-pointer" htmlFor="female">
                                                Female
                                            </label>
                                            </div>
                                        </div>
                                        {formik.errors.gender && formik.touched.gender ? (
                                            <p className="text-red-500">{formik.errors.gender}</p>
                                        ) : null}
                                    </div>
                                </div>       
                            <div style={{marginTop:'20px'}}>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200" >
                                    Register
                                </button>
                            </div>
                            </form>
                        </div>
                        <p className="my-3 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to={'/login'}>
                                <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                alt=""
              />
            </div>
          </div>
        </>
      )
}

export default Register