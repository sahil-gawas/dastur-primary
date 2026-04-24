
// about tabs

function activeTab(evt, id) {

  // Get all elements with class="tablinks" and remove the class "active"
  let tabactive = document.getElementsByClassName("TabButtonSelected");
  tabactive[0].className = tabactive[0].className.replace(" TabButtonSelected", "");

  document.getElementById(id).style.display = "block";
  evt.currentTarget.className += " TabButtonSelected";

  displaySection(evt, id)
}

function displaySection(evt, id) {

  let tabactive = document.getElementsByClassName("tab-section");
  tabactive[0].className = tabactive[0].className.replace(" d-chart-show", "d-chart-n");
  // add below line of codes
  [...document.querySelectorAll('div.tab-section')].forEach(item => item.style.display = 'none')
  document.getElementById("Section" + id).style.display = "block";
  evt.currentTarget.className += " d-chart-show";

}


// mobile menu

$(document).ready(function () {

  const $menu = $(".menu");
  const $openBtn = $(".canva_expander");
  const $closeBtn = $(".cross");
  $menu.removeClass("is-active").attr("inert", "");
  $closeBtn.hide();

  $openBtn.on("click", function (e) {
    e.preventDefault();

    $menu.addClass("is-active").removeAttr("inert");
    $closeBtn.show();
    $openBtn.hide();
    $("body").addClass("noscroll");
    $menu.find("a").first().focus();
  });

  /* CLOSE MENU */
  $closeBtn.on("click", function (e) {
    e.preventDefault();

    $menu.removeClass("is-active").attr("inert", "");
    $closeBtn.hide();
    $openBtn.show();
    $(".nav__sub").removeClass("is-active");
    $("body").removeClass("noscroll");
    $openBtn.focus();
  });

  /* SUB MENU OPEN */
  $menu.on("click", ".nav__submenu", function (e) {
    e.preventDefault();

    const $sub = $(this).next(".nav__sub");

    $sub.addClass("is-active");
    $menu.addClass("has-submenu");
    $sub.find("a").first().focus();
  });



  /* SUB MENU CLOSE */
  $menu.on("click", ".sub__close", function (e) {
    e.preventDefault();

    const $sub = $(this).closest(".nav__sub");
    $sub.removeClass("is-active");

    if ($menu.find(".nav__sub.is-active").length === 0) {
      $menu.removeClass("has-submenu");
    }
    $sub.prev(".nav__submenu").focus();
  });


  /* CUSTOM SELECT */
  const $customSelect = $(".custom-select");
  const $trigger = $(".select-trigger");

  $trigger.on("click", function (e) {
    e.stopPropagation();
    $customSelect.toggleClass("active");
    $menu.toggleClass("no-scroll", $customSelect.hasClass("active"));
  });

  $(".select-options li").on("click", function () {
    const url = $(this).data("url");
    if (url) window.open(url, "_blank");

    $customSelect.removeClass("active");
    $menu.removeClass("no-scroll");
  });

  $(document).on("click", function () {
    $customSelect.removeClass("active");
    $menu.removeClass("no-scroll");
  });

});





/* GALLERY LIGHTBOX (UNCHANGED) */

const body = document.body;
const items = document.querySelectorAll(".gallery__item");
const modalGallery = document.createElement("section");
const modalImg = document.createElement("img");
const modalPrev = createButton(prevItem);
const modalNext = createButton(nextItem);
const modalClose = createButton(closeModal);
let currentItem = 0;

modalGallery.classList.add("gallery__modal");
modalPrev.classList.add("gallery__navigation--prev");
modalNext.classList.add("gallery__navigation--next");
modalClose.classList.add("gallery__navigation--close");

function createButton(action) {
  const button = document.createElement("button");
  button.addEventListener("click", action);
  return button;
}

function prevItem() {
  currentItem = (currentItem - 1 + items.length) % items.length;
  showModal();
}

function nextItem() {
  currentItem = (currentItem + 1) % items.length;
  showModal();
}

function closeModal() {
  modalGallery.remove();
  body.classList.remove("noscroll");
}

function showModal() {
  const clickedImage = items[currentItem].querySelector("img");
  modalImg.src = clickedImage.src;
  modalImg.alt = clickedImage.alt;
  modalGallery.innerHTML = "";
  modalGallery.append(modalImg, modalPrev, modalNext, modalClose);
  body.appendChild(modalGallery);
}

items.forEach((item, index) => {
  item.addEventListener("click", function () {
    currentItem = index;
    showModal();
    body.classList.add("noscroll");
  });
});

document.body.addEventListener("keyup", (ev) => {
  if (ev.key === "Escape" && body.contains(modalGallery)) {
    closeModal();
  }
});
