"use strict";
import * as validationModule from "./validationModule.js";

// APIs URL
let nowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=961415d22bc62f337bb599ca45cf0653&language=en-US&page=1`;
let popular = `https://api.themoviedb.org/3/movie/popular?api_key=961415d22bc62f337bb599ca45cf0653&language=en-US&page=1`;
let topRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=961415d22bc62f337bb599ca45cf0653&language=en-US&page=1`;
let trending = `https://api.themoviedb.org/3/trending/movie/week?api_key=961415d22bc62f337bb599ca45cf0653`;
let upComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=961415d22bc62f337bb599ca45cf0653&language=en-US&page=1`;
let currentApi = nowPlaying;
let currentMovies;

// let categories = document.querySelectorAll
$(".category").click(function () {
    if ($(this).text() == "Now playing") {
        currentApi = nowPlaying;
        getDate();
    } else if ($(this).text() == "Popular") {
        currentApi = popular;
        getDate();
    } else if ($(this).text() == "Top Rated") {
        currentApi = topRated;
        getDate();
    } else if ($(this).text() == "Trending") {
        currentApi = trending;
        getDate();
    } else if ($(this).text() == "Upcoming") {
        currentApi = upComing;
        getDate();
    }
})

// Get Data from API
async function getDate() {
    let url = currentApi;
    let response = await fetch(`${url}`);
    let data = await response.json();
    currentMovies = data.results;
    displayData(currentMovies);
}
getDate();

// fill data in HTML
function displayData(movies) {
    let posts = "";
    for (let i = 0; i < movies.length; i++) {
        posts += `
        <div class="col-md-6 col-xl-4">
        <div class="movie">
        <img src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" onerror="src='images/notFound.jpg'" alt="movie" class="w-100">
        <div class="movie-cap">
            <h2 class="font-bold">${movies[i].original_title}</h2>
            <p class="font-light">${movies[i].overview}</p>
            <h6 class="font-light">rate: ${movies[i].vote_average}</h6>
            <h6 class="font-light">${movies[i].release_date}</h6>
        </div>
        </div>
    </div>`
    };
    document.getElementById("posts").innerHTML = posts;
}

// get movies search  word
async function getMoviesByWord(word) {
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=961415d22bc62f337bb599ca45cf0653&query=${word}&language=en-US&page=1&include_adult=false`);
    let date = await response.json();
    let allSearchResult = date.results;
    currentMovies = allSearchResult
    displayData(allSearchResult);
}

// Search By Word in all movies
let wordInput = document.getElementById("searchAllMovies")
wordInput.addEventListener("input", function () {
    let searchText = wordInput.value;
    if (searchText != "") {
        getMoviesByWord(searchText);
    } else {
        getDate();
    }
})

// Search in current movies
let searchCurrent = document.getElementById("searchCurrent")
searchCurrent.addEventListener("input", function () {
    let searchResult = currentMovies.filter((movie) => {
        return movie.original_title.toLowerCase().includes(searchCurrent.value.toLowerCase());
    })
    displayData(searchResult);
})

// show, hide side bar and animate li
$(".burger-icon i").click(function () {
    let navWidth = $(".nav-bar").innerWidth();
    if ($("nav").css("left") == `${-navWidth}px`) {
        $("nav").animate({ "left": 0 }, 500, "swing");
        $(".nav-bar li").eq(0).animate({ "opacity": 1, "paddingTop": 0 }, 800);
        $(".nav-bar li").eq(1).animate({ "opacity": 1, "paddingTop": 0 }, 900);
        $(".nav-bar li").eq(2).animate({ "opacity": 1, "paddingTop": 0 }, 1000);
        $(".nav-bar li").eq(3).animate({ "opacity": 1, "paddingTop": 0 }, 1100);
        $(".nav-bar li").eq(4).animate({ "opacity": 1, "paddingTop": 0 }, 1200);
        $(".nav-bar li").eq(5).animate({ "opacity": 1, "paddingTop": 0 }, 1300);
        $(".burger-icon i").removeClass("fa-bars").addClass("fa-xmark").css({ "color": "#ff655c", "transition": "color 0.3s" });
    } else {
        $("nav").animate({ "left": -navWidth }, 500, "swing");
        $(".nav-bar li").eq(5).animate({ "opacity": 0, "paddingTop": "300px" }, 400);
        $(".nav-bar li").eq(4).animate({ "opacity": 0, "paddingTop": "300px" }, 400);
        $(".nav-bar li").eq(3).animate({ "opacity": 0, "paddingTop": "300px" }, 400);
        $(".nav-bar li").eq(2).animate({ "opacity": 0, "paddingTop": "300px" }, 400);
        $(".nav-bar li").eq(1).animate({ "opacity": 0, "paddingTop": "300px" }, 400);
        $(".nav-bar li").eq(0).animate({ "opacity": 0, "paddingTop": "300px" }, 400);
        $(".burger-icon i").addClass("fa-bars").removeClass("fa-xmark").css({ "color": "#000", "transition": "color 0.3s" });
    };
})

