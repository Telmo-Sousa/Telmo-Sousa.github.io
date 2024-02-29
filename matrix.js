$(document).ready(function() {
    const matrixContainer = $('.matrix-rain');

    for (let i = 0; i < 50; i++) {
        const character = $('<span class="character">' + getRandomCharacter() + '</span>');
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 2;

        character.css({
            animationDuration: duration + 's',
            animationDelay: delay + 's',
            left: Math.random() * 100 + 'vw',
            top: -1 + 'vh',
        });

        matrixContainer.append(character);
    }

    function getRandomCharacter() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return characters[Math.floor(Math.random() * characters.length)];
    }
});