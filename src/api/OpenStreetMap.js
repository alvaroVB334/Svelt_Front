export const obtenerLatitudLongitud = async(direccion) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(direccion)}&format=json`;
  
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const latitud = data[0].lat;
          const longitud = data[0].lon;
          return { latitud, longitud };
        } else {
          throw new Error("No se encontraron resultados para la dirección especificada.");
        }
      })
      .catch(error => {
        throw new Error("Hubo un error al realizar la solicitud:", error);
      });
  };