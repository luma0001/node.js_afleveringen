"use strict";

import { fetchArtists } from "./restFunctions.js";

window.addEventListener("load", initApp);

////////////////////////// global variables //////////////////////////
const endpoint = "http://localhost:3000";
let artists;

function initApp() {
  activateClickEvents();
  displayAllArtists();
}

function activateClickEvents() {
  document
    .querySelector("#create_artist_form")
    .addEventListener("submit", new_artist_form_submitted);
}

function displayAllArtists() {
  updateArtistsList();
  // updateAritstsGrid();
}

async function updateArtistsList() {
  artists = await fetchArtists();
  console.log(artists);
  console.log(typeof artists);
  updateAritstsGrid();
}

function updateAritstsGrid() {
  document.querySelector("#artists_overview_section").innerHTML = "";
  // artists.forEach(displayArtist);
  for (const artist of artists) {
    displayArtist(artist);
  }
}

function displayArtist(artist) {
  const artistHTML =
    /*html*/
    `
    <article class="artists_object">
    <img src=${artist.image}/>
    Name:${artist.name}
    Date of Birth:${artist.birthdate}
    Active since:${artist.activeSince}
    Genres:${artist.genres}
    Lables: ${artist.labels}
    Website:${artist.website}
    Description:${artist.shortDescription}
    <button class="update_btn">Update</button>
    <button class="delete_btn">Delete</button>
    <input class="favorites_checkbox" type="checkbox" value="favorite">
    </article>`;
  document
    .querySelector("#artists_overview_section")
    .insertAdjacentHTML("beforeend", artistHTML);
  document
    .querySelector("#artists_overview_section article:last-child .update_btn")
    .addEventListener("click", () => update_btn_clicked(artist));

  document
    .querySelector("#artists_overview_section article:last-child .delete_btn")
    .addEventListener("click", () => delete_btn_clicked(artist.id));

  //Checkbox for favorites! ...favorites: true/false.
}

function update_btn_clicked(artist) {
  console.log("update clicked");
  console.log(artist);
}

function delete_btn_clicked(id) {
  console.log("delete clicked");
  console.log(id);
}

////////////////////////// create new artist //////////////////////////

function new_artist_form_submitted(event) {
  event.preventDefault();
  console.log("new artist form submitted");

  const form = event.target;
  const name = form.name.value;
  const image = form.image.value;
  const birthdate = form.birthdate.value;
  const activeSince = form.activeSince.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const wesite = form.website.value;
  const shortDescription = form.description.value;

  createNewArtistsObject(
    name,
    image,
    birthdate,
    activeSince,
    genres,
    labels,
    wesite,
    shortDescription
  );
}

function createNewArtistsObject(
  name,
  image,
  birthdate,
  activeSince,
  genres,
  labels,
  website,
  shortDescription
) {
  const newArtistObject = {
    id: generateNewId(),
    name,
    image,
    birthdate,
    activeSince,
    genres,
    labels,
    website,
    shortDescription,
  };

  //* Bedre navngivning...
  uploadNewUser(newArtistObject);
  //Skal vi
}

async function uploadNewUser(artistForUpdating) {
  const artistJson = JSON.stringify(artistForUpdating);
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    body: artistJson,
    headers: { "Content-Type": "application/JSON" },
  });
  if (response.ok) {
    // if success, update the users grid
    // artists.push(newArtistObject);
    updateAritstsGrid();
   
    // and scroll to top
    // scrollToTop();
  }
}

function generateNewId() {
  return new Date().getTime();
}
