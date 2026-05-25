
// import React, { useState, useEffect, useContext } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { handleprofileedit } from '../../service/menuitem'
// import { userprofile } from '../../service/userdatabase'
// import { AuthContext } from '../../../usecontext/authcontext'
// const ProfileUpdate = () => {
//   const {axios,profileupdates,authuser}=useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const initialEditMode = location.state?.editmode || false

//   const [isEditing, setIsEditing] = useState(initialEditMode)

//   const [profile, setProfile] = useState({
//     name: "",
//     bio: "",
//     image: ""
//   })

//   const [tempProfile, setTempProfile] = useState({
//     name: "",
//     bio: "",
//     image: "",
//     imageFile:null
//   })

//   // ✅ Load profile ONCE
//   useEffect(() => {

//     const fetchProfile = async () => {
//       console.log("Fetching profile for user:", authuser._id);
//       const { data: prof } = await axios.post('/getprofile', { userid: authuser._id });
//       console.log("Fetched profile:", prof);
//       setProfile({
//         name: prof.profile.name,
//         bio: prof.profile.bio,
//         image: prof.profile.img
//       })

//       setTempProfile({
//         name: prof.profile.name,
//         bio: prof.profile.bio,
//         image: prof.profile.img
//       })
//     }

//     fetchProfile()

//   }, [])


//   //new 
//   const handleImageChange = (e) => {

//   const file = e.target.files[0]

//   if (file) {

//     setTempProfile(prev => ({
//       ...prev,
//       image: URL.createObjectURL(file), // preview
//       imageFile: file // actual file
//     }))
//   }
// }

//   const handleSave = async () => {
// console.log(tempProfile);
//   const formData = new FormData()

//   formData.append("name", tempProfile.name)
//   formData.append("bio", tempProfile.bio)
//   formData.append("username", localStorage.getItem('username'))

//   if (tempProfile.imageFile) {
//     formData.append("image", tempProfile.imageFile)
//   }
//   console.log("i am in handle save",formData);
//   await profileupdates(formData);
//   // console.log("i am here",authuser);
//   // const result = await handleprofileedit(formData)
//   // if (success){
//   // setProfile({
//   //   name: result.profile.name,
//   //   bio: result.profile.bio,
//   //   image: result.profile.img
//   // })
//   // }


//   setIsEditing(false)

//   navigate("/chat")
// }

//   return (
//     <div style={styles.card}>

//       <div style={styles.imageContainer}>

//         <img
//           src={isEditing ? tempProfile.image : profile.image}
//           alt="Profile"
//           style={styles.avatar}
//         />

//         {isEditing && (
//           <label style={styles.imageOverlay}>
//             Update Photo
//             <input
//               type="file"
//               hidden
//               onChange={handleImageChange}
//               accept="image/*"
              
//             />
//           </label>
//         )}

//       </div>

//       <div style={styles.infoSection}>

//         {isEditing ? (
//           <>
//             <input
//             placeholder='Enter your name'
//               style={styles.input}
//               value={tempProfile.name}
//               onChange={(e) =>
//                 setTempProfile({
//                   ...tempProfile,
//                   name: e.target.value
//                 })
//               }
//             />

//             <textarea
//             placeholder='Enter Bio'
//               style={styles.textarea}
//               value={tempProfile.bio}
//               onChange={(e) =>
//                 setTempProfile({
//                   ...tempProfile,
//                   bio: e.target.value
//                 })
//               }
//             />

//             <div style={styles.buttonGroup}>
//               <button
//                 onClick={handleSave}
//                 style={styles.saveBtn}
//               >
//                 Save Changes
//               </button>

//               <button
//                 onClick={() => {
//                   setTempProfile(profile)
//                   setIsEditing(false)
//                 }}
//                 style={styles.cancelBtn}
//               >
//                 Cancel
//               </button>
//             </div>
//           </>
//         ) : (
//           <>
//             <h2 style={styles.name}>{profile.name}</h2>
//             <p style={styles.bio}>{profile.bio}</p>

//             <button
//               onClick={() => setIsEditing(true)}
//               style={styles.editBtn}
//             >
//               Edit Profile
//             </button>
//           </>
//         )}

//       </div>

//     </div>
//   )
// }

// // export default ProfileUpdate

