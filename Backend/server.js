import express from "express";
import cors from "cors";
import fs from "fs/promises";
import { request } from "http";

// const httpApp = http.createServer((request, response) => {
// if(request.url === "/" && response.method === GET){}});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  response.json("Here is something");
});

app.get("/artists", async (request, response) => {
  const artistsJSON = await fs.readFile("artists.json");
  const artists = await JSON.parse(artistsJSON);
  // console.log(artistList);
  response.json(artists);
});

app.get("/artists/:id", async (request, response) => {
  const artistsJSON = await fs.readFile("artists.json");
  const artists = await JSON.parse(artistsJSON);
  const id = Number(request.params.id);
  const artist = artists.find((artistDude) => artistDude.id === id);
  console.log(artist);

  if (!artist) {
    response.status(404).json("The artist id was not found!");
  } else {
    response.json(artist);
  }

  // if (!result) {
  //   response.status(404);
  //   {
  //     response.json("Error!");
  //   }
  // } else {
  //   response.json(artist);
  // }
});

// app.get("/favorites", (request, response) => {
//   response.json("GET FAVORITES");
// });

app.post("/artists", async (request, response) => {
  const artistsJSON = await fs.readFile("artists.json");
  const artists = await JSON.parse(artistsJSON);
  const newAritst = request.body;
  newAritst.id = new Date().getTime();
  console.log(newAritst);
  artists.push(newAritst);
  console.log(artists);
  fs.writeFile("artists.json", JSON.stringify(artists));
  response.json(artists);
});

// app.post("/favorites", (request, response) => {
//   response.json("POST FAVORITES");
// });

app.put("/artists/:artistId", async (request, response) => {
  const artistsJSON = await fs.readFile("artists.json");
  const artists = await JSON.parse(artistsJSON);
  const id = Number(request.params.artistId);
  console.log(id);
  const formerArtist = artists.find((artist) => artist.id === id);
  console.log(formerArtist);
  const body = request.body;
  console.log(body);

  formerArtist.name = body.name;
  formerArtist.birthdate = body.birthdate;
  formerArtist.activeSince = body.activeSince;
  formerArtist.genres = body.genres;
  formerArtist.labels = body.labels;
  formerArtist.website = body.website;
  formerArtist.image = body.image;
  formerArtist.shortDescription = body.shortDescription;

  if (!formerArtist) {
    response.status(404).json("Error: User does not exist");
  } else {
    fs.writeFile("artists.json", JSON.stringify(artists));
    response.json(artists);
  }
});

// app.put("/favorites", (request, response) => {
//   response.json("PUT FAVORITES");
// });

app.delete("/artists/:artistId", async(request, response) => {
  
  const artistsJSON = await fs.readFile("artists.json");
  const artists = await JSON.parse(artistsJSON);
  
  const id = Number(request.params.artistId);
  const artist = artists.find((artist) => artist.id === id);

  artists.splice(artists.indexOf(artist), 1);

  if (!artist) {
    response.status(404).json("Error: user does not exists");
  } else {
  
    fs.writeFile("artists.json", JSON.stringify(artists))
    response.json(artists);
  }
});

// app.delete("/favorites", (request, response) => {
//   response.json("GET FAVORITES");
// });

app.listen(3000, () => {
  console.log("Det hele køre og spiller!");
});
