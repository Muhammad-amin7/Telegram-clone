import { useContext, useState } from "react";
import { useNewUser } from "../hooks/useNewUser";
import { Context } from "../Context/Context";

export default function UserDetailsForm() {
  const { addNewUser, data, loading, error } = useNewUser()
  const { email } = useContext(Context)
  const [formData, setFormData] = useState({
    img: null,
    firstName: "",
    lastName: "",
    username: "",
    bio: "",
    dob: "",
    email: email
  });
  const [toastMsg, setToastMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setFormData({ ...formData, profilePicture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await new Promise((res) => setTimeout(res, 1200));
      setToastMsg("✅ Profile saved successfully!");
      console.log("Form submitted: ", formData);
      addNewUser(formData)
    } catch (error) {
      setToastMsg("❌ Error saving profile.");
      console.log(error);
    } finally {
      setTimeout(() => setToastMsg(null), 3000);
    }
  };

  const imageUrl = formData.profilePicture
    ? URL.createObjectURL(formData.profilePicture)
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-800 px-4 py-8 text-white font-sans">
      <div className="w-full max-w-2xl bg-neutral-800 rounded-2xl shadow-2xl p-8 animate-fade-in">
        <h2 className="text-3xl font-semibold text-center mb-8 text-white">Your Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-800">
          <div className="flex flex-col items-center gap-4">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-zinc-800! border border-zinc-600 shadow-md">
              {imageUrl ? (
                <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">PP</div>
              )}
            </div>
            <input
              type="file"
              name="img"
              accept="image/*"
              onChange={handleChange}
              className="block w-fit text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block mb-1 text-sm text-gray-300">Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-zinc-800! border border-zinc-700! rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-300">Surname</label>
              <input
                type="text"
                name="lastName"
                value={formData.surname}
                onChange={handleChange}
                required
                className="w-full bg-zinc-800! border border-zinc-700! rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                placeholder="Doe"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-300">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-zinc-800! border border-zinc-700! rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                placeholder="@johndoe"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-300">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full bg-zinc-800! border border-zinc-700! rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Short Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us something cool about you..."
              className="w-full h-28 bg-zinc-800! border border-zinc-700! rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-lg font-medium transition
              ${loading ? 'bg-blue-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Saving...
              </div>
            ) : (
              "Save Details"
            )}
          </button>

          {toastMsg && (
            <div className="text-center mt-4 text-sm text-green-400">{toastMsg}</div>
          )}
        </form>
      </div>
    </div>
  );
}
