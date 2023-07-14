import axios from "axios";

// const URL=`http://localhost/Svelt_API_Backend/SuperUser`;
const URL=`http://54.243.188.153/SuperUser`;

export const createSuperUser=async(idSuperUser)=>{
  const superUser={
    "idSuperUsuario":idSuperUser
  }
  try {
    const response=await axios.post(URL,superUser,{
      headers:{
        'Content-Type':'application/json'
      }
    });
    return response.data;
  } catch (e) {
    console.error(e)
    throw e;
  }
}