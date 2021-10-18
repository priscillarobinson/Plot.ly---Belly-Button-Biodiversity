function init() {

    // Use D3 fetch to read the JSON file
    // The data from the JSON file is arbitrarily named importedData as the argument
    d3.json("data/samples.json").then((importedData) => {
        console.log(importedData);
        var data = importedData;
        
    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
    // Use sample_values as the values for the bar chart
    // Use otu_ids as the labels for the bar chart
    // Use otu_labels as the hovertext for the chart

        // add subject ids to dropdown menu
        var names = data.names;
        console.log(names);
        var dropdownMenu = d3.select("#selDataset");
    
        names.forEach((name) => {
            dropdownMenu.append("option").text(`${name}`).property("value",name);
        });

        optionChanged(names[0]);

    });
};

init ();

// call buildPlot function
function optionChanged(id) {
    d3.json("data/samples.json").then((importedData) => {
        samples = importedData.samples;
        console.log(samples);

        var resultArray = samples.filter(sampleObj => sampleObj.id == id);
        console.log("resultArray");
        console.log(resultArray);

        console.log("resultArray[0]");
        console.log(resultArray[0]);

        var sample_values = resultArray[0].sample_values;
        var otu_ids = resultArray[0].otu_ids;
        var otu_labels = resultArray[0].otu_labels;

        var bar_trace = {
            y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
          };

        //   var data = [bar_trace];

          var bar_layout = {
            title: "Top 10 OTUs",
            margin: { t: 30, l: 150 }
          };

          Plotly.newPlot("bar", [bar_trace], bar_layout);

         // otu_ids for x values
         // sample_values for y values
         // sample_value for marker size
         //otu_ids for marker colors
         //otu_lable for text values 

         var bubble_trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Earth"
            }
          };
          var bubble_layout = {
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30 }
          };
          Plotly.newPlot("bubble", [bubble_trace], bubble_layout);

          var metadata = importedData.metadata;
          console.log("metadata");
          console.log(metadata);

          var results = metadata.filter(metadataObj => metadataObj.id == id);
          var result = results[0];
          console.log("results")
          console.log(results)
          console.log("result")
          console.log(result)

          var fig = d3.select("#sample-metadata");
          fig.html("");
          
          Object.entries(results[0]).forEach(([key, value]) => {
            fig.append("h5").text(`${key}: ${value}`);
          });  
         
    });

    
    
    
}
