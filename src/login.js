import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const handleSubmitter = async(data) => {
    console.log(data);
    const {username,password}=data;
    try {
      const res=await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
  
          username: username,
          password: password,
          expiresInMins: 30, // optional, defaults to 60
        })
      })
      const fin=await res.json()
      console.log(fin);
      if(fin.message== "Invalid credentials"){
         toast.error("Invalid Credentials")
      }else{
        toast.success(username," Successfully logged in!")
        navigate('/dashboard')

      }

      }
     catch (error) {
      console.log("Invalid credentials");
    }
    
    // navigate('/dashboard');
  }

  return (
    <div>
      <form className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4 mt-20" onSubmit={handleSubmit(handleSubmitter)}>
        <h1 className="text-center">Movie Data Base</h1>
        <div>
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input {...register("username")} type="text" class="grow" placeholder="Username" />
          </label>

        </div>
        <div>
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70">
              <path
                fill-rule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clip-rule="evenodd" />
            </svg>
            <input {...register("password")} type="password" placeholder='password' class="grow"  />
          </label>
        </div>
        <button type="submit"
          //onClick={}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-900">
          Login
        </button>
        <ToastContainer />
      </form>

    </div>
  )
}

export default Login