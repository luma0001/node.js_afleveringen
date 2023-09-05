async function fetchArtists() {
  const promise = await fetch("../Backend/artists.json");
  return promise.json();
}

export { fetchArtists };
