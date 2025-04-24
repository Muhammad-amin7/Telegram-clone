import React, { useContext, useEffect } from 'react'
import monkey from "../assets/images/Monkey.png"
import { useGetInfo } from '../hooks/useGetUserInfo';
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

export default function SubmitCode() {
      const { sendCode, data, loading, error, } = useGetInfo()
      const { email } = useContext(Context)
      const navigate = useNavigate()

      useEffect(() => {
            if (!email) {
                  return navigate("/login")
            }
      }, [])

      if (data.status === 200) {
            return navigate("/user_details_form")
      }

      const handlerSendCode = (e) => {
            if (!loading) {
                  e.preventDefault()
                  const code = new FormData(e.target).get("code");
                  sendCode(email, code);
            }
      }

      return (
            <section className='min-h-screen bg-neutral-900 flex items-center justify-center px-4'>
                  <div className='w-full max-w-sm text-white space-y-6 text-center'>
                        <img src={monkey} alt="" className='w-40 h-40 mx-auto' />
                        <h1 className='text-4xl font-semibold'>{email}</h1>
                        <p className='text-gray-400'>We've sent the code to the your Email</p>
                        <form className="space-y-4 text-left" onSubmit={handlerSendCode}>
                              <div>
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
