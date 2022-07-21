// document.body.classList.add('slideshow')

let landingBackground = $('body')
landingBackground.addClass('slideshow')

let backgrounds = [
    'url(/images/slideshow/greece.png)',
    'url(/images/slideshow/nyc.png)',
    'url(/images/slideshow/streets.png)',
    'url(/images/slideshow/seattle.png)',
]

let current = 0;

// nextBackground()

function nextBackground() {
    current++;
    // current = current % backgrounds.length;
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