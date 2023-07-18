import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { ResetPasswordSchema } from "../../schema/ResetPasswordSchema";
import { useState } from "react";
import { resetPassword } from "../../services/Auth-services";
import { IResetValue, Imessage } from "../../interfaces/IFormInterface";
import { AxiosError, AxiosResponse } from "axios";
import Swal from "sweetalert2";
import Toaster from "../../hooks/Toaster";
import { BiArrowBack } from "react-icons/bi";

const ResetPassword = () => {
    const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            code: '',
            password: '',
            confirmpassword: ''
        },
        validationSchema: ResetPasswordSchema,
        onSubmit: (values:IResetValue) => {
            const {code , password, confirmpassword} = values
            const resetValue = {
                code,
                password,
                confirmpassword
            }
            resetPassword(resetValue)
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
                        navigate('/login')
                    })
                    
                }else{
                    console.log("Please enter valid email");
                    
                }

            }).catch((err:AxiosError<Imessage>):void => {
                if(err.response?.data?.message){
                    Toaster.error(err.response.data.message)
                }
            })
        }
      });

      const handleOtpChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        void formik.setFieldValue("code", newOtp.join(""));
      };
  return (
    <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm border p-5 shadow-xl">
                <form className="space-y-6" onSubmit={formik.handleSubmit} method="POST">
                    <div className="flex justify-start">
                        <NavLink to={'/email-send'}>
                            <p className="flex justify-center text-2xl font-extrabold  text-black">
                                <BiArrowBack/>
                            </p>
                        </NavLink>
                    </div>
                    <div className="text-left">
                        <h3 className="text-2xl font-medium">Create new password</h3>
                        <span className="text-xs text-gray-600">We'll ask for this password whenever you sign in.</span>
                    </div>
                    <div>
                        {/* OTP BOX */}
                        <div className="mb-5">
                            <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black ps-1">OTP</label>
                                <div className="flex gap-4">
                                    {otp.map((digit, index) => (
                                        <input
                                        key={index}
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        pattern="\d{1}"
                                        maxLength={1}
                                        className="border border-gray-400 text-center mx-auto w-16 rounded-lg p-1.5 block"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        />
                                    ))}
                                </div>
                            </div>
                        {/* Password */} 
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>
                            <input 
                            type="password" 
                            id="password" 
                            name='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-1.5"/>
                            {formik.errors.password && formik.touched.password ? <p className="text-red-500">{formik.errors.password}</p> : null}

                        </div>
                        {/* Confirm Password */}
                        <div className="mb-5">
                            <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Confirm Password</label>
                            <input 
                            type="password" 
                            id="confirmpassword" 
                            name='confirmpassword'
                            onChange={formik.handleChange}
                            value={formik.values.confirmpassword} 
                            className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-1.5 "/>
                            {formik.errors.confirmpassword && formik.touched.confirmpassword ? <p className="text-red-500">{formik.errors.confirmpassword}</p> : null}

                        </div> 
                    </div>
                    {/* Save Chages and Sign in Button */}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                            Save changes and sign in
                        </button>
                    </div>
                </form>
            </div>
            <div className="sm:max-w-sm mx-auto mt-3 text-left">
                <p className="text-lg">Secure password tips:</p>
                <div className="flex"><p className="pr-2"> ‣ </p><p className="text-sm">Use at least 8 characters, a combination of numbers and letters is best.</p></div>
                <div className="flex"><p className="pr-2"> ‣ </p><p className="text-sm">Do not use the same password you have used with us previously.</p></div>
                <div className="flex"><p className="pr-2"> ‣ </p><p className="text-sm">Do not use dictionary words, your name, e-mail address, mobile phone number or other personal information that can be easily obtained.</p></div>
                <div className="flex"><p className="pr-2"> ‣ </p><p className="text-sm">Do not use the same password for multiple online accounts.</p></div>
                
                    
            </div>
        </div>
    </div>
  )
}

export default ResetPassword