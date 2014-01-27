define(function () {
    'use strict';

    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        links = document.getElementsByTagName('a'),
        color = 0;

    setupTracking();
    draw();


    //
    window.AudioContext = window.AudioContext ||
        window.webkitAudioContext;

    var ctx = new AudioContext();

    navigator.getUserMedia({
        audio: true
    }, function (stream) {
        var microphone = ctx.createMediaStreamSource(stream);
        var filter = ctx.createBiquadFilter();

        // microphone -> filter -> destination.
        microphone.connect(filter);
        filter.connect(context.destination);
    }, function () {
        console.log('error');
    });
    //


    function setupTracking() {
        for (var i = 0, l = links.length; i < l; i++) {
            links[i].addEventListener('click', function (e) {
                var data = this.dataset;
                if (_gaq) {
                    _gaq.push(['_trackEvent', data.category, data.action, data.label, parseInt(data.value), !! data.nonInteraction]);
                }
            });
        }
    }

    function draw() {
        color = color + .25;
        context.fillStyle = 'hsl(' + color + ', 100%, 70%)';
        context.fillRect(0, 0, width, height);
        requestAnimationFrame(draw);
    }

    window.onresize = function () {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };

});