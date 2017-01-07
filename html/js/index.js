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
	pie.setAttribute("height",placeholder.clientWidth);
	pie.setAttribute("width",placeholder.clientWidth);
	placeholder.appendChild(pie);
	
	var pie_chart = new Chart(pie.getContext("2d")).Pie(data,
		{
			legendTemplate : "<% for (var i=0; i<segments.length; i++){%><li><span style=\"color:<%=segments[i].fillColor%>\">✪</span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%>"
		});
	
	var legend = document.createElement("ul");
	legend.innerHTML = pie_chart.generateLegend();
	placeholder.parentElement.appendChild(legend);
}

var discipline = [
    {
        value: 22 + 4 + 3 + 3 + 8 + 5 + 18, //#1 #3 #4 #5 #6 #11 #14
        color:"#F9D423",
	    highlight: "#FEF2B9",
        label: "Utveckling"
    },
    {
        value: 6 + 9 + 3 + 3 + 17, //#7 #9 #10 #12 #13
        color: "#619EC2",
        highlight: "#D0E2EC",
        label: "Test"
    },
    {
        value: 6 + 8, //#2 #8
        color: "orange",
        highlight: "#FFD1B3",
        label: "Krav"
    }
];

var branch = [
    {
        value: 4 + 6 + 8 + 3 + 5 + 3, //#3 #7 #8 #10 #11 #12
        color:"DarkTurquoise",
	    highlight: "#52FCFF",
        label: "Hälsa & Sjukvård"
    },
    {
        value: 6 + 3 + 8 + 9, //#2 #4 #6 #9
        color: "DimGray",
        highlight: "#B5B5B5",
        label: "Bank & Finans"
    },
    {
        value: 22, //#1
        color: "LightPink",
        highlight: "#FFEBEE",
        label: "Reklam"
    },
    {
        value: 3 + 17, //#5 #13
        color: "DeepSkyBlue",
        highlight: "#99E6FF",
        label: "Data It & Telekom."
    },
    {
        value: 16, //#14
        color: "#FF9834",
        highlight: "#FFBF80",
        label: "Försäkring"
    }
];

var dev_platform = [
    {
        value: 22 + 3 + 3 + 6 + 9 + 3 + 17, //#1 #2 #5 #7 #9 #12 #13
        color:"#0099CC",
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

window.onload = function(){
	generateChart("discipline", "Disciplin", discipline);
	generateChart("branch", "Bransch", branch);
	generateChart("dev_platform", "Plattform", dev_platform);
	generateChart("subject_distribution", "Ämnesfördelning av 198 hp", subject_distribution);
}