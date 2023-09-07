import {
  new_artist_form_submitted,
  update_artists_form_submitted,
  sortBySlector,
  filterBySelector,
} from "./main.js";

import { favorites_toggle_btn_clicked } from "./toggleView.js";

function activateClickEvents() {
  //The submit button for create new artist
  document
    .querySelector("#create_artist_form")
    .addEventListener("submit", new_artist_form_submitted);
  //The submit button for update aritst
  document
    .querySelector("#update_arist_form")
    .addEventListener("submit", update_artists_form_submitted);

  document
    .querySelector("#favorites_toggle")
    .addEventListener("click", favorites_toggle_btn_clicked);
}

function activateChangeEvents() {
  document
    .querySelector("#sort_by_selector")
    .addEventListener("change", sortBySlector);
  document
    .querySelector("#filter_by_selector")
    .addEventListener("change", filterBySelector);
}

export { activateClickEvents, activateChangeEvents };
