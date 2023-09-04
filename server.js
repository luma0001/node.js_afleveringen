import express from "express";
// import http from "node.http";

// const httpApp = http.createServer((request, response) => {
// if(request.url === "/" && response.method === GET){}});

const app = express();
use(express());

function createPerson(name, email) {
  const newPerson = {
    name,
    email,
  };
}

function printPerson(person) {
  console.log(person);
}

const atrists = [
  {
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
    image: "imagfile",
    shortDescription: "James Brown was and American musician. He was known as 'the grandfather of soul' and 'the hardest working man in show business'. James died 2006.",
  },
  

];

app.get("/atrists", (request, response) => {
  response.send("message");
});

app.listen(3000, () => {
  console.log("Det hele køre og spiller!");
});
