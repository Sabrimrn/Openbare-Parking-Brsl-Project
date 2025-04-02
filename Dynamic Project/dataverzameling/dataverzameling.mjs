// DOM manipulatie: Elementen selecteren
const parkingTable = document.querySelector("#parking-table tbody");
const searchInput = document.querySelector("#search");
const searchButton = document.querySelector("#search-btn");
// Globale variabele om parkeerdata op te slaan
let parkings = []; 


// Gebruik van constanten en fetch om data op te halen
const API_URL = "https://opendata.brussels.be/api/records/1.0/search/?dataset=bruxelles_parkings_publics&rows=20";

searchButton.addEventListener("click", () => {
  const searchQuery = searchInput.value.trim().toLowerCase();
  fetchParkingData(searchQuery);
});
  

// Maak de kaart aan
const map = L.map("map").setView([50.8503, 4.3517], 12); // Coördinaten van Brussel

// Voeg een basemap toe
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Voeg een voorbeeldmarker toe (later vervangen door dynamische markers)
L.marker([50.8503, 4.3517]).addTo(map).bindPopup("Brussel - Centrum");


// Parkeergegevens ophalen
async function fetchParkingData() {
    const response = await fetch(API_URL);
    const data = await response.json();
    const parkings = data.records;
    updateMarkers(parkings); // Voeg markers toe bij het ophalen van data
}

  // Roep de functie aan om data op te halen en markers toe te voegen
  fetchParkingData();

  function clearMarkers() {
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
   console.log(data); // Controleer wat de API retourneert

  }
  // Functie om markers dynamisch bij te werken op de kaart
function updateMarkers(parkings) {
    // Wis eerst alle bestaande markers van de kaart
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
  
    // Voeg nieuwe markers toe op basis van de gegeven data
    parkings.forEach(parking => {
      if (parking.fields.geo_point_2d) {
        const [lat, lon] = parking.fields.geo_point_2d; // Haal coördinaten op
        L.marker([lat, lon])
          .addTo(map) // Voeg de marker toe aan de kaart
          .bindPopup(`
            <b>${parking.fields.name_nl || "Onbekend"}</b><br>
            Adres: ${parking.fields.adres_ || "Geen adres"}.<br>
            Capaciteit: ${parking.fields.capacity || "Onbekend"}<br>
            Type: ${parking.fields.type || "Onbekend"}<br>
            Status: ${parking.fields.status || "Onbekend"}
          `);
      }
    });
  }

//Filter
document.getElementById("type-filter").addEventListener("change", (e) => {
    const selectedType = e.target.value;
  
    if (!parkings.length) {
      console.error("Geen parkeerdata geladen.");
      return;
    }
  
    const filteredData = selectedType === "all"
      ? parkings
      : parkings.filter(parking => (parking.fields.type || "").toLowerCase() === selectedType.toLowerCase());
  
    updateMarkers(filteredData); // Markers bijwerken met gefilterde resultaten
  });  
  
//Zoekfunctie
document.getElementById("search-input").addEventListener("click", () => {
    const query = document.getElementById("search-input").value.toLowerCase();
  
    if (!parkings.length) {
      console.error("Geen parkeerdata geladen.");
      return;
    }
  
    const searchedData = parkings.filter(parking =>
      (parking.fields.name_nl || "").toLowerCase().includes(query)
    );
  
    updateMarkers(searchedData); // Markers bijwerken met zoekresultaten
  });  

//Sorteer  
document.getElementById("sort-option").addEventListener("change", (e) => {
    const sortOption = e.target.value;
  
    if (!parkings.length) {
      console.error("Geen parkeerdata geladen.");
      return;
    }
  
    const sortedData = [...parkings].sort((a, b) => {
      const capacityA = a.fields.capacity || 0;
      const capacityB = b.fields.capacity || 0;
  
      if (sortOption === "capacity-asc") return capacityA - capacityB;
      if (sortOption === "capacity-desc") return capacityB - capacityA;
      return 0;
    });
  
    updateMarkers(sortedData); // Markers bijwerken met gesorteerde resultaten
  });  