// // Simple inline styles for demonstration
// const styles = {
//   card: {
//     maxWidth: '400px',
//     margin: '40px auto',
//     padding: '20px',
//     borderRadius: '15px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//     backgroundColor: '#fff',
//     fontFamily: 'system-ui, sans-serif',
//     textAlign: 'center'
//   },
//   imageContainer: {
//     position: 'relative',
//     width: '120px',
//     height: '120px',
//     margin: '0 auto 20px',
//   },
//   avatar: {
//     width: '100%',
//     height: '100%',
//     borderRadius: '50%',
//     objectFit: 'cover',
//     border: '3px solid #6c63ff'
//   },
//   imageOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     background: '#6c63ff',
//     color: '#fff',
//     padding: '4px 8px',
//     borderRadius: '4px',
//     fontSize: '12px',
//     cursor: 'pointer'
//   },
//   name: { margin: '10px 0', color: '#333' },
//   bio: { color: '#666', lineHeight: '1.5', marginBottom: '20px' },
//   input: {
//     width: '90%',
//     padding: '8px',
//     marginBottom: '10px',
//     borderRadius: '5px',
//     border: '1px solid #ddd'
//   },
//   textarea: {
//     width: '90%',
//     height: '80px',
//     padding: '8px',
//     borderRadius: '5px',
//     border: '1px solid #ddd',
//     resize: 'none'
//   },
//   editBtn: {
//     backgroundColor: '#6c63ff',
//     color: '#fff',
//     border: 'none',
//     padding: '10px 20px',
//     borderRadius: '20px',
//     cursor: 'pointer'
//   },
//   saveBtn: {
//     backgroundColor: '#28a745',
//     color: '#fff',
//     border: 'none',
//     padding: '8px 15px',
//     borderRadius: '5px',
//     marginRight: '10px',
//     cursor: 'pointer'
//   },
//   cancelBtn: {
//     backgroundColor: '#dc3545',
//     color: '#fff',
//     border: 'none',
//     padding: '8px 15px',
//     borderRadius: '5px',
//     cursor: 'pointer'
//   },
//   buttonGroup: { marginTop: '15px' }
// };

// export default ProfileUpdate;
// /* =========================
//    ProfileUpdate.css
//    ========================= */




// // import { useState, useRef } from "react";

// // export default function Profileupdates() {
// //   const [profile, setProfile] = useState({
// //     name: "Jordan Mitchell",
// //     handle: "@jordan.mitchell",
// //     about:
// //       "Senior product designer crafting intuitive digital experiences. Obsessed with the details that make interfaces feel effortless — from micro-interactions to design systems at scale.",
// //     location: "San Francisco, CA",
// //     website: "jordanmitchell.io",
// //   });

// //   const [draft, setDraft] = useState({ ...profile });
// //   const [editing, setEditing] = useState(false);
// //   const [avatarSrc, setAvatarSrc] = useState(null);
// //   const [following, setFollowing] = useState(false);
// //   const [toast, setToast] = useState({ show: false, msg: "" });

// //   const fileRef = useRef();

// //   const showToast = (msg) => {
// //     setToast({ show: true, msg });
// //     setTimeout(() => setToast({ show: false, msg: "" }), 2800);
// //   };

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
// //     setAvatarSrc(URL.createObjectURL(file));
// //     showToast("Profile photo updated");
// //     e.target.value = "";
// //   };

// //   const startEdit = () => {
// //     setDraft({ ...profile });
// //     setEditing(true);
// //   };

// //   const cancelEdit = () => setEditing(false);

// //   const saveEdit = () => {
// //     setProfile({ ...draft });
// //     setEditing(false);
// //     showToast("Profile saved successfully");
// //   };

// //   return (
// // <div className="min-h-screen w-full flex items-center justify-center px-4 bg-gradient-to-b from-[#569AFF] to-[#383699]">      {/* Toast */}
// //       <div
// //         className={`fixed top-5 right-5 z-50 flex items-center gap-2 bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3 text-sm font-medium text-gray-800 transition-all duration-300 ${
// //           toast.show
// //             ? "opacity-100 translate-y-0"
// //             : "opacity-0 -translate-y-8 pointer-events-none"
// //         }`}
// //       >
// //         <svg className="w-5 h-5 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
// //           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z" />
// //         </svg>
// //         {toast.msg}
// //       </div>

// //       {/* Hidden file input */}
// //       <input
// //         ref={fileRef}
// //         type="file"
// //         accept="image/*"
// //         className="hidden"
// //         onChange={handleFileChange}
// //       />

