import React from 'react';
import Logo from '../assets/images/telegram.png';
import { useSendEmail } from '../hooks/useSendEmail';

export default function Login() {

  const { data, loading, error, } = useSendEmail("abduhalilovshohruh681@gmail.com")


  return (
    <section className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-white space-y-6 text-center">
        <img src={Logo} alt="Telegram" className="w-28 h-28 mx-auto" />
        <h1 className="text-4xl font-semibold">Telegram</h1>
        <p className="text-gray-400">Confirm your country code and enter your Email.</p>

        <form className="space-y-4 text-left">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input type="email" placeholder="@email.com" className={inputStyle} />
          </div>

          <div className="flex items-center gap-2">
            <input id="remember" type="checkbox" className="accent-violet-500" />
            <label htmlFor="remember" className="text-sm">Keep me signed in</label>
          </div>

          <button type="submit" className={inputStyle}>
            Continue
          </button>
        </form>

        <a href="#" className="text-violet-400 text-sm hover:underline">Log in by QR code</a>
      </div>
    </section>
  );
}

const inputStyle = "w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500";
