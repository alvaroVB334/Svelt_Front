import axios from "axios";

// const URL = "http://localhost/Svelt_API_Backend/ParkingPlace";
const URL="http://54.243.188.153/ParkingPlace";
/**
 *  GET ALL Parkings
 * @returns response.Data
 */
export const getParkingPlaces = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getBySuperUserID = async (superUserID) => {
  try {
    const response = await axios.get(URL + `?SuperUserID=${superUserID}`);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const postParkingPlace = async (parkingData) => {
  try {
    const response = await axios.post(URL, parkingData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * Get Parking by ID
 * @param {int} idParkingPlace
 * @returns  response.Data
 */
export const getParkingPlaceByID = async (idParkingPlace) => {
  try {
    const response = await axios.get(URL + `?idParkingPlace=${idParkingPlace}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Get Parking by ciudad
 * @param {string} ciudad
 * @returns  response.Data
 */
export const getParkingPlaceByCity = async (ciudad) => {
  try {
    const response = await axios.get(URL + `?ciudad=${ciudad}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Delete del parking por su id
 * @param {idParkingPlace} idParkingPlace
 * @returns
 */
export const deleteParkingByID = async (idParkingPlace) => {
  try {
    const response = await axios.delete(
      URL + `?idParkingPlace=${idParkingPlace}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getIdByCalle=async(calle)=>{
  try {
    const response = await axios.get(
      URL + `?calle=${calle}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export function getPrice(entryValue, exitValue) {
  const precioPorHora = 2; // Precio por hora de estacionamiento

  // Obtener los valores de entrada
  const entryHour = entryValue.$H;
  const entryMinutes = entryValue.$m;

  // Obtener los valores de salida si no es nulo
  let exitHour, exitMinutes;
  if (exitValue !== null) {
    exitHour = exitValue.$H;
    exitMinutes = exitValue.$m;
  } else {
    exitHour = 24;
    exitMinutes = 0;
  }

  // Calcular la duración del estacionamiento en minutos
  const entryTime = entryHour * 60 + entryMinutes;
  const exitTime = exitHour * 60 + exitMinutes;
  const duration = exitTime - entryTime;

  // Calcular el precio total
  const totalPrice = Math.ceil(duration / 60) * precioPorHora;

  return totalPrice;
}



