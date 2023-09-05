async function fetchArtists() {
  const promise = await fetch("../Backend/artists.json");
  const data = await promise.json();

  return cleanData(data);
}

function cleanData(data) {
  //hvis det er et objekt med objekter - skal vi så bruger
  const objectArray = [];
  for (const object in data) {
    const artistObject = data[object];
    objectArray.push(artistObject);
  }
  console.log(objectArray);
  return objectArray;
}

export { fetchArtists };
