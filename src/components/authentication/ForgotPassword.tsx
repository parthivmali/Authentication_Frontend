import { forgotPassword } from "../../services/Auth-services";
import { IforgotValue, Imessage } from "../../interfaces/IFormInterface";
import { NavLink, useNavigate } from "react-router-dom";
import { ForgotSchema } from "../../schema/ForgotSchema";
import { AxiosError, AxiosResponse } from "axios";
import Toaster from "../../hooks/Toaster";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import {BiArrowBack} from 'react-icons/bi'


const ForgotPassword = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: ForgotSchema,
        onSubmit: (values:IforgotValue) => {
            const {email} = values;
            const forgotValue = {
                email
            }
            forgotPassword(forgotValue)
            .then((res:AxiosResponse<Imessage>):void =>{
                if(res.data.message){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                    })

                    void Toast.fire({
                    icon: 'success',
                    title: res.data.message
                    }).then(()=>{
                        navigate('/reset-password')
                    })
                    
                }else{
                    console.log("Please enter valid email");
                    
                }

            }).catch((err:AxiosError<Imessage>):void => {
                if(err.response?.data?.message){
                    Toaster.error(err.response.data.message)
                }
            });
        }
    })

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm border p-5 shadow-lg">
            <form className="space-y-6" onSubmit={formik.handleSubmit} method="POST">
              <div className="flex justify-start">
                  <NavLink to={'/login'}>
                      <p className="flex justify-center text-2xl font-extrabold  text-black">
                          <BiArrowBack/>
                      </p>
                  </NavLink>
              </div>
              <div>
                <h3 className="text-2xl">Forgot Password assistance</h3>
                <span className="text-sm text-gray-600">Enter the email address associated with your user authentication account.</span>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    autoComplete="email"
                    className="bg-gray-100 border border-gray-400 text-gray-900 text-sm font-medium rounded-lg block w-full p-1.5"
                  />
                  {formik.errors.email && formik.touched.email ? <p className="text-red-500">{formik.errors.email}</p> : null}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
          <div className="sm:max-w-sm mx-auto my-3">
            <p className="text-lg font-medium">Has your email address changed?</p>
            <span className="text-xs">If you no longer use the e-mail address associated with your user authentication account, you may contact <NavLink to={'https://support.google.com/accounts'}><u className="font-bold text-indigo-600 hover:text-indigo-800">Customer Service</u></NavLink> for help restoring access to your account.</span>
          </div>
        </div>
      </>
    )
  }

export default ForgotPassword;