const parkingData = {
    "total_count": 28,
    "results": [
      {
        "name_fr": "Alhambra",
        "name_nl": "Alhambra",
        "adressee": "Boulevard Emile Jacqmain, 14 - 1000 Bruxelles",
        "adres_": "Emile Jacqmainlaan, 14 - 1000 Brussel",
        "geo_point_2d": { "lon": 4.3529899959104625, "lat": 50.852570002512216 },
        "operator_fr": "Interparking",
        "contact_mail": null,
        "contact_phone": "+32 2 549 58 11",
        "capacity": 191,
        "disabledcapacity": 0,
        "floors": 4,
        "maxwidth": -999,
        "maxheight": 2,
        "commune_gemeente": "Bruxelles - Brussel"
      },
      {
        "name_fr": "De Brouckère",
        "name_nl": "De Brouckère",
        "adressee": "Boulevard Anspach, 2 - 1000 Bruxelles",
        "adres_": "Anspachlaan, 2 - 1000 Brussel",
        "geo_point_2d": { "lon": 4.3521129959105656, "lat": 50.850916002512626 },
        "operator_fr": "Interparking",
        "contact_mail": null,
        "contact_phone": "+32 2 549 58 11",
        "capacity": 490,
        "disabledcapacity": 0,
        "floors": 3,
        "maxwidth": -999,
        "maxheight": 2,
        "commune_gemeente": "Bruxelles - Brussel"
      },
      {
        "name_fr":"Deux Portes",
        "name_nl":"Deux Portes",
        "adressee":"Boulevard de Waterloo, 2A - 1000 Bruxelles",
        "adres_":"Waterloolaan, 2A - 1000 Brussel",
        "geo_point_2d":{
        "lon":4.361332995906981,
        "lat":50.83860100251723
        },
        "operator_fr":"Interparking",
        "contact_mail":null,
        "contact_phone":"+32 2 549 58 11",
        "capacity":929,
        "disabledcapacity":32,
        "floors":6,
        "maxwidth":-999,
        "maxheight":1.9,
        "commune_gemeente":"Bruxelles - Brussel"
        },
        {
        "name_fr":"Grand Place",
        "name_nl":"Grote Markt",
        "adressee":"Rue du Marche aux Herbes, 104 - 1000 Bruxelles",
        "adres_":"Grasmarkt, 104 - 1000 Brussel",
        "geo_point_2d":{
        "lon":4.355165995909274,
        "lat":50.84660200251419
        },
        "operator_fr":"Interparking",
        "contact_mail":null,
        "contact_phone":"+32 2 549 58 11",
        "capacity":992,
        "disabledcapacity":20,
        "floors":8,
        "maxwidth":2.41,
        "maxheight":2,
        "commune_gemeente":"Bruxelles - Brussel"
        },
        {
        "name_fr":"P+R HEYSEL",
        "name_nl":"P+R HEYSEL",
        "adressee":"Avenue Impératrice Charlotte - 1020 Laeken",
        "adres_":"Keizerin Charlottelaan - 1020 Laken",
        "geo_point_2d":{
        "lon":4.335512995919604,
        "lat":50.89740100249731
        },
        "operator_fr":"Parking Brussels",
        "contact_mail":null,
        "contact_phone":null,
        "capacity":100,
        "disabledcapacity":-999,
        "floors":-999,
        "maxwidth":-999,
        "maxheight":2.1,
        "commune_gemeente":"Laeken - Laken"
        },
        {
        "name_fr":"Pacheco",
        "name_nl":"Pacheco",
        "adressee":"Boulevard Pachéco, 7 - 1000 Bruxelles",
        "adres_":"Pachecolaan, 7 - 1000 Brussel",
        "geo_point_2d":{
        "lon":4.362151995908143,
        "lat":50.85153700251356
        },
        "operator_fr":"Q-Park Belgium",
        "contact_mail":null,
        "contact_phone":"+32 2 711 17 00",
        "capacity":344,
        "disabledcapacity":0,
        "floors":1,
        "maxwidth":2.5,
        "maxheight":2.1,
        "commune_gemeente":"Bruxelles - Brussel"
        }
    ]
};
  
  // Selecteer de container waar dynamische blokken komen
  const parkingContainer = document.getElementById("parking-container");
  
  // Voeg dynamische parkeerkaartjes toe
  function displayParkings(data) {
    parkingContainer.innerHTML = ""; // Maak de container eerst leeg
  
    data.results.forEach(parking => {
      const card = `
        <div class="parking-card">
          <h3>${parking.name_nl}</h3>
          <p><strong>Adres:</strong> ${parking.adres_}</p>
          <p><strong>Postcode:</strong> ${parking.postcode}</p>
          <p><strong>Type:</strong> ${parking.type}</p>
          <p><strong>Status:</strong> ${parking.status}</p>
          <p><strong>Operator:</strong> ${parking.operator_fr || "Onbekend"}</p>
          <p><strong>Contact:</strong> ${parking.contact_phone || "Geen contact"}</p>
          <p><strong>Capaciteit:</strong> ${parking.capacity}</p>
          <p><strong>Gemeente:</strong> ${parking.commune_gemeente}</p>
        </div>
      `;
      parkingContainer.insertAdjacentHTML("beforeend", card);
    });
  }
  
  // Roep de functie aan om de data in te laden
  displayParkings(parkingData);
  

// Selecteer het tbody-element in de HTML
const tableBody = document.querySelector("#parking-table tbody");



  
  




