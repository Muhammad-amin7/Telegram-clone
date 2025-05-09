import React, { useContext, useEffect, useState } from 'react';
import monkey from "../assets/images/Monkey.png";
import { useGetInfo } from '../hooks/useGetUserInfo';
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

export default function SubmitCode() {
  const { sendCode, data, loading } = useGetInfo();
  const { email } = useContext(Context);
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [borderState, setBorderState] = useState("neutral");

  // Redirect if no email
  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate]);

  useEffect(() => {
    if (code.length === 6 && !loading) {
      handleSendCode();
    }
  }, [code, loading]);

  // Input change handler
  const handleChange = (e) => {
    setCode(e.target.value);
    setBorderState("neutral"); // reset border on change
  };

  // Submit code handler
    const handleSendCode = async () => {
    if (loading || code.length < 4) return;

    const res = await sendCode(email, code);

    if (res.status === 200) {
      if (res.info && Object.keys(res.info).length > 0) {
        localStorage.setItem('token', res.access_token)
        navigate('/home');
      } else {
        navigate('/user_details_form');
      }
    } else {
      setBorderState("error");
    }
    console.log("Server response:", res);

  };

  return (
    <section className="h-screen bg-neutral-900 flex items-center justify-center px-4">
      <div className="w-full text-white space-y-6 text-center flex flex-col items-center justify-center">
        <img src={monkey} alt="Monkey" className="max-w-sm h-40 mx-auto" />
        <h1 className="text-4xl max-w-3xl font-semibold">{email}</h1>
        <p className="text-gray-400">We've sent the code to your email</p>

        <form onSubmit={(e) => {
          e.preventDefault();
          handleSendCode();}} className="space-y-4 w-full max-w-sm text-start">
          <div>
            <label className="block text-sm text-gray-300 mb-1 ml-0.5">Code</label>
            <input
              type="text"
              name="code"
              placeholder="Enter your code"
              value={code}
              onChange={handleChange}
              className={`${inputBaseStyle} ${borderVariants[borderState]}`}
              required
            />
          </div>
        </form>
      </div>
    </section>
  );
}

// Tailwind input base style
const inputBaseStyle = `
  w-full px-3 py-2 bg-neutral-800 border rounded-[0.75rem] 
  focus:outline-none focus:ring-2 placeholder:text-xs 
  font-medium transition duration-300
`;

// Color variants for border
const borderVariants = {
  neutral: "border-neutral-700 focus:ring-violet-500",
  success: "border-green-500 focus:ring-green-500",
  error: "border-red-500 focus:ring-red-500",
};
