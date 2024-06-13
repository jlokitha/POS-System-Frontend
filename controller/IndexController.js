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
});
