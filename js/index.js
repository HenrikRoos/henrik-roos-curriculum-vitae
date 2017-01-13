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

function countMonth(start, end) {
    return Math.round((end - start) / ((365.25 / 12) * 24 * 60 * 60 * 1000));
}

function experienceLength(div) {
    var end = div.hasAttribute("end") ? new Date(div.getAttribute("end")) : new Date();
    var start = div.hasAttribute("start") ? new Date(div.getAttribute("start")) : new Date();
    return end > start ? countMonth(start, end) : 0;
}

function experienceSum(label) {
    var sum = 0;
    var divs = document.querySelectorAll("#mission ." + label);
    for (var i = 0; i < divs.length; i++) {
        sum += experienceLength(divs[i]);
    }
    return sum;
}

function drawExperienceInterval() {
    var divs = document.querySelectorAll("#mission .column");
    for (var i = 0; i < divs.length; i++) {
        var endtext = divs[i].hasAttribute("end") ? divs[i].getAttribute("end") : "pågående";
        var text = divs[i].getAttribute("start") + " &mdash; " + endtext + " (" + experienceLength(divs[i]) + " månader)";
        var divtext = document.createElement("div");
        divtext.innerHTML = text;
        var placeholder = divs[i].querySelectorAll(".subtitle")[0];
        placeholder.appendChild(divtext);
    }
}

function getTimelineTitleTd(missionDiv) {
    var h3 = missionDiv.querySelector("h3");
    var td = document.createElement("td");

    if (missionDiv.hasAttribute("id")) {
        var a = document.createElement("a");
        a.setAttribute("href", "#" + missionDiv.getAttribute("id"));
        a.innerHTML = h3.getAttribute("title");
        td.appendChild(a);
    } else {
        td.innerHTML = h3.getAttribute("title");
    }
    
    td.setAttribute("class", "experience " + missionDiv.getAttribute("timeline"));
    td.setAttribute("colspan", experienceLength(missionDiv));
    td.setAttribute("title", h3.innerHTML);
    return td;
}

function getTimelineMonthTr(firstMissionDiv) {
    var tr = document.createElement("tr");
    var startDate = new Date(firstMissionDiv.getAttribute("start"));
    var endDate = new Date();
    var months = countMonth(startDate, endDate);
    
    for (var i = 0; i < months; i++) {
        var td = document.createElement("td");
        td.setAttribute("class", "months");
        tr.appendChild(td);
    }
    return tr;
}

function getTimelineYearTr(firstMissionDiv) {
    var tr = document.createElement("tr");
    var startDate = new Date(firstMissionDiv.getAttribute("start"));
    var endDate = new Date();

    var td = document.createElement("td");
    td.setAttribute("colspan", 12 - startDate.getMonth());
    td.innerHTML = startDate.getFullYear();
    tr.appendChild(td);
    
    for (var y = startDate.getFullYear() + 1; y < endDate.getFullYear(); y++) {
        td = document.createElement("td");
        td.setAttribute("colspan", 12);
        td.innerHTML = y;
        tr.appendChild(td);
    }

    td = document.createElement("td");
    td.setAttribute("colspan", endDate.getMonth() + 1);
    td.innerHTML = endDate.getFullYear();
    tr.appendChild(td);

    return tr;    
}

function getTimelineTbody() {
    var tbody = document.createElement("tbody");

    var tr = document.createElement("tr");
    var missionAll = document.querySelectorAll("#mission [start]");
    for (var i = missionAll.length - 1; i >= 0; i--) {
        var td = getTimelineTitleTd(missionAll[i]);
        tr.appendChild(td);
    }
    tbody.appendChild(tr);

    tr = getTimelineMonthTr(missionAll[missionAll.length - 1]);
    tbody.appendChild(tr);

    tr = getTimelineYearTr(missionAll[missionAll.length - 1]);
    tbody.appendChild(tr);

    return tbody;
}

function drawTimeline() {
    var table = document.createElement("table");
    var tbody = getTimelineTbody();
    table.appendChild(tbody);
    var div = document.getElementById("timeline");
    div.appendChild(table);
}

var discipline = [
    {
        value: experienceSum("utv"),
        color: "#F9D423",
        highlight: "#FEF2B9",
        label: "Utveckling"
    },
    {
        value: experienceSum("test"),
        color: "#619EC2",
        highlight: "#D0E2EC",
        label: "Test"
    },
    {
        value: experienceSum("req"),
        color: "orange",
        highlight: "#FFD1B3",
        label: "Krav"
    }
];

var branch = [
    {
        value: experienceSum("health"),
        color: "DarkTurquoise",
        highlight: "#52FCFF",
        label: "Hälsa & Sjukvård"
    },
    {
        value: experienceSum("finans"),
        color: "DimGray",
        highlight: "#B5B5B5",
        label: "Bank & Finans"
    },
    {
        value: experienceSum("reklam"),
        color: "LightPink",
        highlight: "#FFEBEE",
        label: "Reklam"
    },
    {
        value: experienceSum("telekom"),
        color: "DeepSkyBlue",
        highlight: "#99E6FF",
        label: "Data It & Telekom."
    },
    {
        value: experienceSum("insurance"),
        color: "#FF9834",
        highlight: "#FFBF80",
        label: "Försäkring"
    }
];

var dev_platform = [
    {
        value: experienceSum("java"),
        color: "#0099CC",
        highlight: "#66D9FF",
        label: "Java"
    },
    {
        value: experienceSum("net"),
        color: "#FF9D00",
        highlight: "#FFCE80",
        label: ".NET"
    },
    {
        value: experienceSum("oberoende"),
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
drawExperienceInterval();
drawTimeline();