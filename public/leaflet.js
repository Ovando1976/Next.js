<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Africa Population Map</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <style>
    #map { height: 600px; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    var map = L.map('map').setView([0, 20], 3); // Center the map on Africa

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Example: Adding a population marker for Nigeria
    var marker = L.marker([9.0820, 8.6753]).addTo(map)
      .bindPopup('Nigeria: Population - 200M')
      .openPopup();
  </script>
</body>
</html>

