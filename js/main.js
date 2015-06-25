'use strict';
var wavesurfer = Object.create(WaveSurfer);
$(document).ready(function () {

    var options = {
        chart: {
            zoomType: 'x',
            renderTo: 'container',
            type: 'areaspline'
        },
        title: {
            text: 'Shows F0 using Praat script'
        },
        legend: {
            enabled: false
        },
        series: [{
                pointInterval: 1
            }],
        yAxis: {
            title: {
                text: 'Frequency - Hz'
            }
        },
        xAxis: {
            /*type: 'datetime',
             tickInterval: 1*/
        },
        tooltip: {
            shared: true,
            crosshairs: true
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        credits: {
            enabled: false
        }
    };
    
    $.getJSON("serve.php", {file: "test.wav"})
            .done(function (result) {
                var f0 = [];
                for (var i = 0; i < result.length; i++) {
                    f0[i] = result[i].frequency;
                }

               
                options.series[0].data = f0;
                // options.series[1].data = f0; 
                var chart = new Highcharts.Chart(options);
            });
            
    // Wavesurfer


    var woptions = {
        container: '#wav-container',
        waveColor: 'violet',
        progressColor: 'purple',
        loaderColor: 'purple',
        cursorColor: 'navy',
        minPxPerSec: 100,
        normalize: true,
    };
    /* Progress bar */
    (function () {
        var progressDiv = document.querySelector('#progress-bar');
        var progressBar = progressDiv.querySelector('.progress-bar');
        var showProgress = function (percent) {
            progressDiv.style.display = 'block';
            progressBar.style.width = percent + '%';
        };
        var hideProgress = function () {
            progressDiv.style.display = 'none';
        };
        wavesurfer.on('loading', showProgress);
        wavesurfer.on('ready', hideProgress);
        wavesurfer.on('destroy', hideProgress);
        wavesurfer.on('error', hideProgress);
    }());
    wavesurfer.init(woptions);
    wavesurfer.on('ready', function () {
        var timeline = Object.create(WaveSurfer.Timeline);
        timeline.init({
            wavesurfer: wavesurfer,
            container: "#wave-timeline"
        });
        /*
        var spectrogram = Object.create(WaveSurfer.Spectrogram);
        spectrogram.init({
            wavesurfer: wavesurfer,
            container: '#wave-spectrogram'
        });
        */
    });
    wavesurfer.load('test.wav');
});
function play() {

    wavesurfer.play();
}

function pause() {
    wavesurfer.pause();
}


