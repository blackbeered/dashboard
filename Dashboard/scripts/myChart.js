'use strict';
var chartData = [{
    name: 'BILD-1234',
    start: new Date(2016, 2, 12),
    ende: new Date(2016, 2, 14),
}, {
    name: 'BILD-1235',
    start: new Date(2016, 2, 13),
    ende: new Date(2016, 2, 17),
}, {
    name: 'BILD-1236',
    start: new Date(2016, 2, 11),
    ende: new Date(2016, 2, 14),
}, {
    name: 'BILD-1136',
    start: new Date(2016, 2, 12),
    ende: new Date(2016, 2, 15),
}];
// Get context with jQuery - using jQuery's .get() method.
var ctx = $("#myChart").get(0).getContext("2d");
// This will get the first returned node in the jQuery collection.
var options = {
    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,
    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.05)",
    //Number - Width of the grid lines
    scaleGridLineWidth: 1,
    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,
    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,
    //Boolean - Whether the line is curved between points
    bezierCurve: true,
    //Number - Tension of the bezier curve between points
    bezierCurveTension: 0.4,
    //Boolean - Whether to show a dot for each point
    pointDot: true,
    //Number - Radius of each point dot in pixels
    pointDotRadius: 4,
    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth: 1,
    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius: 20,
    //Boolean - Whether to show a stroke for datasets
    datasetStroke: true,
    //Number - Pixel width of dataset stroke
    datasetStrokeWidth: 2,
    //Boolean - Whether to fill the dataset with a colour
    datasetFill: true,
    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
};
var data = {
    labels: [],
    datasets: [{
        label: "In Arbeit",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: []
    }, {
        label: "Fertig",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: []
    }]
};

function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

function createLabels() {
    getDaysInMonth(2, 2016).forEach((day) => {
        data.labels.push("" + day.getDate());
    });
}

function createInArbeitArray() {
    getDaysInMonth(2, 2016).forEach((day) => {
        var x = chartData.filter((story) => {
            return isInArbeit(story, day);
        })
        data.datasets[0].data.push(x.length)
    });
}


function createFertigArray() {
    getDaysInMonth(2, 2016).forEach((day) => {
        var x = chartData.filter((story) => {
           return isFertig(story, day);
        })
        data.datasets[1].data.push(x.length);
    });
}

function isInArbeit(story, date) {
    var currentDay = date.getDate();
    return story.start.getDate() < currentDay && story.ende.getDate() > currentDay;
}
function isFertig(story, date) {
    var currentDay = date.getDate();
    return story.start.getDate() < currentDay && story.ende.getDate() < currentDay;
}
createLabels();
createInArbeitArray();
createFertigArray();
var myNewChart = new Chart(ctx);
var myLineChart = new Chart(ctx).Line(data, options);