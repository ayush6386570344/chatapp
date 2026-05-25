// import React, { useState } from 'react'
// import './addfriend.css'
// import { handlefriendrequest } from '../../service/menuitem'
// const AddFriends = () => {
//   const [username, setUsername] = useState('')
//   const handleSendRequest = async() => {
//   let handleaddrequest=await handlefriendrequest(localStorage.getItem('username'),username);
//   console.log(handleaddrequest.success);
//   }
//   return (
//     <div className="addfriend-container">

//       <div className="addfriend-card">

//         <h1>Add Friends</h1>

//         <div className="input-box">
//           <input
//             type="text"
//             placeholder="Enter username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />

//           <button onClick={handleSendRequest}>
//             Send Request
//           </button>
//         </div>

//       </div>

//     </div>
//   )
// }

// export default AddFriends

import React, { useState } from 'react'
import './addfriend.css'
import { handlefriendrequest } from '../../service/menuitem'

const AddFriends = () => {

  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')   // 👈 NEW STATE

  const handleSendRequest = async () => {
    try {
      const sender = localStorage.getItem("username")
       if (username.trim() === sender) {
    setMessage("❌ You can't send friend request to yourself")
    return
  }
      let res = await handlefriendrequest(
        localStorage.getItem('username'),
        username
      )

      console.log(res.success)

      if (res.success === false) {
        setMessage("❌ Invalid username")
      } else {
        setMessage("")   // clear message on success
        setUsername("")  // optional: clear input
      }

    } catch (error) {
      console.log(error)
      setMessage("❌ Something went wrong")
    }
  }

  return (
    <div className="addfriend-container">

      <div className="addfriend-card">

        <h1>Add Friends</h1>

        <div className="input-box">

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <button onClick={handleSendRequest}>
            Send Request
          </button>

        </div>

        {/* 👇 MESSAGE BELOW INPUT */}
        {message && (
          <p className="error-text">
            {message}
          </p>
        )}

      </div>

    </div>
  )
}

export default AddFriends