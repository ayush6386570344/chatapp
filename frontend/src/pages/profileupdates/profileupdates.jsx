
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
      const { data: prof } = await axios.get(`/getprofile/${authuser._id}`)

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