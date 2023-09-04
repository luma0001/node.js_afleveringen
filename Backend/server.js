import express from "express";
import { request } from "http";
// import http from "node.http";

// const httpApp = http.createServer((request, response) => {
// if(request.url === "/" && response.method === GET){}});

const app = express();
app.use(express.json());

const artists = [
  {
    id: 1,
    name: "James Brown",
    birthdate: "1933-05-03",
    activeSince: "1954",
    genres: ["soul", "R&B", "funk"],
    labels: [
      "Federal",
      "King",
      "Smash",
      "People",
      "Polydor",
      "TK",
      "Scotti",
      "Bros",
      "Mercury",
      "Republic",
      "Bros",
      "UMe",
      "A&M",
    ],
    website: "www.jamesbrow.com",
    image:
      "https://cdn.britannica.com/34/197534-050-83C616C4/James-Brown-1991.jpg",
    shortDescription:
      "James Brown was and American musician. He was known as 'the grandfather of soul' and 'the hardest working man in show business'. James died 2006.",
  },
  {
    id: 2,
    name: "James Brown",
    birthdate: "1933-05-03",
    activeSince: "1954",
    genres: ["soul", "R&B", "funk"],
    labels: [
      "Federal",
      "King",
      "Smash",
      "People",
      "Polydor",
      "TK",
      "Scotti",
      "Bros",
      "Mercury",
      "Republic",
      "Bros",
      "UMe",
      "A&M",
    ],
    website: "www.jamesbrow.com",
    image:
      "https://cdn.britannica.com/34/197534-050-83C616C4/James-Brown-1991.jpg",
    shortDescription:
      "James Brown was and American musician. He was known as 'the grandfather of soul' and 'the hardest working man in show business'. James died 2006.",
  },
];

app.get("/", (request, response) => {
  response.json("Here is something");
});

app.get("/artists", (request, response) => {
  response.json(artists);
});

// app.get("/favorites", (request, response) => {
//   response.json("GET FAVORITES");
// });

app.post("/artists", (request, response) => {
  const body = request.body;
  console.log(body);
  body.id = new Date().getDate();
  artists.push(body);
  response.json(artists);
});

// app.post("/favorites", (request, response) => {
//   response.json("POST FAVORITES");
// });

app.put("/artists/:artistId", (request, response) => {
  const id = Number(request.params.artistId);
  console.log(id);
  const formerArtist = artists.find((artist) => artist.id === id);
  console.log(formerArtist);
  const body = request.body;
  console.log(body);

  formerArtist.name = body.name;

  response.json(artists);
});

// app.put("/favorites", (request, response) => {
//   response.json("PUT FAVORITES");
// });

// app.delete("/artists", (request, response) => {
//   response.json("DELETE ARTISTS");
// });

// app.delete("/favorites", (request, response) => {
//   response.json("GET FAVORITES");
// });

app.listen(3000, () => {
  console.log("Det hele køre og spiller!");
});
