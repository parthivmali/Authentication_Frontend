import { useFormik } from "formik";
import { IGetData, Imessage } from "../interfaces/IFormInterface";
import { ChangeEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserProfileSchema } from "../schema/UserProfileSchema";
import axios, { AxiosResponse } from "axios";
import { API_URL } from "../services/Auth-services";
import Toaster from "../hooks/Toaster";

const Profile  = () =>  {
    const [regData, setRegData] = useState<IGetData>();
    const [editProfile, setEditProfile] = useState(true);

    //Get Login User data in Cookies
    useEffect(() => {
        const userDetailsString: string | undefined = Cookies.get('userDetail');
        if (userDetailsString) {
            const userDetails:IGetData = JSON.parse(userDetailsString) as IGetData;
            setRegData(userDetails);   
        }
    }, [])
    
    //Profile View Functionality
    useEffect(() => {
        if (regData) {
            void formik.setValues({
                firstname: regData.firstname,
                lastname: regData.lastname,
                phone: regData.phone,
                email: regData.email,
                gender: regData.gender,
                age: regData.age
            });
        }
    }, [regData]);

    const formik = useFormik({
        initialValues: {
            firstname:  '',
            lastname: '',
            phone: '',
            email:'',
            gender: '',
            age:'',
        },
        validationSchema:UserProfileSchema,
        onSubmit : async (values:IGetData) => {
            console.log(values);
            const {firstname,lastname,email,phone, age, gender} = values;
            const userData = {
                firstname,
                lastname,
                email,
                phone,
                age,
                gender
            }
            try {
                const userId = regData?._id;
                if (!userId) {
                    Toaster.error("User ID not found.")
                    return;
                }
                await axios.patch(`${API_URL}update/${userId}`, userData)
                .then((res:AxiosResponse<Imessage>)=>{
                    if(res.data.message){
                        Toaster.success(res.data.message)
                    }
                }).catch((err)=>{
                    console.log("catch error: ",err);
                    
                });
                setEditProfile(true);
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        }
    })
    
    const handleEdit = () => {
        setEditProfile(false)
    }
    
  return (
    <div className="flex justify-center px-6 pt-36">
        <div className="border border-gray-900/10 shadow-2xl rounded-xl">
            <div className="p-4">
                <h2 className="text-xl font-semibold leading-7 text-black">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-black sm:max-w-sm">This information will be displayed publicly so be careful <span className="block">what you share.</span></p>
            </div>
            <form className="shadow-xl sm:rounded-xl px-6" onSubmit={formik.handleSubmit}>
                <div className="p-4 sm:p-6">
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
                        readOnly={editProfile}
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
                        readOnly={editProfile}
                        className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-1.5"/>
                        {formik.errors.lastname && formik.touched.lastname ? <p className="text-red-500">{formik.errors.lastname}</p> : null}
                    </div> 
                        {/* Email */}
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email address</label>
                            <input 
                            type="email" 
                            id="email" 
                            name='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            readOnly={editProfile}
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
                            readOnly={editProfile}
                            className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-1.5"/>
                            {formik.errors.phone && formik.touched.phone ? <p className="text-red-500">{formik.errors.phone}</p> : null}
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
                            readOnly={editProfile}
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
                                    readOnly={editProfile}
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
                </div>
                <div className="flex items-center justify-end gap-x-6  border-t-2 border-gray-900/10 px-4 py-4 sm:px-8">
                    {editProfile === true 
                    ?
                    <button 
                        type="button" 
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                        onClick={handleEdit}>
                        Edit Profile
                    </button>
                     
                    : 
                    <div>
                        <button 
                            type="button" 
                            className="rounded-md bg-gray-600 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                            onClick={() => setEditProfile(true)}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-[#c57743] mx-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#d66a11] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                            Update
                        </button>
                    </div>
                    }
                </div>
            </form>
            <div>
                <img
                    src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                    alt=""
                    className="absolute inset-0 -z-10 h-screen w-screen object-cover opacity-80"
                    />
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                    >
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile;