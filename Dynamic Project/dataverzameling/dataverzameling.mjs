// DOM manipulatie: Elementen selecteren
const parkingTable = document.querySelector("#parking-table tbody");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");
// Globale variabele om parkeerdata op te slaan
let parkings = []; 


// Gebruik van constanten en fetch om data op te halen
const API_URL = "https://opendata.brussels.be/api/records/1.0/search/?dataset=bruxelles_parkings_publics&rows=20";

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
    parkings = data.records;
    await updateMarkers(parkings); // Voeg markers toe bij het ophalen van data
    displayParkings({ results: parkings }); // Toon kaartjes onder de kaart
}

  // Roep de functie aan om data op te halen en markers toe te voegen
  fetchParkingData();

// Functie om markers te wissen
async function clearMarkers() {
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer); // Verwijder alleen markers
      }
    });
  }
  
  // Functie om markers dynamisch bij te werken op de kaart
  async function updateMarkers(data) {
    console.log(data); // Controleer of data gevuld is
  
    // Wacht totdat alle markers zijn gewist
    await clearMarkers();
  
    // Voeg nieuwe markers toe op basis van de gegeven data
    data.forEach(parking => {
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
  
//Zoekfunctie
document.getElementById("search-btn").addEventListener("click", () => {
    const query = document.getElementById("search-input").value.toLowerCase();
  
    if (!parkings.length) {
      console.error("Geen parkeerdata geladen.");
      return;
    }
  
    const searchedData = parkings.filter(parking =>
      (parking.fields.name_nl || "").toLowerCase().includes(query)
    );
    clearMarkers();
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

    displayParkings({ results: sortedData }); // Update de kaartjes onder de kaart
  }); 
  
  // Selecteer de container waar dynamische blokken komen
  const parkingContainer = document.getElementById("parking-container");
  
  // Voeg dynamische parkeerkaartjes toe
  function displayParkings(data) {
    console.log("displayParkings wordt aangeroepen!", data); // Controleer of deze wordt uitgevoerd
    parkingContainer.innerHTML = ""; // Maak de container eerst leeg

    if (!data.results || data.results.length === 0) {
        console.error("Geen resultaten om weer te geven.");
        return;
      }
  
      data.results.forEach(parking => {
        const card = `
          <div class="parking-card">
            <h3>${parking.fields?.name_nl || "Onbekend"}</h3>
            <p><strong>Adres:</strong> ${parking.fields?.adres_ || "Geen adres"}</p>
            <p><strong>Capaciteit:</strong> ${parking.fields?.capacity || "Onbekend"}</p>
            <p><strong>Type:</strong> ${parking.fields?.type || "Onbekend"}</p>
            <p><strong>Status:</strong> ${parking.fields?.status || "Onbekend"}</p>
            <p><strong>Contact:</strong> ${parking.fields?.contact_phone || "Geen contact"}</p>
            <p><strong>Gemeente:</strong> ${parking.fields?.commune_gemeente || "Geen gemeente"}</p>
            <button class="favorite-btn" data-id="${parking.fields?.name_nl}">Toevoegen aan favorieten</button>
          </div>
        `;
        parkingContainer.insertAdjacentHTML("beforeend", card);
      });

      // Eventlistener voor de favorietknoppen
    document.querySelectorAll(".favorite-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      const parkingName = e.target.dataset.id;
      addToFavorites(parkingName);
    });
  });
}

// Favorieten toevoegen aan LocalStorage
function addToFavorites(parkingName) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(parkingName)) {
    favorites.push(parkingName);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${parkingName} toegevoegd aan favorieten!`);
  } else {
    alert(`${parkingName} staat al in je favorieten!`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Pagina volledig geladen!");
  
    // 1. Controleer en pas donkere modus toe
    const darkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (darkMode) {
      document.body.classList.add("dark-theme");
    }
  
    // 2. Controleer en pas taalvoorkeur toe
    const language = localStorage.getItem("language");
    if (language) {
      document.getElementById("language-select").value = language;
      applyLanguage(language); // Zorg dat taal direct wordt toegepast
    }
  
    // 3. Voeg eventlisteners toe
    document.getElementById("theme-switcher").addEventListener("change", (e) => {
      const isDarkMode = e.target.checked;
      document.body.classList.toggle("dark-theme", isDarkMode);
      localStorage.setItem("darkMode", isDarkMode);
    });
  
    document.getElementById("language-select").addEventListener("change", (e) => {
      const selectedLanguage = e.target.value;
      localStorage.setItem("language", selectedLanguage);
      applyLanguage(selectedLanguage);
    });
});
  
function applyLanguage(language) {
    const translations = {
      nl: {
        title: "Openbare Parkings in Brussel",
        searchPlaceholder: "Zoek parkeerplaats...",
        sortOption: "Sorteer op",
        darkModeLabel: "Donkere modus:",
        languageLabel: "Taal:",
      },
      en: {
        title: "Public Parking in Brussels",
        searchPlaceholder: "Search for a parking spot...",
        sortOption: "Sort by",
        darkModeLabel: "Dark mode:",
        languageLabel: "Language:",
      },
    };

    // Haal de vertaling op gebaseerd op de taal
    const selectedTranslation = translations[language];

    if (!selectedTranslation) {
        console.error("Geen vertaling gevonden voor de geselecteerde taal:", language);
        return;
    }

    // Pas de vertaling toe op de interface
    document.querySelector("header h1").textContent = selectedTranslation.title;
    document.getElementById("search-input").placeholder = selectedTranslation.searchPlaceholder;
    document.querySelector("#sort-option").options[0].textContent = selectedTranslation.sortOption;
    document.querySelector("label[for='theme-switcher']").textContent = selectedTranslation.darkModeLabel;
    document.querySelector("label[for='language-select']").textContent = selectedTranslation.languageLabel;

    console.log("Vertaling toegepast:", selectedTranslation); // Controleer de toegepaste vertaling
}

  
  // Roep de functie aan om de data in te laden
  displayParkings(parkingData);
  

// Selecteer het tbody-element in de HTML
const tableBody = document.querySelector("#parking-table tbody");



  
  




