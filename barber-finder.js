function findBarbers() {
  const locationInput = document.getElementById("location").value;

  if (!locationInput) {
    alert("Please enter a location.");
    return;
  }

  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: locationInput }, (results, status) => {
    if (status === "OK") {
      const userLocation = results[0].geometry.location;
      searchNearbyBarbers(userLocation);
    } else {
      alert("Location not found. Try again.");
    }
  });
}

function searchNearbyBarbers(location) {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 14,
  });

  const request = {
    location: location,
    radius: "5000", // 5km radius
    type: ["hair_care"], // Google Places API category for barbershops
    keyword: "barber shop",
  };

  const service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      displayResults(results);
    } else {
      alert("No barber shops found nearby.");
    }
  });
}

function displayResults(places) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<h2>Top Barber Shops Near You:</h2>";

  places.forEach((place) => {
    const placeElement = document.createElement("div");
    placeElement.innerHTML = `<strong>${place.name}</strong> - Rating: ${place.rating || "N/A"}`;
    resultsDiv.appendChild(placeElement);
  });
}

