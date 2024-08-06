require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/WebMap",
  "esri/widgets/Legend",
  "esri/widgets/LayerList",
  "esri/geometry/Point",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/layers/FeatureLayer",
  "esri/widgets/FeatureTable",
  "esri/widgets/Sketch",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/widgets/Search",
  "esri/geometry/geometryEngine",
], function (
  esriConfig,
  Map,
  MapView,
  WebMap,
  Legend,
  LayerList,
  Point,
  Graphic,
  GraphicsLayer,
  FeatureLayer,
  FeatureTable,
  Sketch,
  SimpleFillSymbol,
  SimpleLineSymbol,
  Search,
  geometryEngine
) {
  //   const map = new Map({
  //     basemap: "topo-vector",
  //   });
  //configuring the api key

  esriConfig.apiKey =
    "AAPTxy8BH1VEsoebNVZXo8HurL01eP4tgA8yphGWYODvgZ_PsR-pVja4nN3PCJonngutjk9FDWsE9IPk2133NlcJ8lDBInETGYbdV_BoM16DNUq3sD5Uw4M1ivw2lJFI_C-DORmLuaBRjuiXaIJNFtGd54_S3r3ekULbwY9Alus6PPF1lMkai3o-WrawXdNkYKunsIoX-0sbBTs-IINdy-n8wHkNfIguS4gDDL2eEst27FK_4P3NVtMrhDaLcXErygHJAT1_X1lpZfWw";
  //adding web to the application
  const webmap = new WebMap({
    portalItem: {
      // autocasts as new PortalItem()
      id: "13ddaf2531554757be3b3b9bb13c311f",
    },
  });
  const view = new MapView({
    container: "viewDiv",
    map: webmap,
    // zoom: 4,
    // center: [15, 65], // longitude, latitude
  });

  //adding layerlist widget

  let layerList = new LayerList({
    view: view,
  });
  // Adds widget below other elements in the top left corner of the view
  view.ui.add(layerList, {
    position: "bottom-right",
  });

  //adding legend widget

  //   let legend = new Legend({
  //     view: view,
  //   });
  //   view.ui.add(legend, "bottom-right");

  let lyrListDropdown = document.getElementById("lyrListdrop");
  view.ui.add(lyrListDropdown, "top-right");

  view.ui.add(document.getElementById("queryDiv"), "top-right");

  let bufferWidget = document.getElementById("bufferWidget");
  view.ui.add(bufferWidget, "bottom-left", 0);

  //getting the layer Name
  view.when().then(() => {
    webmap.layers.map((layer) => {
      //   if (layer.title !== "Graphics Layer") {
      // console.log(layer.title);
      let option = document.createElement("option");
      option.textContent = layer.title;
      let select = document.getElementById("layerName");
      select.appendChild(option);
      //   }
    });
  });

  document.getElementById("layerName").addEventListener("change", getLayerName);
  function getLayerName(event) {
    // webmap.layers.map((layer) => {
    //   layer.visible = true;
    //   //
    // });
    document.getElementById("tableDiv").innerHTML = null;
    // console.log(event.target.value);
    let lyrName = event.target.value;

    // Find a layer with title "US Counties"
    const foundLayer = webmap.layers.find(function (layer) {
      return layer.title === lyrName;
    });

    // webmap.layers.map((layer) => {
    //   if (layer.title !== lyrName) {
    //     layer.visible = false;
    //   }
    // });

    // if (lyrName === "Select the Layer") {
    //   webmap.layers.map((layer) => {
    //     layer.visible = true;
    //     //
    //   });
    // }

    // console.log(foundLayer);
    if (lyrName !== "Graphics Layer") {
      // Typical usage for the FeatureTable widget. This will recognize all fields in the layer if none are set.
      let featureTable = new FeatureTable({
        view: view, // The view property must be set for the select/highlight to work
        layer: foundLayer,
        container: "tableDiv",
      });
    }
  }

  let graphicsLayer = new GraphicsLayer({
    view: view,
    title: "Graphics Layer",
  });

  let outputLayer = new GraphicsLayer({
    view: view,
    title: "Output Layer",
  });

  // typical usage
  let sketch = new Sketch({
    layer: graphicsLayer,
    view: view,
    creationMode: "single",
    // VisibleElements: {
    //   createTools: {
    //     polyline: false,
    //     polygon: false,
    //   },
    // },
  });

  sketch.visibleElements = {
    createTools: {
      polyline: false,
      polygon: false,
      rectangle: false,
      circle: false,
    },
    selectionTools: {
      "lasso-selection": false,
    },
    settingsMenu: false,
  };

  view.map.layers.add(graphicsLayer);
  //   view.map.layers.add(outputLayer);

  view.ui.add(sketch, "top-left");

  function findFacilities() {
    // This function is called when the "Find Facilities" button is clicked.
    let queryLayerName = document.getElementById("layerName").value;

    let distance = document.getElementById("bufferDistance").value;
    console.log(distance);

    // Find a layer with title "US Counties"
    const bufferLayer = webmap.layers.find(function (layer) {
      return layer.title === "Graphics Layer";
    });

    let geometry = bufferLayer.graphics._items[0].geometry;

    // const ptBuff = geometryEngine.buffer(geometry, 1000, "meters");
    // console.log(ptBuff);
    // view.graphics.add(ptBuff);

    /***************************
     * Create a polygon graphic
     ***************************/

    // //Create a polygon geometry
    // const polygon = {
    //   type: "polygon", // autocasts as new Polygon()
    //   rings: ptBuff.rings[0],
    // };

    // // Create a symbol for rendering the graphic
    // const fillSymbol = {
    //   type: "simple-fill", // autocasts as new SimpleFillSymbol()
    //   color: [227, 139, 79, 0.8],
    //   outline: {
    //     // autocasts as new SimpleLineSymbol()
    //     color: [255, 255, 255],
    //     width: 1,
    //   },
    // };

    // // Add the geometry and symbol to a new graphic
    // const polygonGraphic = new Graphic({
    //   geometry: polygon,
    //   //   symbol: fillSymbol,
    // });
    // console.log(polygonGraphic);

    // view.graphics.add(polygonGraphic);
    view.when().then(() => {
      const queryLayer = webmap.layers.find(function (layer) {
        return layer.title === queryLayerName;
      });

      queryLayer
        .queryFeatures({
          geometry: geometry,
          // distance and units will be null if basic query selected
          distance: distance,
          units: "miles",
          spatialRelationship: "intersects",
          returnGeometry: true,
          returnQueryGeometry: true,
          outFields: ["*"],
        })
        .then((result) => {
          console.log(result);

          result.features.map((feature) => {
            //creating simple point graphic

            // Create a symbol for drawing the point
            const markerSymbol = {
              type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
              color: [226, 119, 40],
              outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 2,
              },
            };

            // Create a graphic and add the geometry and symbol to it
            const pointGraphic = new Graphic({
              geometry: feature.geometry,
              symbol: markerSymbol,
            });

            view.graphics.add(pointGraphic);
          });

          // set graphic location to mouse pointer and add to mapview
          // pointGraphic.geometry = point;
          // view.graphics.add(pointGraphic);
          // // open popup of query result
          // view.openPopup({
          //   location: point,
          //   features: featureSet.features,
          //   featureMenuOpen: true,
          // });
          // if (featureSet.queryGeometry) {
          //   bufferGraphic.geometry = featureSet.queryGeometry;
          //   view.graphics.add(bufferGraphic);
          // }
        });
    });
  }

  function clearFacilities() {
    view.graphics.removeAll();
    graphicsLayer.graphics.removeAll();
  }

  document
    .getElementById("bufferButton")
    .addEventListener("click", findFacilities);

  document
    .getElementById("clearBtn")
    .addEventListener("click", clearFacilities);
});
