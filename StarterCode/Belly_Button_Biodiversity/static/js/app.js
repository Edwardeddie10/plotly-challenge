function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(`/metadata/${sample}`).then(function(sampledata) {
    console.log(sampledata);
  });

    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#metadata/${sample}");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.defineProperties(sampledata).foreach(([key,value]) => {
      panel.append('h6').text(`${key}, ${value}`);
    })

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  console.log("function run")
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then(function (sampledata) {
    console.log(sampledata);

    let sampledate = d3.json.sample_value;
    let otu_ids =d3.json.otu_ids;
    let otu_labes = d3.json.otu_labels;
    console.log("sample data: ", sampledata);

  })
    // @TODO: Build a Bubble Chart using the sample data
    var bubbleLayout = {
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" }
    };
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ];

    //  ploty.otuplot("bubble", data, layout);

       // const defaultURL = "/metadata/<sample>";
      // d3.json(defaultURL).then(function (data) 

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    // var data = {
    //   labels: otu_ids.slice(0,10),
    //   values: sample_values.slices(0,10),
    //   hoverinfo: 'hovertext',
    //   hovertext: otu_labels.slice(0,10),
    //   type: 'pie'

    // };
    // var layout = {
    //   title: "'pie' Chart",
    // }

    // plotly.otuplot("pie", data, layout);
  }
  

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  console.log("init run")
  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

 // Initialize the dashboard
 init();