// //       {/* Card */}
// //       <div className="w-full max-w-xl bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">

// //         {/* Cover Banner */}
// //         <div
// //           className="h-44 relative"
// //           style={{ background: "linear-gradient(135deg,#4f8ef7 0%,#7c5cfc 50%,#e05ff4 100%)" }}
// //         >
// //           <div
// //             className="absolute inset-0"
// //             style={{
// //               backgroundImage:
// //                 "repeating-linear-gradient(135deg,rgba(255,255,255,0.04) 0px,rgba(255,255,255,0.04) 1px,transparent 1px,transparent 24px)",
// //             }}
// //           />
// //         </div>

// //         {/* Card Body */}
// //         <div className="px-6 pb-6">

// //           {/* Avatar + Action Buttons Row */}
// //           <div className="flex items-end justify-between -mt-11 mb-4">

// //             {/* Avatar */}
// //             <div
// //               className="relative w-24 h-24 rounded-full border-4 border-white bg-gray-100 overflow-hidden cursor-pointer group shrink-0"
// //               onClick={() => fileRef.current.click()}
// //               title="Change photo"
// //             >
// //               {avatarSrc ? (
// //                 <img src={avatarSrc} alt="Profile" className="w-full h-full object-cover" />
// //               ) : (
// //                 <div
// //                   className="w-full h-full flex items-center justify-center"
// //                   style={{ background: "linear-gradient(135deg,#4f8ef7,#7c5cfc)" }}
// //                 >
// //                   <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
// //                     <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
// //                   </svg>
// //                 </div>
// //               )}
// //               {/* Hover overlay */}
// //               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
// //                 <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
// //                   <path d="M12 15.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4zm7.2-10.4H17l-1.83-2H8.83L7 4.8H4.8A2.4 2.4 0 0 0 2.4 7.2v12a2.4 2.4 0 0 0 2.4 2.4h14.4a2.4 2.4 0 0 0 2.4-2.4v-12a2.4 2.4 0 0 0-2.4-2.4z" />
// //                 </svg>
// //               </div>
// //               {/* Camera badge */}
// //               <div className="absolute bottom-1 right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow border border-gray-200">
// //                 <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
// //                   <path d="M12 15.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4zm7.2-10.4H17l-1.83-2H8.83L7 4.8H4.8A2.4 2.4 0 0 0 2.4 7.2v12a2.4 2.4 0 0 0 2.4 2.4h14.4a2.4 2.4 0 0 0 2.4-2.4v-12a2.4 2.4 0 0 0-2.4-2.4z" />
// //                 </svg>
// //               </div>
// //             </div>

// //             {/* Buttons */}
// //             <div className="flex gap-2 items-center mb-1">
// //               <button
// //                 onClick={() => setFollowing(!following)}
// //                 className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
// //                   following
// //                     ? "border border-gray-300 text-gray-700 hover:bg-gray-50"
// //                     : "text-white hover:opacity-90"
// //                 }`}
// //                 style={!following ? { background: "linear-gradient(135deg,#4f8ef7,#7c5cfc)" } : {}}
// //               >
// //                 {following ? "Following" : "Follow"}
// //               </button>
// //               {!editing && (
// //                 <button
// //                   onClick={startEdit}
// //                   className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all"
// //                 >
// //                   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
// //                     <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.46a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
// //                   </svg>
// //                   Edit
// //                 </button>
// //               )}
// //             </div>
// //           </div>

// //           {/* Name, Handle, Tags */}
// //           <div className="mb-4">
// //             <h1 className="text-xl font-semibold text-gray-900">{profile.name}</h1>
// //             <p className="text-sm text-gray-400 mt-0.5">{profile.handle}</p>
// //             <div className="flex flex-wrap gap-2 mt-3">
// //               {["Product Design", "UX Research", "Design Systems"].map((tag) => (
// //                 <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700">
// //                   {tag}
// //                 </span>
// //               ))}
// //             </div>
// //           </div>

// //           /

// //           {/* ── VIEW MODE ── */}
// //           {!editing && (
// //             <>
// //               {/* About */}
// //               <div className="mb-4">
// //                 <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">About</p>
// //                 <p className="text-sm text-gray-700 leading-relaxed">{profile.about}</p>
// //               </div>