// fade in side bar
$(document).ready(function () {
    $(".side-bar").css({ "opacity": 1, "transition": "opacity 0.5s" });
})

// enhance nav height on resize window
$(window).resize(function () {
    let currentWindowH = $(window).innerHeight();
    $("#height").css({ "height": `${currentWindowH}px`, "transition": "height 0.3s" });
})

// user name validation
$("#userName").change(function () {

    let nameInputVal = $("#userName").val();
    if (validationModule.validateUserName(nameInputVal) == true) {
        $(this).removeClass("is-invalid").addClass("is-valid");
        $(this).next().animate({ "left": "-100%" }, 300, function () {
            $(this).css("display", "none");
        });
    } else {
        $(this).removeClass("is-valid").addClass("is-invalid");
        $(this).next().css("display", "block").animate({ "left": 0 }, 300);
    };
    switchBTN();
});

//user email validation
$("#userEmail").change(function () {
    let mailVal = $("#userEmail").val();
    if (validationModule.validateUserEmail(mailVal) == true) {
        $(this).removeClass("is-invalid").addClass("is-valid");
        $(this).next().animate({ "left": "-100%" }, 300, function () {
            $(this).css("display", "none");
        });
    } else {
        $(this).removeClass("is-valid").addClass("is-invalid");
        $(this).next().css("display", "block").animate({ "left": 0 }, 300);
    };
    switchBTN();
});

//user phone validation
$("#userPhone").change(function () {
    let phoneVal = $("#userPhone").val();
    if (validationModule.validateUserPhone(phoneVal) == true) {
        $(this).removeClass("is-invalid").addClass("is-valid");
        $(this).next().animate({ "left": "-100%" }, 300, function () {
            $(this).css("display", "none");
        });
    } else {
        $(this).removeClass("is-valid").addClass("is-invalid");
        $(this).next().css("display", "block").animate({ "left": 0 }, 300);
    };
    switchBTN();
});

//user age validation
$("#userAge").change(function () {
    let ageVal = $("#userAge").val();
    if (validationModule.validateUserAge(ageVal) == true) {
        $(this).removeClass("is-invalid").addClass("is-valid");
        $(this).next().animate({ "left": "-100%" }, 300, function () {
            $(this).css("display", "none");
        })
    } else {
        $(this).removeClass("is-valid").addClass("is-invalid");
        $(this).next().css("display", "block").animate({ "left": 0 }, 300);
    };
    switchBTN();
});

//user password validation
$("#userPassword").change(function () {
    let passwordVal = $("#userPassword").val();
    if (validationModule.validateUserPassword(passwordVal) == true) {
        $(this).removeClass("is-invalid").addClass("is-valid");
        $(this).next().animate({ "left": "-100%" }, 300, function () {
            $(this).css("display", "none");
        })
    } else {
        $(this).removeClass("is-valid").addClass("is-invalid");
        $(this).next().css("display", "block").animate({ "left": 0 }, 300);
    };
    if ($("#rePassword").val() != "" && $("#userPassword").val() != $("#rePassword").val()) {
        $("#rePassword").removeClass("is-valid").addClass("is-invalid");
        $("#rePassword").next().css("display", "block").animate({ "left": 0 }, 300);
    }
    else if ($("#userPassword").val() === $("#rePassword").val()) {
        $("#rePassword").removeClass("is-invalid").addClass("is-valid");
        $("#rePassword").next().animate({ "left": "-100%" }, 300, function () {
            $(this).css("display", "none");
        })
    }
    switchBTN();
});

//repassword validation
$("#rePassword").change(function () {
    let passwordVal = $("#userPassword").val();
    let rePasswordVal = $("#rePassword").val();
    if (validationModule.validateRePassword(passwordVal, rePasswordVal) == true) {
        $(this).removeClass("is-invalid").addClass("is-valid");
        $(this).next().animate({ "left": "-100%" }, 300, function () {
            $(this).css("display", "none");
        })
    } else {
        $(this).removeClass("is-valid").addClass("is-invalid");
        $(this).next().css("display", "block").animate({ "left": 0 }, 300);
    };
    switchBTN();
});

// enable or disable submit BTN
function switchBTN() {
    let userName = validationModule.validateUserName($("#userName").val());
    let userEmail = validationModule.validateUserEmail($("#userEmail").val());
    let userPhone = validationModule.validateUserPhone($("#userPhone").val());
    let userAge = validationModule.validateUserAge($("#userAge").val());
    let userPassword = validationModule.validateUserPassword($("#userPassword").val());
    let rePassword = validationModule.validateRePassword($("#userPassword").val(), $("#rePassword").val());
    if (userName && userEmail && userPhone && userAge && userPassword && rePassword == true) {
        $("#submit").removeAttr("disabled");
    } else {
        $("#submit").attr("disabled", "true");
    }
}
