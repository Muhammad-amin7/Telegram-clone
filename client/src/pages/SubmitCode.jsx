import React, { useContext, useEffect } from 'react'
import monkey from "../assets/images/Monkey.png"
import { useGetInfo } from '../hooks/useGetUserInfo';
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

export default function SubmitCode() {
      const { sendCode, data, loading, error, } = useGetInfo()
      const { email } = useContext(Context)
      const navigate = useNavigate()

      // if the user didn't submit email navigate login page
      useEffect(() => {
            if (!email) {
                  navigate("/login");
            }
      }, [email, navigate]);

      // If the user is already registered, navigate to the home page.
      // else navigate to the user details form page.
      useEffect(() => {
            if (data.status !== 200) return
            if (data.info === null) {
                  return navigate("/user_details_form")
            }
            else {
                  if (data?.access_token) {
                        localStorage.setItem('token', data.access_token)
                  }
                  return navigate("/home")
            }
      }, [data])

      //    submit infos to the backend
      const handlerSendCode = async (e) => {
            e.preventDefault();
            if (loading) return;

            const code = new FormData(e.target).get("code");
            await sendCode(email, code);
      };


      return (
            <section className='max-h-screen bg-neutral-900 flex items-center justify-center px-4'>
                  <div className='w-full  text-white space-y-6 bg-neutral-900 text-center flex flex-col items-center justify-center'>
                        <img src={monkey} alt="" className='max-w-sm h-40 mx-auto ' />
                        <h1 className='text-4xl max-w-3xl font-semibold'>{email}</h1>
                        <p className='text-gray-400'>We've sent the code to the your Email</p>
                        <form className="space-y-4 w-full max-w-sm" onSubmit={handlerSendCode}>                              <div>
                              <label className="block text-sm text-gray-300 mb-1">Code</label>
                              <input
                                    type="text"
                                    name="code"
                                    placeholder="Code"
                                    className={inputStyle}
                                    required
                              />
                        </div>

                              <button type="submit" className={`${inputStyle} hover:bg-[rgb(131,120,219,1)] active:bg-[rgb(131,120,219,0.8)]`}>
                                    {loading ? "Loading..." : 'Next'}
                              </button>
                        </form>
                  </div>
            </section>
      )
}


const inputStyle =
      "w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-[0.75rem] focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-xs font-medium duration-300";
