// export let addusedata=async(username,email,password)=>{
//     let response=  await fetch('http://localhost:5000/userdata',{
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify({username,email,password})
//     });     
//    const data=await response.json();
// }
// export const userprofile=async(userid)=>{
//     let response=await fetch('http://localhost:5000/getprofile',{
//         method:"POST",
//     headers:{
//     "Content-Type":"application/json"
//     },
//     body:JSON.stringify({userid})
//     })
//     const data=await response.json();
//     return data;
// }
// export const friendsdata=async(username)=>{
//     const response = await fetch("http://localhost:5000/getfrienddetails",{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify({username})
//     })
//     const data=await response.json();
//     return data;
// }

// export const providefriendlist=async(username)=>{
//     const response=await fetch ("http://localhost:5000/friendlist",{
//         method:"POST",
//         headers:{
//             "Content-type":"application/json"
//         },
//         body:JSON.stringify({username})
//     })
//     const data=await response.json();
//     return data;
// }