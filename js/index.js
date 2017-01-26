/**
 * @author Henrik Roos
 */

Chart.defaults.global.responsive = true;

var experienceLabelsMap = {
    texts: [
        "Utveckling",
        "Test",
        "Krav",
        "Hälsa & Sjukvård",
        "Bank & Finans",
        "Reklam",
        "Data It & Telekom.",
        "Försäkring",
        "Java",
        ".NET",
        "Oberoende"
    ],
    classnames: [
        "utv",
        "test",
        "krav",
        "health",
        "finans",
        "reklam",
        "telekom",
        "insurance",
        "java",
        "net",
        "oberoende"
    ]
};

function getTextExperienceLabel(classname) {
    var index = experienceLabelsMap.classnames.indexOf(classname);
    return experienceLabelsMap.texts[index];
}

function getClassExperienceLabel(text) {
    var index = experienceLabelsMap.texts.indexOf(text);
    return experienceLabelsMap.classnames[index];
}

function addTitleContext(placeholder, title) {
    var h3 = document.createElement("h3");
    h3.innerHTML = title;
    placeholder.appendChild(h3);

    var div = document.createElement("div");
    placeholder.appendChild(div);

    var ctx = document.createElement("canvas");
    div.appendChild(ctx);
    return ctx;
}

function generateSimpelChart(id, title, data) {
    var placeholder = document.getElementById(id);
    var ctx = addTitleContext(placeholder, title);
    new Chart(ctx.getContext("2d"),
        {
            type: 'pie',
            data: data,
            options: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    );
}

function generateExperienceChart(id, title, data) {
    var placeholder = document.getElementById(id);
    var ctx = addTitleContext(placeholder, title);
    new Chart(ctx.getContext("2d"),
        {
            type: 'pie',
            data: data,
            options: {
                legend: {
                    display: false
                },
                hover: {
                    onHover: function (pieceArr) {
                        if (pieceArr.length == 1) {
                            var piece = pieceArr[0]._view;
                            var classname = getClassExperienceLabel(piece.label);
                            var divs = document.querySelectorAll("#timeline [tags~=" + classname + "]");
                            divs.forEach(function (div) {
                                div.style.backgroundColor = piece.backgroundColor;
                            });
                        }
                        else {
                            var divs = document.querySelectorAll("#timeline [tags]");
                            divs.forEach(function (div) {
                                div.style.backgroundColor = "";
                            });
                        }
                    }
                }
            }
        }
    );
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
    var divs = document.querySelectorAll("[tags~=" + label + "]");
    divs.forEach(function (div) {
        sum += experienceLength(div);
    });
    return sum;
}

function drawExperienceInterval() {
    var divs = document.querySelectorAll("#mission .column");
    divs.forEach(function (div) {
        var endtext = div.hasAttribute("end") ? div.getAttribute("end") : "pågående";
        var text = div.getAttribute("start") + " &mdash; " + endtext + " (" + experienceLength(div) + " månader)";
        var divtext = document.createElement("div");
        divtext.innerHTML = text;
        var placeholder = div.querySelectorAll(".subtitle")[0];
        placeholder.appendChild(divtext);
    });
}

function getTimelineTitleItem(missionDiv, months, clientWidth) {
    var h3 = missionDiv.querySelector("h3");
    var div = document.createElement("div");

    if (missionDiv.hasAttribute("id")) {
        var a = document.createElement("a");
        a.setAttribute("href", "#" + missionDiv.getAttribute("id"));
        a.innerHTML = h3.getAttribute("title");
        div.appendChild(a);
    } else {
        div.innerHTML = h3.getAttribute("title");
    }

    div.style.width = 100 * (experienceLength(missionDiv) / months - 1.1 * (1 / clientWidth)) + "%";
    div.setAttribute("title", h3.innerHTML);
    div.setAttribute("tags", missionDiv.getAttribute("tags"));
    return div;
}

function getTimelineItemsRow(missionAll, months, clientWidth) {
    var itemsRow = document.createElement("section");

    for (var i = missionAll.length - 1; i >= 0; i--) {
        var div = getTimelineTitleItem(missionAll[i], months, clientWidth);
        itemsRow.appendChild(div);
    }
    return itemsRow;
}

function getTimelineYearRow(firstMissionDiv, months, clientWidth) {
    var row = document.createElement("section");
    row.setAttribute("class", "year");
    var startDate = new Date(firstMissionDiv.getAttribute("start"));
    var endDate = new Date();

    var div = document.createElement("div");
    div.style.width = 100 * ((12 - startDate.getMonth()) / months - 1.1 * (1 / clientWidth)) + "%";
    div.innerHTML = startDate.getFullYear();
    row.appendChild(div);

    for (var y = startDate.getFullYear() + 1; y < endDate.getFullYear(); y++) {
        div = document.createElement("div");
        div.style.width = 100 * (12 / months - 1.2 * (1 / clientWidth)) + "%";
        div.innerHTML = y;
        row.appendChild(div);
    }

    div = document.createElement("div");
    div.style.width = 100 * ((endDate.getMonth() + 6) / months - 1.1 * (1 / clientWidth)) + "%";
    div.innerHTML = endDate.getFullYear();
    row.appendChild(div);

    return row;
}

function drawTimeline() {
    var missionAll = document.querySelectorAll("#mission [start]");
    var startDate = new Date(missionAll[missionAll.length - 1].getAttribute("start"));
    var endDate = new Date();
    var months = countMonth(startDate, endDate) + 6;
    var article = document.querySelector("#experience article");
    var timeline = document.getElementById("timeline");

    timeline.appendChild(getTimelineItemsRow(missionAll, months, article.clientWidth));
    timeline.appendChild(getTimelineYearRow(missionAll[missionAll.length - 1], months, article.clientWidth));
}

var discipline =
    {
        datasets: [{
            data: [
                experienceSum("utv"),
                experienceSum("test"),
                experienceSum("krav")
            ],
            backgroundColor: [
                "rgb(249,212,35)",
                "rgb(97,158,194)",
                "rgb(255,209,179)"
            ],
        }],
        labels: [
            getTextExperienceLabel("utv"),
            getTextExperienceLabel("test"),
            getTextExperienceLabel("krav")
        ]
    };

var branch =
    {
        datasets: [{
            data: [
                experienceSum("health"),
                experienceSum("finans"),
                experienceSum("reklam"),
                experienceSum("telekom"),
                experienceSum("insurance")
            ],
            backgroundColor: [
                "rgb(0,206,209)",
                "rgb(105,105,105)",
                "rgb(255,182,193)",
                "rgb(97,158,194)",
                "rgb(255,157,0)"
            ]
        }],
        labels: [
            getTextExperienceLabel("health"),
            getTextExperienceLabel("finans"),
            getTextExperienceLabel("reklam"),
            getTextExperienceLabel("telekom"),
            getTextExperienceLabel("insurance")
        ]
    };

var dev_platform =
    {
        datasets: [{
            data: [
                experienceSum("java"),
                experienceSum("net"),
                experienceSum("oberoende")
            ],
            backgroundColor: [
                "rgb(97,158,194)",
                "rgb(255,157,0)",
                "rgb(170,137,85)"
            ],
        }],
        labels: [
            getTextExperienceLabel("java"),
            getTextExperienceLabel("net"),
            getTextExperienceLabel("oberoende")
        ]
    };

var subject_distribution =
    {
        datasets: [{
            data: [63, 60, 30, 30, 15],
            backgroundColor: [
                "rgb(255,157,0)",
                "rgb(107,210,219)",
                "rgb(14,167,181)",
                "rgb(97,158,194)",
                "rgb(232,112,42)"
            ],
        }],
        labels: [
            "Data",
            "Matematik",
            "Kemi",
            "Biologi",
            "Fysik"
        ]
    };


generateExperienceChart("discipline", "Disciplin", discipline);
generateExperienceChart("branch", "Bransch", branch);
generateExperienceChart("dev_platform", "Plattform", dev_platform);
generateSimpelChart("subject_distribution", "Ämnesfördelning av 198 hp", subject_distribution);
drawExperienceInterval();
drawTimeline();