"use strict";

// tænk over hvordan det bedst kan skildes ad
// Data v. datahåmdtering. Fejl håndtering, caching af data, sortering/hjælp. Visning af atists mm. Eventlisteners mm.
//Vores funktioner skal være fri for states - applikationen som helhed skal ikke være statest per say.
//Hvad kan kørrer uafhængit - lad os dele det op i mindre bidder på baggrund af dette...

import {
  fetchArtists,
  postNewUser,
  putUpdatedArtist,
  deleteArtist,
} from "./restFunctions.js";

import { activateClickEvents, activateChangeEvents } from "./events.js";

import { viewFavorites } from "./toggleView.js";

window.addEventListener("load", initApp);

////////////////////////// global variables //////////////////////////
let artists;
let selectedArtist;
// let viewFavorites = false;

function initApp() {
  activateClickEvents();
  activateChangeEvents();
  displayAllArtists();
}

// function favorites_toggle_btn_clicked() {
//   toggleFavoriteView();
//   changeToggleFavoriteBtn();
//   updateArtistsGrid();
// }

// function toggleFavoriteView() {
//   if (viewFavorites === false) {
//     viewFavorites = true;
//   } else {
//     viewFavorites = false;
//   }
// }

// function changeToggleFavoriteBtn() {
//   if (viewFavorites === false) {
//     document.querySelector("#favorites_toggle").textContent = "Show Favorites";
//   } else {
//     document.querySelector("#favorites_toggle").textContent = "Show All";
//   }
// }

////////////////////////// helper - sort - variables //////////////////////////

function sortBySlector(event) {
  const sortSelector = event.target.value;
  console.log(sortSelector);
  if (sortSelector === "names") {
    artists.sort((high, low) => high.name.localeCompare(low.name));
  } else if (sortSelector === "longestActive") {
    artists.sort((high, low) => high.activeSince - low.activeSince);
  } else if (sortSelector === "recentlyActive") {
    artists.sort((high, low) => low.activeSince - high.activeSince);
  } else if (sortSelector === "birthdates") {
    artists.sort((high, low) => high.activeSince - low.activeSince);
  }
  updateArtistsGrid();
}

async function filterBySelector(event) {
  const filterSelector = event.target.value;

  // refresh list by fetching!
  await updateArtistsList();
  if (filterSelector !== "none") {
    artists = artists.filter(filterfunction);

    function filterfunction(artist) {
      for (const genre of artist.genres) {
        if (genre === filterSelector) {
          return artist;
        }
      }
    }
    console.table(artists);
    //Only DOM no fetch
    updateArtistsGrid();
  }
}

////////////////////////// Display related functions //////////////////////////

function displayAllArtists() {
  updateArtistsList();
  // updateAritstsGrid();
}

async function updateArtistsList() {
  artists = await fetchArtists();
  console.log(artists);
  console.log(typeof artists);
  updateArtistsGrid();
}

function updateArtistsGrid() {
  document.querySelector("#artists_overview_section").innerHTML = "";
  // artists.forEach(displayArtist);
  for (const artist of artists) {
    if (viewFavorites === true) {
      if (artist.isFavorite === true) {
        displayArtist(artist);
      }
    } else {
      displayArtist(artist);
    }
  }
}

function displayArtist(artist) {
  const artistHTML =
    /*html*/
    `
    <article class="artists_object">
    <img class="grid_img" src="${artist.image}"/>
    <p>Name: ${artist.name}</p>
    <p>Date of Birth: ${artist.birthdate}</p>
    <p>Active since: ${artist.activeSince}</p>
    Genres: ${artist.genres}
    Lables: ${artist.labels}
    <p>Website: ${artist.website}</p>
    <div>Description: ${artist.shortDescription}</div>
    <button class="update_btn">Update</button>
    <button class="delete_btn">Delete</button>
    <div class="mark_favorite_div">
    <button class="favorites_checkbox">Favorite</button>
     </div>
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

  document
    .querySelector(
      "#artists_overview_section article:last-child .favorites_checkbox"
    )
    .addEventListener("change", () => changeFavoriteSatus(artist));

  // try to style artists....fail
  if (artist.isFavorite === true) {
    console.log("fav artist");
    console.log(artist.name);
    // document.querySelector(".favorites_checkbox").checked;
    document
      .querySelector(".mark_favorite_div")
      .classList.add("favoriteMarked");
  }

  //changes the checkbox if the artists is marked as favorites

  //Checkbox for favorites! ...favorites: true/false.
}

function changeFavoriteSatus(artist) {
  // preventDefault();
  if (artist.isFavorite === false) {
    artist.isFavorite = true;
  } else {
    artist.isFavorite = false;
  }
  updateArtistFavoriteStatus(artist);
}

async function updateArtistFavoriteStatus(artist) {
  await putUpdatedArtist(artist);
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
    isFavorite: false,
  };

  //* Bedre navngivning...
  postNewUser(newArtistObject);
  //Skal vi
}

function generateNewId() {
  return new Date().getTime();
}

////////////////////////// update related functions //////////////////////////

function update_btn_clicked(artist) {
  console.log("update clicked");
  console.log(artist);
  updateArtistForm(artist);
}

function updateArtistForm(artist) {
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

  selectedArtist = artist;
  //...den skal ikke altid være aktiv jo....
}

async function update_artists_form_submitted(event) {
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

  await putUpdatedArtist(selectedArtist);
}

////////////////////////// delete related functions //////////////////////////

function delete_btn_clicked(id) {
  console.log("delete clicked");
  console.log(id);
  deleteArtist(id);
}

export {
  updateArtistsList,
  updateArtistsGrid,
  new_artist_form_submitted,
  update_artists_form_submitted,
  sortBySlector,
  filterBySelector,
};
