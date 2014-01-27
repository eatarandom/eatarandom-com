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