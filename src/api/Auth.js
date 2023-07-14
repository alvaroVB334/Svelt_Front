import axios from "axios";
// const URL=`http://localhost/Svelt_API_Backend/auth`;
const URL=`http://54.243.188.153/auth`;
export const authLogin=async(userData)=>{
  try {
    const response=await axios.post(URL,userData,{
      headers:{
        'Content-Type':'application/json',
      }
    });
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
