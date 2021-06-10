function paddingNumberWithZero(num, length) {
    return ("0" + num).slice(-length);
}

function dateToString(date) {
    return paddingNumberWithZero(date.getHours(), 2) + ":" + paddingNumberWithZero(date.getMinutes(), 2) + ":" + paddingNumberWithZero(date.getSeconds(), 2);
}


const ID_SERIES_LINE = "chart-series-line-area",
      ID_SERIES_CANDLESTICK = "chart-series-candlestick",
      SERIES_DATA = {},
      ID_DATA_USD = "usd",
      ID_DATA_EURO = "euro";

SERIES_DATA[ID_SERIES_LINE] = [];
SERIES_DATA[ID_SERIES_CANDLESTICK] = [];

function generateData(isRenewLineSeriesData = true, isRenewCandlestickSeriesData = true, candlestickSeriesDataInterval = 5) {
    var curDate = new Date();
    curDate.setMilliseconds(0);
    curDate.setSeconds(0);
    curDate.setMinutes(curDate.getMinutes() - curDate.getMinutes() % 10);

    var time = curDate.getTime(),
        price = 10,
        open = 10,
        low = 9.3,
        high = 10.2,
        close = 10.1;

    if (isRenewLineSeriesData)
        SERIES_DATA[ID_SERIES_LINE].splice(0);

    if (isRenewCandlestickSeriesData)
        SERIES_DATA[ID_SERIES_CANDLESTICK].splice(0);

    for (let i = 0; i <= 60; i ++) {
        // Generate line series data.
        if (isRenewLineSeriesData) {
            price = parseFloat(Math.abs(price - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10).toFixed(5));

            SERIES_DATA[ID_SERIES_LINE].push({
                date: new Date(time + (i - 60) * 1000),
                value: price
            });
        }

        // Generate candlestick series data.
        if (isRenewCandlestickSeriesData) {
            open = parseFloat(Math.abs(close - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10).toFixed(5));
            close = parseFloat(Math.abs(open - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10).toFixed(5));
            low = parseFloat(Math.abs(open - Math.random() * 10).toFixed(5));
            high = parseFloat(Math.abs(low + Math.random() * 10).toFixed(5));

            SERIES_DATA[ID_SERIES_CANDLESTICK].push({
                date: new Date(time + (i - 60) * candlestickSeriesDataInterval * 1000),
                open: open,
                low: low,
                high: high,
                close: close
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
        //Socket io
    const socket = io.connect('/');
    // écoute du socket news
    socket.on('informations', function(data){
        DATA = { date: data.RTS, open: data.P, low: data.P, high: data.P, close: data.P };
        console.log(DATA);
    });
    am4core.ready(function() {
        var chart,
            xAxis, yAxis,
            lineSeries, lineSeriesBullet,
            candlestickSeries, candlestickSeriesBullet,
            currentSeries,
            currentCandlestickSeriesDataInterval = 5,
            seriesArray = [];

        // Create axis range line.
        function createAxisRange(
            currentAxisRange,
            axis,
            value,
            strokeColor,
            strokeDasharray,
            className,
            text,
            iconTag,
            labelOffsets
        ) {
            let axisRange = currentAxisRange || axis.axisRanges.create();
            axisRange[axis.axisFieldName] = value;
            axisRange.grid.stroke = strokeColor;
            axisRange.grid.strokeWidth = 1;
            axisRange.grid.strokeOpacity = 1;
            axisRange.label.disabled = true;
            axisRange.label.zIndex = 100;
            axisRange.label.truncate = false;
            axisRange.label.hideOversized = false;

            if (labelOffsets) {
                for (let offsetFieldName in  labelOffsets) {
                    if (labelOffsets.hasOwnProperty(offsetFieldName))
                        axisRange.label[offsetFieldName] = labelOffsets[offsetFieldName];
                }
            }

            if (strokeDasharray)
                axisRange.grid.strokeDasharray = strokeDasharray;

            if (text) {
                axisRange.label.html = `<div class="range-label ${className}"><span>${iconTag || ""}${text}</span></div>`;
                axisRange.label.disabled = false;
            }

            return axisRange;
        }

        // Update chart data.
        function _updateChartData(data) {
            if (!chart)
                return;

            chart.data = data;
            chart.invalidateData();
        }

        // Toggle series.
        function _toggleChartSeries(seriesId) {
            if (!chart)
                return;

            var series = chart.map.getKey(seriesId);
            if (!series)
                return;

            if (series.isHiding || series.isHidden)
                series.show();
            else
                series.hide();
        }

        // Toggle two series.
        function _toggleMultiChartSeries(seriesIdToShow) {
            seriesArray.forEach(series => {
                var funcName = "hide";

                if (series.id === seriesIdToShow) {
                    currentSeries = series;
                    funcName = "show";

                    // xAxis.baseInterval = {
                    //     timeUnit: "second",
                    //     count: series.id === ID_SERIES_CANDLESTICK
                    //                 ? currentCandlestickSeriesDataInterval
                    //                 : 1
                    // };
                }

                series[funcName]();
                series.children.each(child => child[funcName]());
            });
        }

        // Create series bullet.
        function _createSeriesBullet(series, radius, toScale) {
            var bullet = series.createChild(am4charts.CircleBullet);
            bullet.circle.radius = radius;
            bullet.fillOpacity = 1;
            bullet.fill = am4core.color("rgb(0, 136, 255)");
            bullet.isMeasured = false;

            var secondCircle = bullet.createChild(am4core.Circle);
            secondCircle.radius = radius;

            bullet.events.on("inited", (event) => {
                _animateBullet(event.target.circle, toScale);
            });

            return bullet;
        }

        // Animate bullet.
        function _animateBullet(bullet, toScale) {
            let animation = bullet.animate(
                    [
                        {property: "scale", from: 1, to: toScale},
                        {property: "opacity", from: 1, to: 0}
                    ],
                    1000,
                    am4core.ease.circleOut
                );
            animation.events.on("animationended", (event) => {
                _animateBullet(event.target.object, toScale);
            });
        }

        // Move cursor to the last data point.
        function _moveCursorToLastDataPoint() {
            if (!currentSeries)
                return;

            xAxis.start = 1 - (xAxis.end - xAxis.start);
            xAxis.end = 1;
        }

        // Convert date/value to x/y coordinate.
        function _getXYCoordinate(date, value) {
            return  {
                        x: xAxis.dateToPoint(date).x,
                        y: yAxis.valueToPoint(value).y
                    };
        }

        // Update the interval of candlestick series.
        function _updateCandlestickSeriesDataInterval(interval) {
            currentCandlestickSeriesDataInterval = interval;

            generateData(false, true, interval);
            _updateChartData(SERIES_DATA[ID_SERIES_CANDLESTICK]);

            startCandlestickSeriesDataTimer();
        }

        // Get value from interval in milliseconds.
        function _getValueFromInterval(interval) {
            switch (interval.timeUnit) {
                case "millisecond":
                    return interval.count;

                case "second":
                    return interval.count * 1000;

                case "minute":
                    return interval.count * 60 * 1000;

                case "hour":
                    return interval.count * 60 * 60 * 1000;

                case "day":
                    return interval.count * 24 * 60 * 60 * 1000;

                case "week":
                    return interval.count * 7 * 24 * 60 * 60 * 1000;

                case "month":
                    return interval.count * 30 * 24 * 60 * 60 * 1000;

                case "year":
                    return interval.count * 365 * 24 * 60 * 60 * 1000;

                default:
                    return interval.count;
            }
        }


        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        chart = am4core.create("chart", am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0;

        chart.padding(0, 0, 0, 0);

        chart.zoomOutButton.disabled = true;
        chart.background.fill = am4core.color("#192348");
        // chart.seriesContainer.zIndex = -1;
        // chart.bottomAxesContainer.zIndex = -1;
        chart.maskBullets = false;
        // chart.background.opacity = 0.9;

        generateData();

        chart.data = SERIES_DATA[ID_SERIES_LINE];``

        xAxis = chart.xAxes.push(new am4charts.DateAxis());
        xAxis.renderer.grid.template.location = 0.5;
        xAxis.renderer.grid.template.stroke = am4core.color("#aaa");
        xAxis.renderer.labels.template.fill = am4core.color("#777");
        xAxis.renderer.labels.template.fontSize = 12;
        xAxis.renderer.maxGridDistance = 10;
        xAxis.dateFormats.setKey("second", "hh:mm:ss");
        xAxis.dateFormats.setKey("minute", "hh:mm:ss");
        xAxis.dateFormats.setKey("hour", "hh:mm:ss");
        // xAxis.dateFormats.setKey("minute", "hh:mm:ss");
        xAxis.periodChangeDateFormats.setKey("second", "[bold]hh:mm:ss");
        xAxis.periodChangeDateFormats.setKey("minute", "[bold]hh:mm:ss");
        xAxis.periodChangeDateFormats.setKey("hour", "[bold]hh:mm:ss");
        // xAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
        xAxis.renderer.inside = true;
        xAxis.renderer.axisFills.template.disabled = true;
        xAxis.renderer.ticks.template.disabled = true;
        // xAxis.baseInterval = {timeUnit: "second", count: 1};
        xAxis.startLocation = 0.5;
        xAxis.endLocation = 0.5;
        xAxis.gridIntervals.setAll([
            {timeUnit: "millisecond", count: 1},
            {timeUnit: "millisecond", count: 5},
            {timeUnit: "millisecond", count: 10},
            {timeUnit: "millisecond", count: 50},
            {timeUnit: "millisecond", count: 100},
            {timeUnit: "millisecond", count: 500},
            {timeUnit: "second", count: 1},
            {timeUnit: "second", count: 5},
            {timeUnit: "second", count: 10},
            {timeUnit: "second", count: 15},
            {timeUnit: "second", count: 30},
            {timeUnit: "minute", count: 1},
            {timeUnit: "minute", count: 2},
            {timeUnit: "minute", count: 5},
            {timeUnit: "minute", count: 10},
            {timeUnit: "minute", count: 30},
            {timeUnit: "hour", count: 1},
            {timeUnit: "hour", count: 3},
            {timeUnit: "hour", count: 6},
            {timeUnit: "hour", count: 12},
            {timeUnit: "day", count: 1},
            {timeUnit: "day", count: 2},
            {timeUnit: "day", count: 3},
            {timeUnit: "day", count: 4},
            {timeUnit: "day", count: 5},
            {timeUnit: "week", count: 1},
            {timeUnit: "month", count: 1},
            {timeUnit: "month", count: 2},
            {timeUnit: "month", count: 3},
            {timeUnit: "month", count: 6},
            {timeUnit: "year", count: 1},
            {timeUnit: "year", count: 2},
            {timeUnit: "year", count: 5},
            {timeUnit: "year", count: 10},
            {timeUnit: "year", count: 50},
            {timeUnit: "year", count: 100}
        ]);
        xAxis.strictMinMax = true;
        xAxis.interpolationDuration = 500;
        xAxis.rangeChangeDuration = 500;

        yAxis = chart.yAxes.push(new am4charts.ValueAxis());
        yAxis.renderer.grid.template.stroke = am4core.color("#aaa");
        yAxis.renderer.labels.template.fill = am4core.color("#777");
        yAxis.renderer.labels.template.fontSize = 12;
        yAxis.tooltip.disabled = true;
        yAxis.interpolationDuration = 500;
        yAxis.rangeChangeDuration = 500;
        yAxis.renderer.inside = true;
        yAxis.renderer.minLabelPosition = 0.05;
        yAxis.renderer.maxLabelPosition = 0.95;
        yAxis.renderer.axisFills.template.disabled = true;
        yAxis.renderer.ticks.template.disabled = true;
        yAxis.renderer.opposite = true;
        yAxis.renderer.minGridDistance = 30;


        // Line Area Series
        lineSeries = chart.series.push(new am4charts.LineSeries());
        lineSeries.id = ID_SERIES_LINE;
        lineSeries.dataFields.dateX = "date";
        lineSeries.dataFields.valueY = "value";
        lineSeries.interpolationDuration = 500;
        lineSeries.defaultState.transitionDuration = 0;
        // series.tensionX = 0.8;
        lineSeries.stroke = am4core.color("rgb(0, 136, 255)");
        lineSeries.fill = am4core.color("rgb(0, 136, 255)");
        lineSeries.fillOpacity = 0.08;

        currentSeries = lineSeries;

        // Add bullet at the front of the line
        lineSeriesBullet = _createSeriesBullet(lineSeries, 5, 5);


        // Candlestick Series.
        candlestickSeries = chart.series.push(new am4charts.CandlestickSeries());
        candlestickSeries.id = ID_SERIES_CANDLESTICK;
        candlestickSeries.dataFields.dateX = "date";
        candlestickSeries.dataFields.valueY = "close";
        candlestickSeries.dataFields.openValueY = "open";
        candlestickSeries.dataFields.lowValueY = "low";
        candlestickSeries.dataFields.highValueY = "high";
        candlestickSeries.hidden = true;

        candlestickSeriesBullet = _createSeriesBullet(candlestickSeries, 2, 10);
        candlestickSeriesBullet.hide();


        // Add date ranges.
        let xAxisRange1, xAxisRange2, xAxisRange3, yAxisRange1;

        function validateSeries(series, bullet) {
            return  function (e) {
                        if (series.isHiding || series.isHidden)
                            return;

                        let lastDataItem = series.dataItems.last,
                            time = lastDataItem.dateX.getTime(),
                            timeObj = new Date(time),
                            timeOffset = 500;

                        xAxis.max = time + _getValueFromInterval(xAxis.gridInterval) + 70 * 1000;

                        if (series.id === ID_SERIES_CANDLESTICK)
                            timeOffset = currentCandlestickSeriesDataInterval * 500;

                        xAxisRange1 = createAxisRange(
                            xAxisRange1,
                            xAxis,
                            new Date(time + timeOffset),
                            am4core.color("rgb(0, 136, 255)"),
                            "3,3"
                        );


                        let currentSeconds = SERIES_DATA[ID_SERIES_LINE][SERIES_DATA[ID_SERIES_LINE].length - 1].date.getSeconds(),
                            xAxisRange2OffsetSeconds = 30 - currentSeconds;

                        if (xAxisRange2OffsetSeconds <= 0)
                            xAxisRange2OffsetSeconds += 30;

                        let xAxisRange2Date = new Date(time + xAxisRange2OffsetSeconds * 1000 + timeOffset);

                        xAxisRange2 = createAxisRange(
                            xAxisRange2,
                            xAxis,
                            xAxisRange2Date,
                            am4core.color("rgb(238, 150, 30)"),
                            "3,3",
                            "arrow-right x-axis-range2",
                            "00:" + paddingNumberWithZero(xAxisRange2OffsetSeconds, 2),
                            "<i class='fas fa-hourglass-half'></i>",
                            {dx: -34, dy: -50}
                        );


                        let xAxisRange3Date = new Date(time + (xAxisRange2OffsetSeconds + 30) * 1000 + timeOffset);
                        xAxisRange3 = createAxisRange(
                            xAxisRange3,
                            xAxis,
                            xAxisRange3Date,
                            am4core.color("rgb(0, 164, 65)"),
                            null,
                            "arrow-left x-axis-range3",
                            dateToString(xAxisRange3Date),
                            "<i class='fas fa-flag'></i>",
                            {dx: 42, dy: -50}
                        );


                        let yAxisRange1Value = series.id === ID_SERIES_LINE
                                                    ? lastDataItem.dataContext.value
                                                    : lastDataItem.dataContext.close;
                        yAxisRange1 = createAxisRange(
                            yAxisRange1,
                            yAxis,
                            yAxisRange1Value,
                            am4core.color("rgb(0, 136, 255)"),
                            null,
                            "arrow-left y-axis-range1",
                            yAxisRange1Value,
                            null,
                            {dx: 3}
                        );

                        if (series.id === ID_SERIES_LINE) {
                            bullet.moveTo(lastDataItem.point);
                        } else {
                            bullet.moveTo(_getXYCoordinate(new Date(time + timeOffset), lastDataItem.dataContext.close));

                            let color = lastDataItem.dataContext.close >= lastDataItem.dataContext.open
                                            ? "rgb(37, 223, 119)"
                                            : "rgb(234, 102, 137)";

                            bullet.fill = am4core.color(color);
                            bullet.stroke = am4core.color(color);
                        }

                        bullet.validatePosition();
                    };
        }

        lineSeries.events.on("validated", validateSeries(lineSeries, lineSeriesBullet));
        candlestickSeries.events.on("validated", validateSeries(candlestickSeries, candlestickSeriesBullet));

        // Chart events.
        chart.events.on("datavalidated", function () {
            // xAxis.zoom({start: 0.2, end: 3}, false, true);
        });

        // Add cursor.
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panX";
        chart.cursor.xAxis = xAxis;


        seriesArray.push(lineSeries);
        seriesArray.push(candlestickSeries);



        // Add data.
        var oneSecTimer, candlestickSeriesDataTimer;

        document.addEventListener("visibilitychange", function() {
            if (document.hidden) {
                if (oneSecTimer)
                    clearInterval(oneSecTimer);

                if (candlestickSeriesDataTimer)
                    clearInterval(candlestickSeriesDataTimer);
            } else {
                startOneSecTimer();
                startCandlestickSeriesDataTimer();
            }
        }, false);

        function startOneSecTimer() {
            oneSecTimer = setInterval(function () {
                var lastLineSeriesDataItem = SERIES_DATA[ID_SERIES_LINE][SERIES_DATA[ID_SERIES_LINE].length - 1],
                    newLineSeriesDataItem = {
                        date: new Date(lastLineSeriesDataItem.date.getTime() + 1000),
                        value: parseFloat(Math.abs(lastLineSeriesDataItem.value + (Math.random() < 0.5 ? 1 : -1) * Math.random() * 5).toFixed(5))
                    };

                var lastCandlestickSeriesDataItem = SERIES_DATA[ID_SERIES_CANDLESTICK][SERIES_DATA[ID_SERIES_CANDLESTICK].length - 1];
                lastCandlestickSeriesDataItem.close = parseFloat(Math.abs(lastCandlestickSeriesDataItem.open - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10).toFixed(5));
                lastCandlestickSeriesDataItem.low = parseFloat(Math.abs(lastCandlestickSeriesDataItem.open - Math.random() * 10).toFixed(5));
                lastCandlestickSeriesDataItem.high = parseFloat(Math.abs(lastCandlestickSeriesDataItem.low + Math.random() * 10).toFixed(5));

                if (currentSeries.id === ID_SERIES_LINE) {
                    chart.addData(newLineSeriesDataItem, 0);
                } else {
                    SERIES_DATA[ID_SERIES_LINE].push(newLineSeriesDataItem);
                    chart.invalidateRawData();
                }
            }, 1000);
        }

        function startCandlestickSeriesDataTimer() {
            if (candlestickSeriesDataTimer)
                clearInterval(candlestickSeriesDataTimer);

            candlestickSeriesDataTimer = setInterval(function () {
                var lastCandlestickSeriesDataItem = SERIES_DATA[ID_SERIES_CANDLESTICK][SERIES_DATA[ID_SERIES_CANDLESTICK].length - 1],
                    open = parseFloat(Math.abs(lastCandlestickSeriesDataItem.close - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10).toFixed(5)),
                    close = parseFloat(Math.abs(open - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10).toFixed(5)),
                    low = parseFloat(Math.abs(open - Math.random() * 10).toFixed(5)),
                    high = parseFloat(Math.abs(low + Math.random() * 10).toFixed(5)),
                    newCandlestickSeriesDataItem = {
                        date: new Date(lastCandlestickSeriesDataItem.date.getTime() + currentCandlestickSeriesDataInterval * 1000),
                        open: open,
                        low: low,
                        high: high,
                        close: close
                    };

                if (currentSeries.id === ID_SERIES_LINE)
                    SERIES_DATA[ID_SERIES_CANDLESTICK].push(newCandlestickSeriesDataItem);
                else
                    chart.addData(newCandlestickSeriesDataItem, 0);

                startCandlestickSeriesDataTimer();
            }, currentCandlestickSeriesDataInterval * 1000);
        }

        startOneSecTimer();
        startCandlestickSeriesDataTimer();

        // Chart control events

        // Change data.
        function getCurrentDataId() {
            return document.querySelector(".chart-data-control-container .dropdown .dropdown-toggle .dropdown-item-container").getAttribute("data-id");
        }

        let changeChartDataElemList = document.querySelectorAll(".chart-data-control-container .dropdown .dropdown-menu a.dropdown-item");
        changeChartDataElemList.forEach(elem => {
            elem.addEventListener("click", function (e) {
                e.preventDefault();

                if (this.classList.contains('active'))
                    return;

                changeChartDataElemList.forEach(elem1 => elem1.classList.remove("active"));
                this.classList.add('active');

                let clonedNode = this.querySelector(".dropdown-item-container").cloneNode(true);

                document.querySelector(".chart-data-control-container .dropdown .dropdown-toggle .dropdown-item-container").replaceWith(clonedNode);

                generateData(currentSeries.id === ID_SERIES_LINE, currentSeries.id === ID_SERIES_CANDLESTICK)
                _updateChartData(SERIES_DATA[currentSeries.id]);
            });
        });

        // Move chart to current quote.
        document.querySelector("#move-chart-to-current-quote").addEventListener("click", function (e) {
            e.preventDefault();

            _moveCursorToLastDataPoint();
        });

        // Zoom
        let zoomControlElemList = document.querySelectorAll("[id^='zoom-chart-']");
        zoomControlElemList.forEach(elem => {
            elem.addEventListener("click", function (e) {
                e.preventDefault();

                if (elem.id === "zoom-chart-in") {
                    xAxis.start = Math.min(0.9, xAxis.start + 0.15);

                    if (xAxis.start >= 0.9)
                        this.setAttribute("disabled", "");

                    document.querySelector("#zoom-chart-out").removeAttribute("disabled");
                } else {
                    xAxis.start = Math.max(0, xAxis.start - 0.15);

                    if (xAxis.start <= 0)
                        this.setAttribute("disabled", "");

                    document.querySelector("#zoom-chart-in").removeAttribute("disabled");
                }
            });
        });

        // Toggle line area/candlestick series.
        let toggleMultiChartSeriesElemList = document.querySelectorAll("[id^='toggle-multi-chart-series-']");
        toggleMultiChartSeriesElemList.forEach(elem => {
            elem.addEventListener("click", function (e) {
                e.preventDefault();

                if (this.classList.contains('active'))
                    return;

                toggleMultiChartSeriesElemList.forEach(elem1 => elem1.classList.remove("active"));
                this.classList.add('active');

                let seriesId = this.id.substr(13);
                _updateChartData(SERIES_DATA[seriesId]);
                _toggleMultiChartSeries(seriesId);
            });
        });

        // Change the interval of candlestick series.
        let candlestickSeriesIntervalElemList = document.querySelectorAll("#toggle-multi-chart-series-candlestick + .dropdown-menu a.dropdown-item");
        candlestickSeriesIntervalElemList.forEach(elem => {
            elem.addEventListener("click", function (e) {
                e.preventDefault();

                if (this.classList.contains('active'))
                    return;

                candlestickSeriesIntervalElemList.forEach(elem1 => elem1.classList.remove("active"));
                this.classList.add('active');

                let interval = this.getAttribute("data-interval");
                _updateCandlestickSeriesDataInterval(interval);
            });
        });
    }); // end am4core.ready()
});


