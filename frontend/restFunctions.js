import { updateArtistsList } from "./main.js";

//url til localhost
const endpoint = "http://localhost:3000";

//Her hentes data fra artist.json
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

// **** posts the created user - sends it to the backend?
async function postNewUser(newArtist) {
  const artistJson = JSON.stringify(newArtist);
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    body: artistJson,
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    // if success, update the users grid
    // artists.push(newArtistObject);
    updateArtistsList();

    // and scroll to top
    // scrollToTop();
  }
}

// Updates the selected artist - send it to back end...
async function putUpdatedArtist(artist) {
  const updatedArtist = JSON.stringify(artist);
  const promise = await fetch(`${endpoint}/artists/${artist.id}`, {
    method: "PUT",
    body: updatedArtist,
    headers: { "Content-Type": "application/json" },
  });
  if (promise.ok) {
    updateArtistsList();
  }
}

// Deletes the aritst with the selected id.
async function deleteArtist(id) {
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    updateArtistsList();
  }
}

export { fetchArtists, postNewUser, putUpdatedArtist, deleteArtist };
