Dynamic Web Project: BrusselsExplorer

Projectbeschrijving:
BrusselsExplorer is een interactieve webapplicatie die gebruik maakt van de opendata.brussels API om openbare parkeerplaatsen in Brussel weer te geven. Gebruikers kunnen deze parkeerplaatsen sorteren, zoeken en opslaan in persoonlijke favorieten. De applicatie biedt een visueel aantrekkelijke en gebruiksvriendelijke interface, is responsief en behoudt gebruikersvoorkeuren zoals taal en thema tussen sessies.

Functionaliteiten:

Dataverzameling & weergave:
*Haal parkeerdata op van de opendata.brussels API.
*Toon een kaartweergave van parkeerlocaties met markers en details.
*Lijstweergave met minimaal 6 datapunten per locatie (naam, adres, capaciteit, type, status, contact).

Interactiviteit:
*Filter parkeerlocaties op zoekcriteria.
*Sorteer parkeerlocaties op capaciteit (oplopend/aflopend).
*Zoekfunctie om locaties op naam te vinden.

Personalisatie:
*Gebruikers kunnen parkeerlocaties opslaan als favorieten.
*Instellingen zoals donkere modus en taalvoorkeur worden opgeslagen.

Gebruikerservaring:
*Responsieve lay-out voor desktop en mobiel.
*Moderne styling en animaties.
*Gebruiksvriendelijke navigatie en duidelijke labels.

Gebruikte API
opendata.brussels API Endpoint: Openbare parkings in Brussel 
Deze API biedt informatie over openbare parkeerlocaties in Brussel, inclusief naam, adres, capaciteit, type en status.

Technische vereisten
Hier is een overzicht van waar en hoe elke technisch vereiste is geïmplementeerd:

1. DOM Manipulatie
Elementen selecteren:
*document.getElementById("search-input") (lijn: 36).
*document.querySelector("header h1") (lijn: 83 in functie applyLanguage).
Elementen manipuleren:
*Het toevoegen van parkeerkaartjes in displayParkings() via insertAdjacentHTML() (lijn: 116).
Events aan elementen koppelen:
*Klik event op de zoekknop: document.getElementById("search-btn").addEventListener("click") (lijn: 35).

2. Modern JavaScript
Gebruik van constanten:
*const API_URL om de API URL te bewaren (lijn: 5).
*const map om de kaart te initialiseren (lijn: 8).

Template literals:
*Gebruikt in de bindPopup() voor popup-informatie (lijn: 61).
*Ook in displayParkings() voor het genereren van kaartjes (lijn: 119).

Iteratie over arrays:
*data.forEach() in updateMarkers() om markers toe te voegen (lijn: 57).

Array methodes:
*parkings.filter() voor de zoekfunctie (lijn: 37).
*parkings.sort() voor de sorteerfunctie (lijn: 51).

Arrow functions:
*Bij filtering: parking => (parking.fields.name_nl || "").toLowerCase().includes(query) (lijn: 38).
*Conditional (ternary) operator:
*In updateMarkers() om te controleren op lege gegevens: parking.fields.name_nl || "Onbekend" (lijn: 64).

Callback functions:
*Eventlisteners zoals in addEventListener("click", (e) => {...}) (lijn: 123).

Promises:
*Gebruikt bij fetchParkingData() voor het ophalen van data met fetch() (lijn: 23).

Async & Await:
*In fetchParkingData() om data op te halen (lijn: 23).
*In updateMarkers() en clearMarkers() om markers bij te werken (lijn: 51 en 43).

Observer API:
*Eventlisteners observeren interacties, zoals met de donkere modus (document.getElementById("theme-switcher").addEventListener("change")) (lijn: 96).

3. Data & API
*Fetch om data op te halen:
*Geïmplementeerd in fetchParkingData() via fetch() en JSON verwerking (lijn: 23).

JSON manipuleren en weergeven:
*Data wordt geparsed via response.json() (lijn: 24).
*JSON wordt verwerkt en weergegeven in displayParkings() (lijn: 119).

4. Opslag & Validatie
*Formulier validatie:
*Controleer of parkings leeg is bij zoekopdrachten (lijn: 37).

Gebruik van LocalStorage:
*Opslag van favorieten in addToFavorites() met localStorage.setItem() (lijn: 140).
*Opslag van gebruikersvoorkeuren zoals donkere modus (lijn: 97).

5. Styling & Layout
*Basis HTML layout:
*De applicatie gebruikt een grid-layout voor de kaartjes en kaart (display: grid in CSS).

Basis CSS:
*Professionele styling voor knoppen en kaartjes, inclusief hover-effecten.

Gebruiksvriendelijke elementen:
*Favorietenknoppen hebben animaties bij hover (favorite-btn in CSS).


