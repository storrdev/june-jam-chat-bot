import anime from 'animejs/lib/anime.es.js';

const ws = new WebSocket('ws://localhost:6969');

// Init Jerrys
const ids = ['left', 'bottom', 'right', 'top'];

ids.forEach((id) => {
    const img = document.createElement('img');

    img.src = '/assets/images/jerry-finger-guns.png';
    img.id = id;
    img.className = 'jerry';

    document.getElementById('body').appendChild(img);
});

// WS Stuff
ws.onerror = (e) => {
    console.error(e);
};

ws.onmessage = (e) => {
    console.log(e.data);

    if (e.data === 'jerry') {
        jerry();
    }
};

ws.onopen = (e) => {
    console.log(e);
};

// Animations

const jerry = () => {
    // create Jerry's
    const stickTime = 10000;
    const height = 400;

    // Create a timeline with default parameters
    var tl = anime.timeline();

    // In

    tl.add({
        targets: '.jerry#top',
        translateY: [-height, 0],
        translateZ: 0,
        rotateZ: [180, 180],
    })
        .add({
            targets: '.jerry#right',
            translateX: [height, 0],
            translateZ: 0,
            rotateZ: [-90, -90],
        })
        .add({
            targets: '.jerry#bottom',
            translateY: [height, 0],
            translateZ: 0,
        })
        .add({
            targets: '.jerry#left',
            translateX: [-height, 0],
            translateZ: 0,
            rotateZ: [90, 90],
        })
        .add(
            {
                targets: '.jerry#top',
                translateY: [0, -height],
                rotateZ: [180, 180],
            },
            stickTime
        )
        .add(
            {
                targets: '.jerry#right',
                translateX: [0, height],
                rotateZ: [-90, -90],
            },
            stickTime
        )
        .add(
            {
                targets: '.jerry#bottom',
                translateY: [0, height],
            },
            stickTime
        )
        .add(
            {
                targets: '.jerry#left',
                translateX: [0, -height],
                rotateZ: [90, 90],
            },
            stickTime
        );
};
