export const handlefriendrequest = async (sendername, receivername) => {
try{
  const response=await axios.post("/check-user",{
    sendername,receivername
  });
  return response.data;

 } catch (error) {
    console.log("Error in friend request", error.message);}
  // try {
  //   console.log(sendername,receivername);
  //   const response = await fetch("http://localhost:5000/check-user",{
  //     method:"POST",
  //     headers:{
  //       "Content-Type":"application/json"
  //     },
  //     body:JSON.stringify({sendername,receivername})
  //   }
  //   );
  //   console.log("fejwewe");

  //   if (!response.ok) {
  //     throw new Error("Network response failed")
  //   }

  //   const data = await response.json()

  //   console.log(data);
  //   console.log("data");
  //   return data;

  // } catch (error) {
  //   console.log("Error in friend request")
  //   return { success: false, message: "Request failed" }
  // }
}
export const providefriendrequestlist= async (username)=>{
  try{
    console.log(username);
    const response= await fetch("http://localhost:5000/friendrequestlist",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({username})
    })
    const data=await response.json();
    console.log("i am in api",data);
    return data;
  } catch (error){
    console.log("error in getting friend request list");
    return {success:false,message:"Request failed"}
  }
}
export const includeinfriendlist= async (persontobeadd,personwhoadd)=>{
  try{
    const response=await fetch("http://localhost:5000/addinfriendlist",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({persontobeadd,personwhoadd})
    })
    const data=await response.json();
    console.log(data);
    return data;
  }
  catch(err){
    console.log("error occured",err);
    return {success:false,message:"request failed"};
  }
}

export const handleprofileedit=async (formdata)=>{
  try{
      let response=await fetch("http://localhost:5000/editprofile",{
        method:"POST",
        body:formdata
      })
      const result=await response.json();
      console.log("i am in api",result);
      return result;
    }catch(error){
      console.log("error occured");
    }
}