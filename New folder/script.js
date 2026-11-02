const WORLD_URL = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

const loadStatus = document.getElementById("loadStatus");
const hoverStatus = document.getElementById("hoverStatus");
const keyStatus = document.getElementById("keyStatus");
const sizeStatus = document.getElementById("sizeStatus");
const mapError = document.getElementById("mapError");

const modal = document.getElementById("details");
const detailsTitle = document.getElementById("detailsTitle");
const detailsBody = document.getElementById("detailsBody");
const closeButton = document.getElementById("closeDetails");

const map = L.map("map", { zoomSnap: 0.25, maxBoundsViscosity: 1 });
map.fitBounds([[-56, -170], [80, 180]]);
map.setMinZoom(map.getZoom());
map.setMaxBounds([[-85, -190], [85, 190]]);

const normalStyle = { color: "#8fa6b8", weight: 0.6, fillColor: "#f8fafb", fillOpacity: 1 };
const dataStyle = { color: "#8fa6b8", weight: 0.6, fillColor: "#a9d5d1", fillOpacity: 1 };
const hoverStyle = { color: "#12263a", weight: 2, fillColor: "#f6cd78", fillOpacity: 1 };

function findCountry(name) {
  return COUNTRIES.find(function (country) {
    return country.name === name;
  });
}

function styleCountry(feature) {
  return findCountry(feature.properties.name) ? dataStyle : normalStyle;
}

function highlight(event) {
  const layer = event.target;
  layer.setStyle(hoverStyle);
  layer.bringToFront();
  layer.getElement().classList.add("pop");
  hoverStatus.textContent = "Pointer over: " + layer.feature.properties.name;
}

function removeHighlight(event) {
  const layer = event.target;
  geoLayer.resetStyle(layer);
  layer.getElement().classList.remove("pop");
  hoverStatus.textContent = "Pointer over: none";
}

function showDetails(event) {
  const name = event.target.feature.properties.name;
  const country = findCountry(name);
  detailsTitle.textContent = name;

  if (!country) {
    detailsBody.innerHTML = '<p class="note">Details for this country have not been added yet.</p>';
  } else {
    detailsBody.innerHTML = `
      <img class="flag" src="https://flagcdn.com/w320/${country.code}.png" alt="Flag of ${country.name}">
      <dl>
        <dt>Capital City</dt><dd>${country.capital}</dd>
        <dt>Region</dt><dd>${country.region}</dd>
        <dt>Population</dt><dd>${country.population.toLocaleString()} people</dd>
        <dt>Area</dt><dd>${country.area.toLocaleString()} km²</dd>
        <dt>Currency</dt><dd>${country.currency}</dd>
        <dt>Languages</dt><dd>${country.languages}</dd>
        <dt>Time Zone</dt><dd>${country.timeZone}</dd>
        <dt>Calling Code</dt><dd>${country.callingCode}</dd>
        <dt>Driving Side</dt><dd>${country.drivingSide}</dd>
        <dt>Famous For</dt><dd>${country.famousFor}</dd>
        <dt>Fun Fact</dt><dd>${country.fact}</dd>
      </dl>
    `;
  }

  modal.hidden = false;
}

function onEachCountry(feature, layer) {
  layer.bindTooltip(feature.properties.name, { sticky: true });
  layer.on("mouseover", highlight);
  layer.on("mouseout", removeHighlight);
  layer.on("click", showDetails);
}

let geoLayer;

fetch(WORLD_URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (worldData) {
    geoLayer = L.geoJSON(worldData, {
      filter: function (feature) {
        return feature.properties.name !== "Antarctica";
      },
      style: styleCountry,
      onEachFeature: onEachCountry
    }).addTo(map);
  })
  .catch(function () {
    mapError.hidden = false;
  });

function closeDetails() {
  modal.hidden = true;
}

closeButton.addEventListener("click", closeDetails);

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeDetails();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeDetails();
  }
});

document.addEventListener("keyup", function (event) {
  keyStatus.textContent = "Last key released: " + (event.key === " " ? "Space" : event.key);
});

function showWindowSize() {
  sizeStatus.textContent = "Window: " + window.innerWidth + " x " + window.innerHeight;
}

window.addEventListener("resize", showWindowSize);

window.addEventListener("load", function () {
  loadStatus.textContent = "Page loaded";
  showWindowSize();
});
