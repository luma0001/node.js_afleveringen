import { updateArtistsGrid } from "./main.js";

let viewFavorites = false;

function favorites_toggle_btn_clicked() {
  toggleFavoriteView();
  changeToggleFavoriteBtn();
  updateArtistsGrid();
}

function toggleFavoriteView() {
  if (viewFavorites === false) {
    viewFavorites = true;
  } else {
    viewFavorites = false;
  }
}

function changeToggleFavoriteBtn() {
  if (viewFavorites === false) {
    document.querySelector("#favorites_toggle").textContent = "Show Favorites";
  } else {
    document.querySelector("#favorites_toggle").textContent = "Show All";
  }
}

export { viewFavorites, favorites_toggle_btn_clicked };
