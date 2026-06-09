import React, { useState, useEffect } from "react";
import API from "../services/Axios";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({
        ...data,
        address: data.address || {
          street: "",
          city: "",
          state: "",
          pincode: "",
          country: "India",
        },
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setUser((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const token = localStorage.getItem("token");
      await API.put("/user/updateuser", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-10 tracking-tighter uppercase">
          YOUR PROFILE
        </h1>

        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-900 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-5xl font-black text-white shadow-2xl shadow-blue-500/50">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-black text-white tracking-tight">{user.name}</h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest mt-2">{user.email}</p>
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="bg-gray-800 text-blue-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-gray-700">Verified Member</span>
                  <span className="bg-gray-800 text-gray-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-gray-700">Customer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-12">
              <section>
                <h3 className="text-gray-900 font-black text-lg uppercase tracking-widest mb-8 flex items-center gap-2">
                  <span className="w-8 h-px bg-gray-200" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-3xl transition-all outline-none font-bold text-gray-900 shadow-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={user.phoneNumber}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-3xl transition-all outline-none font-bold text-gray-900 shadow-sm"
                      required
                    />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-gray-900 font-black text-lg uppercase tracking-widest mb-8 flex items-center gap-2">
                  <span className="w-8 h-px bg-gray-200" />
                  Shipping Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Street Address</label>
                    <input
                      type="text"
                      name="address.street"
                      value={user.address.street}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-3xl transition-all outline-none font-bold text-gray-900 shadow-sm"
                      placeholder="House No, Street, Area"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">City</label>
                    <input
                      type="text"
                      name="address.city"
                      value={user.address.city}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-3xl transition-all outline-none font-bold text-gray-900 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">State</label>
                    <input
                      type="text"
                      name="address.state"
                      value={user.address.state}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-3xl transition-all outline-none font-bold text-gray-900 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Pincode</label>
                    <input
                      type="text"
                      name="address.pincode"
                      value={user.address.pincode}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-3xl transition-all outline-none font-bold text-gray-900 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Country</label>
                    <input
                      type="text"
                      name="address.country"
                      value={user.address.country}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-3xl transition-all outline-none font-bold text-gray-900 shadow-sm"
                    />
                  </div>
                </div>
              </section>

              <div className="pt-8 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={updating}
                  className="w-full md:w-auto bg-gray-900 text-white px-12 py-5 rounded-[30px] font-black text-xl hover:bg-blue-600 transition-all transform active:scale-95 shadow-xl shadow-gray-900/10 uppercase tracking-widest flex items-center justify-center gap-4"
                >
                  {updating ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;