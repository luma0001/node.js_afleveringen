"use strict";

import { fetchArtists } from "./restFunctions.js";

window.addEventListener("load", initApp);

////////////////////////// global variables //////////////////////////
const endpoint = "http://localhost:3000";
let artists;
let selectedArtist;

function initApp() {
  activateClickEvents();
  displayAllArtists();
}

function activateClickEvents() {
  //The submit button for create new artist
  document
    .querySelector("#create_artist_form")
    .addEventListener("submit", new_artist_form_submitted);
  //The submit button for update aritst
  document
    .querySelector("#update_arist_form")
    .addEventListener("submit", update_artists_form_submitted);
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

////////////////////////// create artist functions //////////////////////////

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
  postNewUser(newArtistObject);
  //Skal vi
}

function generateNewId() {
  return new Date().getTime();
}

async function postNewUser(artistForUpdating) {
  const artistJson = JSON.stringify(artistForUpdating);
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    body: artistJson,
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    // if success, update the users grid
    // artists.push(newArtistObject);
    updateAritstsGrid();

    // and scroll to top
    // scrollToTop();
  }
}

////////////////////////// update related functions //////////////////////////

function update_btn_clicked(artist) {
  console.log("update clicked");
  console.log(artist);
  updateArtistForm(artist);
}

function updateArtistForm(artist) {
  selectedArtist = artist;
  document.querySelector("#aritst_update_name").value = artist.name;
  document.querySelector("#aritst_update_image_link").value = artist.image;
  document.querySelector("#aritst_update_birthdate").value = artist.birthdate;
  document.querySelector("#aritst_update_active_since").value =
    artist.activeSince;
  document.querySelector("#aritst_update_genres").value = artist.genres;
  document.querySelector("#aritst_update_lables").value = artist.labels;
  document.querySelector("#aritst_update_website").value = artist.website;
  document.querySelector("#aritst_update_description").value =
    artist.shortDescription;

  //...den skal ikke altid være aktiv jo....
  async function putUpdatedArtist() {
    // const updatedArtist = 
    const promise = await fetch(`${endpoint}/artist/${id}`, {
      method: "PUT",
      header: { "Content-Type": "application/json" },
      body: //updatedArtist??,
    });
  }
}

function update_artists_form_submitted(event) {
  event.preventDefault();

  const updateForm = event.target;
  selectedArtist.name = updateForm.name.value;
  selectedArtist.image = updateForm.image.value;
  selectedArtist.birthdate = updateForm.birthdate.value;
  selectedArtist.activeSince = updateForm.activeSince.value;
  selectedArtist.genres = updateForm.genres.value;
  selectedArtist.labels = updateForm.labels.value;
  selectedArtist.website = updateForm.website.value;
  selectedArtist.shortDescription = updateForm.description.value;

  console.log(updateForm);
  console.log("artists updated");
  console.log(selectedArtist);
}

////////////////////////// delete related functions //////////////////////////

function delete_btn_clicked(id) {
  console.log("delete clicked");
  console.log(id);
  deleteArtist(id);
}

async function deleteArtist(id) {
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    updateAritstsGrid();
  }
}
