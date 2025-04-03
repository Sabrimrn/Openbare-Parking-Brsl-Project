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
*document.getElementById("search-input") (lijn: 66).
*document.querySelector("header h1") (lijn: 214 in functie applyLanguage).
Elementen manipuleren:
*Het toevoegen van parkeerkaartjes in displayParkings() via insertAdjacentHTML() (lijn: 127).
Events aan elementen koppelen:
*Klik event op de zoekknop: document.getElementById("search-btn").addEventListener("click") (lijn: 65).

2. Modern JavaScript
Gebruik van constanten:
*const API_URL om de API URL te bewaren (lijn: 5) .
*const map om de kaart te initialiseren(lijn: 8).

Template literals:
*Gebruikt in de bindPopup() voor popup-informatie (lijn: 53).

Iteratie over arrays:
*data.forEach() in updateMarkers() om markers toe te voegen(lijn: 48).

Array methodes:
*parkings.filter() voor de zoekfunctie (lijn: 73) .
*parkings.sort() voor de sorteerfunctie(lijn: 89).

Arrow functions:
*Bij filtering: parking => (parking.fields.name_nl || "").toLowerCase().includes(query)(lijn: 73).

Operator:
*In updateMarkers() om te controleren op lege gegevens: parking.fields.name_nl || "Onbekend"(lijn: 54).

Callback functions:
*Eventlisteners zoals in addEventListener("click", (e) => {...})(lijn: 65).

Promises:
*Gebruikt bij fetchParkingData() voor het ophalen van data met fetch(lijn: 20) .

Async & Await:
*In fetchParkingData() om data op te halen (lijn: 20).
*In updateMarkers() en clearMarkers() om markers bij te werken(lijn: 41 en 45) .

Observer API:
*Eventlisteners observeren interacties, zoals met de donkere modus (document.getElementById("theme-switcher").addEventListener("change")) (lijn: 168) .

3. Data & API
*Fetch om data op te halen:
*Geïmplementeerd in fetchParkingData() via fetch() en JSON verwerking(lijn: 21 en 22).

JSON manipuleren en weergeven:
*Data wordt geparsed via response.json() (lijn: 22).
*JSON wordt verwerkt en weergegeven in displayParkings() (lijn:141).

4. Opslag & Validatie
*Formulier validatie:
*Controleer of parkings leeg is bij zoekopdrachten (lijn: 68).

Gebruik van LocalStorage:
*Opslag van favorieten in addToFavorites() met localStorage.setItem() (lijn: 139).
*Opslag van gebruikersvoorkeuren zoals donkere modus (lijn: 154).

5. Styling & Layout
*Basis HTML layout:
*De applicatie gebruikt een grid-layout voor de kaartjes en kaart (display: grid in CSS).

Basis CSS:
*Professionele styling voor knoppen en kaartjes, inclusief hover-effecten.

Gebruiksvriendelijke elementen:
*Favorietenknoppen hebben animaties bij hover (favorite-btn in CSS).

Installatiehandleiding:
Volg deze stappen om de applicatie op jouw computer te installeren en te gebruiken:

Clone het repository Download de broncode van het project naar jouw computer door het volgende commando te gebruiken in je terminal:
bash
git clone [JOUW-REPOSITORY-LINK]
Zorg ervoor dat je de link vervangt door de URL van jouw GitHub-repository.

Navigeer naar het project Ga naar de map waar de bestanden zijn opgeslagen:

bash
cd [NAAM-VAN-JOUW-MAP]
Open het project in een editor Gebruik een teksteditor zoals Visual Studio Code om de code te bekijken en aan te passen. Typ bijvoorbeeld:

bash
code .
Start de applicatie Open het bestand index.html in jouw standaardbrowser door erop te dubbelklikken. Dit zal jouw applicatie starten.

Screenshots:
![Screenshot 2025-04-03 235435](https://github.com/user-attachments/assets/8b81daa0-7e81-4374-aeef-f31e8d38efba)
![Screenshot 2025-04-03 235452](https://github.com/user-attachments/assets/2d6c1822-38da-4503-92a0-8a9c81a24c7a)
![Screenshot 2025-04-03 235513](https://github.com/user-attachments/assets/d059693a-8192-44b4-a73e-298762f1dced)

Gebruikte bronnen:
*opendata.brussels API
*Leaflet.js
*HTML en CSS documentatie
*Copilot (AI)
*W3schools
*Javascript.info
*Google
*Dynamic Web Modules

Teamverdeling:
Sabri:
Dataverzameling & -weergave
Interactiviteit
CSS
Mission statement
Helft van User Stories
Helft van Risico Analyse
Product backlog 1 april

Sorena:
Personalisatie
Gebruikerservaring
HTML
Helft van User Stories
Helft van Risico Analyse
Product backlog 2,3,4 april
