import { useContext, useEffect, useState } from "react";
import { useCheckUsername } from "../hooks/useCheckUsername";
import { useNewUser } from "../hooks/useNewUser"; // Import your custom hook
import { Context } from "../Context/Context";
import { useNavigate } from "react-router-dom";

export default function UserDetailsForm() {
  const { email } = useContext(Context)
  const navigate = useNavigate()
  const [formsinfo, setFormsinfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    img: "",
    email: email
  });
  const [usernameError, setUsernameError] = useState(true);
  const [imgSrc, setImgSrc] = useState("");

  const { sendUsername, data } = useCheckUsername();
  const { addNewUser, loading, error, data: response } = useNewUser();

  const handleSetImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
        setFormsinfo((prevState) => ({ ...prevState, img: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUsername = (e) => {
    const inputValue = e.target.value.trim();
    if (inputValue.length < 8) {
      setUsernameError("minimum");
    } else {
      setUsernameError(true);
      sendUsername(inputValue);
    }
  };

  useEffect(() => {
    if (data) {
      if (data.status === 200) {
        setUsernameError(false);
      } else if (data.status === 409) {
        setUsernameError("error");
      }
    }
  }, [data]);

  useEffect(() => {
    if (response && response.status === 200) {
      navigate('/home')
      localStorage.setItem('token', response.access_token)
    }
  }, [response]);

  useEffect(() => {
    if(!email){
      navigate('/login')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("firstName", formsinfo.firstName);
    formData.append("lastName", formsinfo.lastName);
    formData.append("username", formsinfo.username);
    formData.append("img", formsinfo.img);

    addNewUser(formsinfo);
    console.log(formsinfo);

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormsinfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <section className="w-screen h-screen bg-neutral-800 flex items-center justify-center">
      <div className="rounded-2xl bg-[rgb(55,55,55)] px-7 py-7">
        <h1 className="text-white font-bold text-xl">Hello, please enter your info</h1>
        <form className="flex flex-col mt-10" onSubmit={handleSubmit}>

          <div className="flex items-center justify-center gap-2 mb-3">
            {imgSrc ? (
              <img src={imgSrc} alt="Profile" className="w-10 aspect-square rounded-full" />
            ) : (
              <div className="w-10 aspect-square rounded-full bg-blue-400"></div>
            )}
            <label htmlFor="selectimg" className="w-30 h-8 flex items-center justify-center bg-blue-500 text-white rounded-sm text-xs">
              Select Photo
            </label>
            <input type="file" onChange={handleSetImg} id="selectimg" className="hidden" />
          </div>

          <label className={labelstyle}>First Name<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="firstName"
            className={inputstyle}
            placeholder="(required)"
            value={formsinfo.firstName}
            onChange={handleInputChange}
          />

          <label className={labelstyle}>Last Name</label>
          <input
            type="text"
            name="lastName"
            className={inputstyle}
            placeholder="(optional)"
            value={formsinfo.lastName}
            onChange={handleInputChange}
          />

          <label className={labelstyle}>Username</label>
          <div className="relative w-full grid grid-cols-1">
            <span className="absolute top-1/2 transform -translate-y-1/2 left-3 text-white">@</span>
            <input
              type="text"
              name="username"
              className={`${inputstyle} w-[300px]`}
              placeholder="(required)"
              value={formsinfo.username}
              onChange={(e) => {
                handleInputChange(e);
                handleUsername(e);
              }}
            />
          </div>

          {usernameError === "minimum" && (
            <label className="text-xs mt-1 text-red-700 ml-1 font-medium">
              Minimum length: 8 characters
            </label>
          )}
          {usernameError === "error" && (
            <label className="text-xs mt-1 text-red-700 ml-1 font-medium">
              This username already exists
            </label>
          )}
          {usernameError === false && (
            <label className="text-xs mt-1 text-green-700 ml-1 font-medium">
              Username is available
            </label>
          )}

          <button
            type="submit"
            className="w-full block bg-blue-500 hover:bg-gradient-to-l hover:from-blue-500 hover:to-[#8774e1] text-white rounded-sm mt-[20px] py-[10px]"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

        </form>
      </div>
    </section>
  );
}

const inputstyle = `bg-neutral-800 text-white font-medium text-sm h-8 rounded-sm pl-6 outline-[#8774e1] outline-2 focus:outline-blue-500! py-5 placeholder:text-xs font-serif`;
const labelstyle = `text-white mt-3 mb-1 ml-1 capitalize`;
