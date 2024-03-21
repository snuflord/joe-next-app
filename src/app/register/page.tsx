'use client'

import { FaUser } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from 'react'
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';


export default function RegisterPage() {

    const { error, registerUser, } = useAuth();

    useEffect(() => {
        if (error) {
          console.log(`Register Page error is: ${error}`);
          toast.error( error );
        }
    }, [error]);

    console.log('hello')

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    // console.log(values)

    const handleInputChange = (e: { target: { name: any; value: string; }; }) => {

        // the 'name' property in each input allows state to be changed with one function.
        const {name, value} = e.target

        // spread operator across values, update state with the value of target.
        setValues({...values, [name]: value})
    }

    
    const handleRegister = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        const hasEmptyFields = Object.values(values).some((element) => element === '')
  
        if(hasEmptyFields) {
            
            console.log('empty fields')
            toast.error("Empty fields!")
            return
        } 

        if(values.password !== values.passwordConfirm) {

            console.log('Passwords do not match')
            toast.error('Passwords do not match!')
            return

        } else {
            

            const user = {
                username: values.username,
                identifier: values.email,
                password: values.password,
            };

            registerUser(user);
        }
    }


  return (

    <div>
        <div className='w-full md:w-1/2 bg-blue-500 rounded-lg m-auto p-1 md:p-6 shadow-xl flex flex-col items-center'>
            
            <h1 className='flex items-center text-2xl'>
                <FaUser className='mr-2' /> Sign Up
            </h1>

            <ToastContainer />

            <form className='w-full px-2' onSubmit={handleRegister}> 

                <div className='flex flex-col my-2'>
                    <label className='font-bold mb-2' htmlFor='username'>Username</label>
                    <input className='bg-slate-400 h-4 p-4 rounded w-full' type='text' id='username' name='username' value={values.username} onChange={handleInputChange}/>
                </div>

                <div className='flex flex-col my-2'>
                    <label className='font-bold mb-2' htmlFor='email'>Email</label>
                    <input className='bg-slate-400 h-4 p-4 rounded w-full' type='email' id='email' name='email' value={values.email} onChange={handleInputChange}/>
                </div>

                <div className='flex flex-col my-2'>
                    <label className='font-bold mb-2' htmlFor='password'>Password</label>
                    <input className='bg-slate-400 h-4 p-4 rounded w-full' type='password' id='password' name="password" value={values.password} onChange={handleInputChange}/>
                </div>

                <div className='flex flex-col my-2'>
                    <label className='font-bold mb-2' htmlFor='password'>Password Confirm</label>
                    <input className='bg-slate-400 h-4 p-4 rounded w-full' type='password' id='passwordConfirm' name="passwordConfirm" value={values.passwordConfirm} onChange={handleInputChange}/>
                </div>

                <button type='submit' value='Login' className='p-4 w-full bg-emerald-500 rounded-lg my-4'>Sign Up</button>
            </form>

            <p className='my-2'>Already have an account? <Link className='underline' href='/dashboard/login'>Log in</Link></p>

        </div>
    </div>
  )
}
