import { useContext, useEffect, useState } from "react";
import { useNewUser } from "../hooks/useNewUser";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router-dom";

export default function UserDetailsForm() {
  // const { addNewUser, data, loading, error } = useNewUser();
  // const navigate = useNavigate();
  // const { email } = useContext(Context);
  // const [formData, setFormData] = useState({
  //   img: null,
  //   firstName: "",
  //   lastName: "",
  //   username: "",
  //   bio: "",
  //   dob: "",
  //   email: email,
  // });

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   if (name === "img") {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFormData({ ...formData, profilePicture: reader.result });
  //     };
  //     if (files[0]) {
  //       reader.readAsDataURL(files[0]);
  //     }
  //   } else {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };

  // // backendga yuborish uchun formani yuborish
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   addNewUser(formData); // Formani backendga yuborish
  // };

  // useEffect(() => {
  //   if (data?.access_token) {
  //     localStorage.setItem('token', data.access_token);
  //   }
  //   if (!loading && !error && data?.status === 200) {
  //     // navigate("/home");
  //   }
  // }, [data]);
  const [imgSrc, setImgSrc] = useState("");

  const handleSetImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result); // file o'qib bo'lgandan keyin imgSrc ga qo'yamiz
      };
      reader.readAsDataURL(file); // Faylni URL qilib o'qib oladi
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-neutral-800 px-4 py-8 text-white font-sans">
    //   <div className="w-full max-w-2xl bg-neutral-800 rounded-2xl shadow-2xl p-8 animate-fade-in">
    //     <h2 className="text-3xl font-semibold text-center mb-8 text-white">Your Profile</h2>

    //     <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-800">
    //       <div className="flex flex-col items-center gap-4">
    //         <div className="w-28 h-28 rounded-full overflow-hidden bg-zinc-800! border border-zinc-600 shadow-md">
    //           {formData.profilePicture ? (
    //             <img src={formData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
    //           ) : (
    //             <div className="w-full h-full flex items-center justify-center text-gray-400">PP</div>
    //           )}
    //         </div>
    //         <input
    //           type="file"
    //           name="img"
    //           accept="image/*"
    //           onChange={handleChange}
    //           value={formData.img}
    //           className="block w-fit text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
    //             file:rounded-lg file:border-0
    //             file:bg-blue-600 file:text-white
    //             hover:file:bg-blue-700 transition"
    //         />
    //       </div>

    //       {/* Boshqa form inputlari */}
    //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
    //         {/* First Name */}
    //         <div>
    //           <label className="block mb-1 text-sm text-gray-300">Name</label>
    //           <input
    //             type="text"
    //             name="firstName"
    //             value={formData.firstName}
    //             onChange={handleChange}
    //             required
    //             className="w-full bg-zinc-800! border border-zinc-700! rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
    //             placeholder="John"
    //           />
    //         </div>
    //         {/* Last Name */}
    //         <div>
    //           <label className="block mb-1 text-sm text-gray-300">Surname</label>
    //           <input
    //             type="text"
    //             name="lastName"
    //             value={formData.lastName}
    //             onChange={handleChange}
    //             className="w-full bg-zinc-800! border border-zinc-700! rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
    //             placeholder="Doe"
    //           />
    //         </div>
    //         {/* Username */}
    //         <div>
    //           <label className="block mb-1 text-sm text-gray-300">Username</label>
    //           <input
    //             type="text"
    //             name="username"
    //             value={formData.username}
    //             onChange={handleChange}
    //             className="w-full bg-zinc-800! border border-zinc-700! rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
    //             placeholder="@johndoe"
    //           />
    //         </div>
    //         {/* Date of Birth */}
    //         <div>
    //           <label className="block mb-1 text-sm text-gray-300">Date of Birth</label>
    //           <input
    //             type="date"
    //             name="dob"
    //             value={formData.dob}
    //             onChange={handleChange}
    //             className="w-full bg-zinc-800! border border-zinc-700! rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           />
    //         </div>
    //       </div>

    //       {/* Bio */}
    //       <div>
    //         <label className="block mb-1 text-sm text-gray-300">Short Bio</label>
    //         <textarea
    //           name="bio"
    //           value={formData.bio}
    //           onChange={handleChange}
    //           placeholder="Tell us something cool about you..."
    //           className="w-full h-28 bg-zinc-800! border border-zinc-700! rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 resize-none"
    //         />
    //       </div>

    //       {/* Submit Button */}
    //       <button
    //         type="submit"
    //         disabled={loading}
    //         className={`w-full py-3 text-white rounded-lg font-medium transition
    //           ${loading ? 'bg-blue-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
    //       >
    //         {loading ? (
    //           <div className="flex items-center justify-center">
    //             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
    //             Saving...
    //           </div>
    //         ) : (
    //           "Save Details"
    //         )}
    //       </button>
    //     </form>
    //   </div>
    // </div>

    <section className="w-screen h-screen bg-neutral-800 flex items-center justify-center">
      <div className=" rounded-2xl bg-[rgb(55,55,55)] px-7 py-7">
        <h1 className="text-white font-bold text-xl">Hello place enter your info</h1>
        <form action="" className="flex flex-col mt-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            {imgSrc ? <img src={imgSrc} alt="" className="w-10 aspect-square rounded-[50%] " /> :
              <div className="w-10 aspect-square rounded-[50%] bg-blue-400"></div>}
            <label htmlFor="selectimg" className="w-30 h-8 flex items-center justify-center bg-blue-500 text-white rounded-sm text-xs ">select photo</label>
            <input type="file" onChange={handleSetImg} id="selectimg" className="hidden" />
          </div>


          <label htmlFor="firstname" className={labelstyle}>First name<span className="text-red-500">*</span></label>
          <input type="text" className={inputstyle} placeholder="(required)" />


          <label htmlFor="firstname" className={labelstyle}>Last name</label>
          <input type="text" className={inputstyle} placeholder="(optional)" />


          <label htmlFor="firstname" className={labelstyle}>username</label>
          <input type="text" className={inputstyle} defaultValue='@' placeholder="(optional)" />


          <button className="w-full bg-blue-500 hover:bg-gradient-to-l hover:from-blue-500 hover:to-[#8774e1] text-white rounded-sm mt-[20px] py-[10px]">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

const inputstyle = `bg-neutral-800 text-white font-medium text-sm h-8 rounded-sm pl-6 outline-[#8774e1] outline-2 focus:outline-blue-500! py-5 placeholder:text-xs`
const labelstyle = `text-white mt-3 mb-1 ml-1 capitalize `