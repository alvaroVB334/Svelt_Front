import axios from "axios";
import CryptoJS from "crypto-js";

// const URL = `http://localhost/Svelt_API_Backend/User`;
const URL=`http://54.243.188.153/User`;

export const postUser = async (user) => {
  try {
    const response = await axios.post(URL, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * Función que hace put del usuario
 * @param {Usuario modificado} userData
 * @returns Promise(response)
 */
export const putUser = async (userData) => {
  try {
    const response = await axios.put(URL, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getUserByEmail=async(email)=>{
  try {
    const response=await axios.get(URL+`?email=${email}`);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const deleteUserById=async(user_code)=>{
  try {
    const response = await axios.delete(
      URL + `?userCode=${user_code}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
}



/**
 * Le pasas una contraseña en MD5, y la contraseña normal
 * Para comprobar si coinciden
 * @param {Contraseña a checkear} password
 * @returns
 */
export const md5Check = (md5Pass, password) => {
  const hash = CryptoJS.MD5(password).toString();
  if (md5Pass == hash) return true;
  else return false;
};

/**
 * Encripta una contraseña a MD5
 * @param {} password  Contraseña a encriptar
 * @returns La contraseña encriptada
 */
export const md5Crypt = (password) => {
  return CryptoJS.MD5(password).toString();
};

/**
 * Genera un codigo de confirmación de correo random
 * @returns el codigo
 */
export const generateRandomCode = () => {
  let randomCode = "";

  for (let i = 0; i < 6; i++) {
    randomCode += Math.floor(Math.random() * 10);
  }
  return randomCode;
};
