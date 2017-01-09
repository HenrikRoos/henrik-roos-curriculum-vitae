/**
 * @author Henrik Roos
 */

Chart.defaults.global.responsive = true;
Chart.defaults.global.animation = false;
Chart.defaults.global.tooltipFontFamily = "'Open Sans', 'Helvetica Neue', helvetica, arial, sans-serif";
Chart.defaults.global.tooltipFontSize = 13;

function generateChart(id, title, data) {
    var placeholder = document.getElementById(id);
    placeholder.innerHTML = "";

    var h3 = document.createElement("h3");
    placeholder.appendChild(h3);
    h3.innerHTML = title;

    var div = document.createElement("div");
    placeholder.appendChild(div);
    placeholder = div;

    var pie = document.createElement("canvas");
    pie.setAttribute("height", placeholder.clientWidth);
    pie.setAttribute("width", placeholder.clientWidth);
    placeholder.appendChild(pie);

    var pie_chart = new Chart(pie.getContext("2d")).Pie(data,
        {
            legendTemplate: "<% for (var i=0; i<segments.length; i++){%><li><span style=\"color:<%=segments[i].fillColor%>\">✪</span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%>"
        });

    var legend = document.createElement("ul");
    legend.innerHTML = pie_chart.generateLegend();
    placeholder.parentElement.appendChild(legend);
}

function experienceLength(id) {
    var td = document.getElementById(id);
    var colspan = td.getAttribute("colspan");
    return parseInt(colspan);
}

function experienceSum() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += experienceLength(arguments[i]);
    }
    return sum;
}

var discipline = [
    {
        value: experienceSum("e1", "e3", "e4", "e5", "e6", "e11", "e14"),
        color: "#F9D423",
        highlight: "#FEF2B9",
        label: "Utveckling"
    },
    {
        value: experienceSum("e7", "e9", "e10", "e12", "e13"),
        color: "#619EC2",
        highlight: "#D0E2EC",
        label: "Test"
    },
    {
        value: experienceSum("e2", "e8"),
        color: "orange",
        highlight: "#FFD1B3",
        label: "Krav"
    }
];

var branch = [
    {
        value: experienceSum("e3", "e7", "e8", "e10", "e11", "e12"),
        color: "DarkTurquoise",
        highlight: "#52FCFF",
        label: "Hälsa & Sjukvård"
    },
    {
        value: experienceSum("e2", "e4", "e6", "e9"),
        color: "DimGray",
        highlight: "#B5B5B5",
        label: "Bank & Finans"
    },
    {
        value: experienceSum("e1"),
        color: "LightPink",
        highlight: "#FFEBEE",
        label: "Reklam"
    },
    {
        value: experienceSum("e5", "e13"),
        color: "DeepSkyBlue",
        highlight: "#99E6FF",
        label: "Data It & Telekom."
    },
    {
        value: experienceSum("e14"),
        color: "#FF9834",
        highlight: "#FFBF80",
        label: "Försäkring"
    }
];

var dev_platform = [
    {
        value: 22 + 3 + 3 + 6 + 9 + 3 + 17, //#1 #2 #5 #7 #9 #12 #13
        color: "#0099CC",
        highlight: "#66D9FF",
        label: "Java"
    },
    {
        value: 4 + 3 + 8 + 5 + 18, //#3 #4 #6 #11 #14
        color: "#FF9D00",
        highlight: "#FFCE80",
        label: ".NET"
    },
    {
        value: 8 + 3, //#8 + #10
        color: "#AA8955",
        highlight: "#E5DDCD",
        label: "Oberoende"
    }
];

var subject_distribution = [
    {
        value: 63,
        color: "#FFBE4F",
        highlight: "#FFDA99",
        label: "Data"
    },
    {
        value: 60,
        color: "#6BD2DB",
        highlight: "#D2F1F4",
        label: "Matematik"
    },
    {
        value: 30,
        color: "#0EA7B5",
        highlight: "#66E9F4",
        label: "Kemi"
    },
    {
        value: 30,
        color: "#0C457D",
        highlight: "#4F9EEE",
        label: "Biologi"
    },
    {
        value: 15,
        color: "#E8702A",
        highlight: "#F6CEB6",
        label: "Fysik"
    }
];

generateChart("discipline", "Disciplin", discipline);
generateChart("branch", "Bransch", branch);
generateChart("dev_platform", "Plattform", dev_platform);
generateChart("subject_distribution", "Ämnesfördelning av 198 hp", subject_distribution);

var exp = document.getElementById("13");
var start = new Date(exp.getAttribute("start"));
var end = new Date(exp.getAttribute("end"));
var months = Math.round((end - start) / (30*24*60*60*1000)); 

var placeholder = document.querySelector(".startend");
placeholder.innerHTML = "Antal " + months;