// //               {/* Info Grid */}
// //               <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-3 mb-4">
// //                 <div>
// //                   <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Location</p>
// //                   <p className="text-sm text-gray-600 flex items-center gap-1.5">
// //                     <svg className="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
// //                       <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
// //                     </svg>
// //                     {profile.location}
// //                   </p>
// //                 </div>
                
// //                 <div>
// //                   <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Joined</p>
// //                   <p className="text-sm text-gray-600 flex items-center gap-1.5">
// //                     <svg className="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
// //                       <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
// //                     </svg>
// //                     March 2021
// //                   </p>
// //                 </div>
                
// //               </div>

// //               {/* Social Links */}
             
// //             </>
// //           )}

// //           {/* ── EDIT MODE ── */}
// //           {editing && (
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
// //                   Full name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={draft.name}
// //                   onChange={(e) => setDraft({ ...draft, name: e.target.value })}
// //                   className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-400 transition-colors"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
// //                   Username
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={draft.handle}
// //                   onChange={(e) => setDraft({ ...draft, handle: e.target.value })}
// //                   className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-400 transition-colors"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
// //                   About
// //                 </label>
// //                 <textarea
// //                   rows={3}
// //                   value={draft.about}
// //                   onChange={(e) => setDraft({ ...draft, about: e.target.value })}
// //                   className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-400 transition-colors resize-none leading-relaxed"
// //                 />
// //               </div>
// //               <div className="grid grid-cols-2 gap-3">
// //                 <div>
// //                   <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
// //                     Location
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={draft.location}
// //                     onChange={(e) => setDraft({ ...draft, location: e.target.value })}
// //                     className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-400 transition-colors"
// //                   />
// //                 </div>
                
// //               </div>

// //               {/* Save / Cancel */}
// //               <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
// //                 <button
// //                   onClick={cancelEdit}
// //                   className="px-5 py-2 rounded-xl text-sm text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={saveEdit}
// //                   className="px-6 py-2 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-all"
// //                   style={{ background: "linear-gradient(135deg,#4f8ef7,#7c5cfc)" }}
// //                 >
// //                   Save changes
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './profileupdate.css'
import { AuthContext } from '../../../usecontext/authcontext'

const ProfileUpdate = () => {
  const { axios, profileupdates, authuser } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const initialEditMode = location.state?.editmode || false
  const [isEditing, setIsEditing] = useState(initialEditMode)

  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    image: ""
  })

  const [tempProfile, setTempProfile] = useState({
    name: "",
    bio: "",
    image: "",
    imageFile: null
  })

  // GET PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: prof } = await axios.post('/getprofile', {
        userid: authuser._id
      })

      setProfile({
        name: prof.profile.name,
        bio: prof.profile.bio,
        image: prof.profile.img
      })

      setTempProfile({
        name: prof.profile.name,
        bio: prof.profile.bio,
        image: prof.profile.img
      })
    }

    fetchProfile()
  }, [])

  // IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setTempProfile(prev => ({
        ...prev,
        image: URL.createObjectURL(file),
        imageFile: file
      }))
    }
  }

  // SAVE PROFILE
  const handleSave = async () => {
    const formData = new FormData()

    formData.append("name", tempProfile.name)
    formData.append("bio", tempProfile.bio)
    formData.append("username", localStorage.getItem('username'))

    if (tempProfile.imageFile) {
      formData.append("image", tempProfile.imageFile)
    }

    await profileupdates(formData)

    setIsEditing(false)
    navigate("/chat")
  }

  return (
    <div className="profile-page">

      <div className="profile-card">

        {/* IMAGE */}
        <div className="image-wrapper">

          <img
            src={isEditing ? tempProfile.image : profile.image}
            className="profile-img"
            alt=""
          />

          {isEditing && (
            <label className="upload-btn">
              Change Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>

        {/* CONTENT */}
        <div className="profile-content">

          {isEditing ? (
            <>
              <input
                value={tempProfile.name}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, name: e.target.value })
                }
                placeholder="Enter name"
              />

              <textarea
                value={tempProfile.bio}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, bio: e.target.value })
                }
                placeholder="Enter bio"
              />

              <div className="btn-group">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => {
                    setTempProfile(profile)
                    setIsEditing(false)
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>{profile.name}</h2>
              <p>{profile.bio}</p>

              <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  )
}

export default ProfileUpdate