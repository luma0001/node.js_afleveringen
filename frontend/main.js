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
}

function update_btn_clicked(artist) {
  console.log("update clicked");
  console.log(artist);
}

function delete_btn_clicked(id) {
  console.log("delete clicked");
  console.log(id);
}
