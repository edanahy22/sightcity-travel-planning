let landingBackground = $('body')
landingBackground.addClass('slideshow')

let backgrounds = [
    'url(/images/slideshow/greece.png)',
    'url(/images/slideshow/mountains.jpg)',
    'url(/images/slideshow/nyc.png)',
    'url(/images/slideshow/streets.png)',
    'url(/images/slideshow/seattle.png)',
    'url(/images/slideshow/beach.png)'
]

let current = 0;

function nextBackground() {
    current++;
    if (current >= backgrounds.length) {
        current = 0
    }
    landingBackground.css({
        'background-image': backgrounds[current],
        'background-repeat': 'no-repeat',
        'background-position': 'center',
    })
}
setInterval(nextBackground, 5000);

landingBackground.css('background-image', backgrounds[0]);