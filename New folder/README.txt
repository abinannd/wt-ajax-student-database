COUNTRY EXPLORER
================

A world map built with HTML, CSS and JavaScript to practise DOM event handling.

HOW IT WORKS
- Hover over a country: it is highlighted and pops out slightly, and its name follows the pointer.
- Click a country to see its details. The 16 countries shaded teal have full details; the others show a short message.
- Press Esc, click outside the box, or press the x button to close the details.
- Scroll to zoom the map and drag to move it.

EVENTS USED
- Mouse: mouseover, mouseout, click
- Keyboard: keydown (Escape), keyup (footer status)
- Window: load, resize

FILES
- index.html  page structure and library links
- style.css   styling and the pop-out effect
- script.js   map loading and all event handling
- data.js     details for the 16 countries

MAP SOURCES (loaded from the internet)
- Leaflet library: unpkg.com/leaflet@1.9.4
- Country outlines (GeoJSON): github.com/johan/world.geo.json

HOW TO RUN
Double-click index.html. An internet connection is needed for the map and the flags.
