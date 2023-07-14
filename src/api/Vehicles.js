import axios from "axios";

// const URL = `http://localhost/Svelt_API_Backend/Vehicles`;
const URL=`http://54.243.188.153/Vehicles`;

/**
 * Get del vehiculo por su matricula
 * @param {Matricula de vehiculo} registration 
 * @returns Vehiculo
 */
export const getVehicleByRegis = async(registration) => {
  try {
    const response = await axios.get(URL + `?registration=${registration}`);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * Hace un put del vehiculo
 * @param {Vehiculo a modificar} vehicle 
 * @returns 
 */
export const putVehicle=async(vehicle)=>{
  try {
    const response=await axios.put(URL,vehicle,{
      headers:{
        'Content-Type':'application/json'
      }
    });
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

/**
 * Sube un vehiculo nuevo
 * @param {Vehiculo a subir} vehicle 
 * @returns 
 */
export const postVehicle =async(vehicle)=>{
  try {
    const response=await axios.post(URL,vehicle,{
      headers:{
        'Content-Type':'application/json'
      }
    });
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
}
}

export const deleteVehicle=async(vehicleRegis)=>{
  try {
    const response=await axios.delete(URL + `?registration=${vehicleRegis}`);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
