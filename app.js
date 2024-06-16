$(document).ready(function() {
    var firstImage = 'media/pfp.png';
    var secondImage = 'media/pfp2.png';
    var currentImage = firstImage;

    var firstBio = 'Developer';
    var secondBio = 'Nice easter egg, huh!?';
    var currentBio = firstBio;

    var firstUsername = 'Telmo Sousa';
    var secondUsername = 'telmo-sousa';
    var currentUsername = firstUsername;

    var fadeOutTriggered = false;
    var isDarkMode = true;

    function toggleMode() {
        if (isDarkMode) {
            $('body').removeClass('dark-mode').addClass('light-mode');
        } else {
            $('body').removeClass('light-mode').addClass('dark-mode');
        }
        isDarkMode = !isDarkMode;
    }

    $('.profile-image').click(function() {
        setTimeout(() => {
            toggleMode();
        }, 500);

        $('#toggleColorButton').click();

        $(this).addClass('glitch-effect');
        setTimeout(() => {
            $(this).removeClass('glitch-effect');
            $(this).fadeOut(300, function() {
                if (currentImage === firstImage) {
                    $(this).attr('src', secondImage).fadeIn(300);
                    currentImage = secondImage;

                    $('.bio').text(secondBio);
                    currentBio = secondBio;

                    $('h1').text(secondUsername);
                    currentUsername = secondUsername;
                } else {
                    $(this).attr('src', firstImage).fadeIn(300);
                    currentImage = firstImage;

                    $('.bio').text(firstBio);
                    currentBio = firstBio;

                    $('h1').text(firstUsername);
                    currentUsername = firstUsername;
                }
            });
        }, 300);
    });

    $(window).scroll(function() {
        var windowHeight = $(window).height();
        var mainSectionHeight = $('.main-section').outerHeight();
        var currentScroll = $(window).scrollTop();

        var fadeOutStart = $('.main-section').offset().top + (mainSectionHeight / 2) - (windowHeight / 2);

        if (currentScroll > fadeOutStart) {
            var opacity = 1 - ((currentScroll - fadeOutStart) / (mainSectionHeight / 2));
            if (opacity >= 0) {
                $('.profile-image, h1, .bio').css('opacity', opacity);
                fadeOutTriggered = true;
            }
        } else if (!fadeOutTriggered) {
            $('.profile-image, h1, .bio').css('opacity', 1);
        }
    });

    $('.page').on('touchstart', function() {
        $(this).find('.hidden-text-container').css('opacity', 1);
    });

    $('.page').on('touchend', function() {
        $(this).find('.hidden-text-container').css('opacity', 0);
    });
    
});