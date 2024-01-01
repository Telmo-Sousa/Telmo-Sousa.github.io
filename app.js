$(document).ready(function() {
    var firstImage = 'media/circlepfp.png';
    var secondImage = 'media/pfp.png';
    var currentImage = firstImage;

    var firstBio = 'Junior Developer';
    var secondBio = 'Nice easter egg, huh!?';
    var currentBio = firstBio;

    var firstUsername = 'Telmo Sousa';
    var secondUsername = 'telmo-sousa';
    var currentUsername = firstUsername;

    var fadeOutTriggered = false; // Flag to track if fade-out has been triggered
    var isDarkMode = true; // Flag to track current mode

    function toggleMode() {
        if (isDarkMode) {
            $('body').removeClass('dark-mode').addClass('light-mode');
        } else {
            $('body').removeClass('light-mode').addClass('dark-mode');
        }
        isDarkMode = !isDarkMode;
    }

    $('.profile-image').click(function() {
        toggleMode(); // Toggle mode when clicking the profile image

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

    // Adding the scroll-based fade-out effect at 1/5th of the page
    $(window).scroll(function() {
        var windowHeight = $(window).height();
        var documentHeight = $(document).height();
        var fifthOfPage = documentHeight / 5; // Calculate 1/5th of the page
        var currentScroll = $(window).scrollTop();

        var fadeOutStart = fifthOfPage - windowHeight / 2; // Set fade-out start at 1/5th of the page

        if (currentScroll > fadeOutStart) {
            var opacity = 1 - ((currentScroll - fadeOutStart) / (fifthOfPage - fadeOutStart));
            if (opacity >= 0) {
                $('.profile-image, h1, .bio').css('opacity', opacity);
                fadeOutTriggered = true; // Set the flag once fade-out is triggered
            }
        } else if (!fadeOutTriggered) {
            $('.profile-image, h1, .bio').css('opacity', 1);
        }
    });
});