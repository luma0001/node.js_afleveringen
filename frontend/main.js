"use strict";

import { fetchArtists } from "./restFunctions.js";

window.addEventListener("load", initApp);

let artists;

function initApp() {
  displayAllArtists();
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
    <div class="artists_object">
    "image"
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
    </div>`;
  document
    .querySelector("#artists_overview_section")
    .insertAdjacentHTML("beforeend", artistHTML);
  // document
  //   .querySelector("#artists_overview_section div:last-child")
  //   .addEventListener("click", update_btn_clicked());
}

function getLables(artist) {
  //loop on all possible lables...
}
