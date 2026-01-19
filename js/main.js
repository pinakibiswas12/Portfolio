(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    

    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });

    
})(jQuery);

function toggleAbout() {
    var x = document.getElementById("about-details");
    var btn = document.querySelector("a[onclick='toggleAbout()']");
    
    if (x.style.display === "none") {
        x.style.display = "block";
        btn.textContent = "Read Less";
    } else {
        x.style.display = "none";
        btn.textContent = "Read More";
    }
}

// let scrollBox = document.getElementById("noticeScroll");

// let scrollSpeed = 1; // pixels per frame

// function autoScroll() {
//     scrollBox.scrollTop += scrollSpeed;

//     // When end is reached → restart
//     if (scrollBox.scrollTop >= scrollBox.scrollHeight - scrollBox.clientHeight) {
//         scrollBox.scrollTop = 0;
//     }
// }

// setInterval(autoScroll, 50); // smooth scrolling

let scrollBox = document.getElementById("noticeScroll");
let btnAll = document.getElementById("viewAllBtn");
let expanded = false;
let scrollSpeed = 1;

// Auto scroll function
function autoScroll() {
    scrollBox.scrollTop += scrollSpeed;
    if (scrollBox.scrollTop >= scrollBox.scrollHeight - scrollBox.clientHeight) {
        scrollBox.scrollTop = 0;
    }
}

// Start auto scroll
let autoScrollInterval = setInterval(autoScroll, 50);

// Expand / Collapse logic
btnAll.addEventListener("click", function () {
    if (!expanded) {
        // Expand → Show full text
        scrollBox.style.height = "auto";
        scrollBox.style.overflow = "visible";
        btnAll.textContent = "Show Less";

        clearInterval(autoScrollInterval);  // ⛔ STOP auto scroll
        expanded = true;
    } else {
        // Collapse → Return to normal scroll box
        scrollBox.style.height = "250px";
        scrollBox.style.overflow = "hidden";
        btnAll.textContent = "Click to view all activities";

        autoScrollInterval = setInterval(autoScroll, 50);  // ▶ RESTART auto scroll
        expanded = false;
    }
});
