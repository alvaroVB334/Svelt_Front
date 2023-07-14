import axios from "axios";

// const URL=`http://localhost/Svelt_API_Backend/Token?user=`;
const URL=`http://54.243.188.153/Token?user=`;
/**
 * Get de la data del usuario según su token
 * @param {string} token 
 * @returns Data del user
 */
export const getDataUserByToken=async(token)=>{
  try {
    const response=await axios.get(URL+token)
    return response.data;
  } catch (e) {
    console.log(e)
  }
}