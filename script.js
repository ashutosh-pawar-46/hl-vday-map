require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/LayerList",
  "esri/widgets/Home",
  "esri/widgets/BasemapToggle"
], function(Map, MapView, FeatureLayer, LayerList, Home, BasemapToggle) {
  const map = new Map({
    basemap: "gray"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-90.24618, 38.63201],
    zoom: 12
  });

  // Array of feature layers with custom titles
  const featureLayers = [
    {
      url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/OurSpot_WFL1/FeatureServer/0",
      title: "Nudo House"
    },
    {
      url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/OurSpot_WFL1/FeatureServer/1",
      title: "Clementine's Creamery"
    },
    {
      url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/OurSpot_WFL1/FeatureServer/2",
      title: "Her Place"
    },
    {
      url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/OurSpot_WFL1/FeatureServer/3",
      title: "Botanical Gardens"
    },
    {
      url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/OurSpot_WFL1/FeatureServer/4",
      title: "My Place"
    },
    {
      url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/OurSpot_WFL1/FeatureServer/5",
      title: "Union Loafers Café"
    },
    {
      url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/OurSpot_WFL1/FeatureServer/6",
      title: "Urban Chestnut"
    },
    {
      url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/OurSpot_WFL1/FeatureServer/7",
      title: "Pickleman's Gourmet Cafe"
    },
    {
      url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/OurSpot_WFL1/FeatureServer/8",
      title: "City Foundry"
    }
  ];
featureLayers.forEach(layerInfo => {
    const layer = new FeatureLayer({
      url: layerInfo.url,
      title: layerInfo.title,
      popupTemplate: {
        title: layerInfo.title, // Use the custom title for the popup as well
        content: "{Message}" // Assuming 'Message' is a valid attribute field
      }
    });
    map.add(layer);
  });

  // LayerList widget with custom actions
  const layerList = new LayerList({
    view: view,
    listItemCreatedFunction: function(event) {
      const item = event.item;
      if (item.layer.type !== "group") {
        item.actionsSections = [
          [{
            title: "Zoom to Layer",
            className: "esri-icon-zoom-in-magnifying-glass",
            id: "zoom-to-layer"
          }]
        ];
      }
    }
  });

  // Handle the trigger-action event for the LayerList
  layerList.on("trigger-action", function(event) {
    if (event.action.id === "zoom-to-layer") {
      // Get the layer associated with the clicked action
      const layer = event.item.layer;

      view.goTo(layer.fullExtent).catch(function(error) {
        console.error("Error zooming to layer:", error);
      });
    }
  });

  // Add widgets to the UI
  view.ui.add(new Home({ view: view }), "top-left");
  view.ui.add(layerList, "top-right");
  view.ui.add(new BasemapToggle({
    view: view,
    nextBasemap: "satellite"
  }), "bottom-right");
});

function toggleDescription() {
    var descriptionBox = document.getElementById('descriptionBox');
    if (descriptionBox.style.display === "none") {
        descriptionBox.style.display = "block";
    } else {
        descriptionBox.style.display = "none";
    }
}
