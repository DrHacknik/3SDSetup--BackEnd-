var global_version = {};

window.onload = function () {
    ;
    (function () {
        'use strict';

        var regions = {
            'E': {},
            'U': {},
            'J': {},
            'K': {}
        }

        var NUPs_1 = {
            '7': regions,
            '8': regions,
            '9': regions,
            '10': regions,
            '11': regions,
            '12': regions,
            '13': regions,
            '14': regions,
            '15': regions,
            '16': regions,
            '17': regions,
            '18': regions,
            '19': regions,
            '20': regions,
            '21': regions,
            '22': regions,
            '23': regions,
            '24': regions,
            '25': regions,
            '26': regions,
            '27': regions,
            '28': regions,
            '29': regions,
            '30': regions,
            '31': regions,
            '32': regions,
            '33': regions,
            '34': regions,
            '35': regions,
            '36': regions,
            '37': regions,
            '38': regions,
            '39': regions,
            '137': regions,
            '999': regions
        }

        var zeroMicro_1 = {
            '0': NUPs_1
        }

        var oldOptions = {
            '9': {
                '0': zeroMicro_1,
                '1': zeroMicro_1,
                '2': zeroMicro_1,
                '3': zeroMicro_1,
                '4': zeroMicro_1,
                '5': zeroMicro_1,
                '6': zeroMicro_1,
                '7': zeroMicro_1,
                '8': zeroMicro_1,
                '9': zeroMicro_1
            },
            '10': {
                '0': zeroMicro_1,
                '1': zeroMicro_1,
                '2': zeroMicro_1,
                '3': zeroMicro_1,
                '4': zeroMicro_1,
                '5': zeroMicro_1,
                '6': zeroMicro_1,
                '7': zeroMicro_1
            },
            '11': {
                '0': zeroMicro_1,
                '1': zeroMicro_1,
                '2': zeroMicro_1
            }
        }

        var options = {
            'OLD': oldOptions,
            'NEW': oldOptions
        }

        var state = {};

        var range = function (a, b) {
            var xs = [];
            for (var i = a; i < b; ++i)
                xs.push(i);
            return xs;
        };

        var update = function (id) {
            var node = document.querySelector('[data-id="' + id + '"]');

            if (!node) {
                return;
            }

            range(id, 5).map(function (i) {
                delete state[i];
            });

            node.innerHTML = '';

            var lens = range(0, id).reduce(function (acc, i) {
                return acc[state[i]] || {};
            }, options);

            Object.keys(lens).map(function (v) {
                var opt = document.createElement('option');
                opt.value = v;
                opt.innerHTML = v;

                node.appendChild(opt);
            });
            state[id] = state[id] || Object.keys(lens)[0];

            update(id + 1);
        };

        /* NodeList does not have map */
        var selects = document.querySelectorAll('.firmware-form select');
        for (var i = 0; i < selects.length; ++i) {
            selects[i].addEventListener('change', function (e) {
                state[e.target.dataset.id] = e.target.value;
                update(parseInt(e.target.dataset.id, 10) + 1);
            });
        }

        update(0);

        global_version = state;
    })();
    localStorage.global = JSON.stringify(global_version);
}
