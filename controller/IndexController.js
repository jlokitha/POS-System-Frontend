$(document).ready(() => {
  const sideBar = document.getElementsByClassName("side-bar")[0];
  const menu = document.getElementById("menu");
  const close = document.getElementById("close");

  menu.addEventListener("click", function () {
    sideBar.classList.toggle("active");
    menu.style.display = "none";
    close.style.display = "block";
  });

  close.addEventListener("click", function () {
    sideBar.classList.toggle("active");
    menu.style.display = "block";
    close.style.display = "none";
  });

  $("section").hide();
  $("#home").show();

  $(".nav-item").click(function () {
    $("section").hide();

    let showSection = $(this).attr("href");
    let secHeader = $(this).attr("data");

    $(showSection).show();
    $("#section-name").text(secHeader);
  });

  let currentSlide = 0;
  const slideInterval = 3000; // Change slide every 3 seconds
  let autoSlide;

  function showSlide(index) {
    const $slides = $(".carousel-item");
    const totalSlides = $slides.length;

    if (index >= totalSlides) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = totalSlides - 1;
    } else {
      currentSlide = index;
    }

    const offset = -currentSlide * 100;
    $(".carousel-inner").css("transform", "translateX(" + offset + "%)");

    $slides.each(function (i) {
      $(this).toggleClass("active", i === currentSlide);
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, slideInterval);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  showSlide(currentSlide);
  startAutoSlide();

  $(".carousel").mouseenter(stopAutoSlide).mouseleave(startAutoSlide);

  $(".prev").click(function () {
    prevSlide();
  });

  $(".next").click(function () {
    nextSlide();
  });
});
