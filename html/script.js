// select elements

let nav = document.querySelector(".side-nav");
const navPageLinks = [];
nav
  .querySelectorAll(".side-nav-fixed .nav-list .nav-item")
  .forEach((v) => navPageLinks.push(v.querySelector("a")));

const pageOpaque = document.querySelector(".page-opaque");
const page = document.querySelector(".page");
const openMenu = document.querySelector(".open");
const openMenuScroll = document.querySelector(".menu-open-small");
const menu = document.querySelector(".menu-icon.open");
const menuClose = document.querySelector(".menu-icon.close");

// nav.scrollPadding = document.querySelector(".side-nav-scroll-padding");
nav.fixedElement = document.querySelector(".side-nav-fixed");
nav.topParent = document.querySelector(".top-nav");
Object.assign(nav, {
  sideContents: [menu, pageOpaque, page, openMenuScroll],
  activeClass: "active",
  scrollClass: "scroll",
  open: function () {
    this.classList.add(this.activeClass);
    this.sideContents.forEach((v) => v.classList.add(this.activeClass));
  },
  close: function () {
    this.classList.remove(this.activeClass);
    this.sideContents.forEach((v) => v.classList.remove(this.activeClass));
  },
  scrollFix: function () {
    const h = getComputedStyle(nav.topParent, "style").height;
    const diff = window.scrollY - h.replace("px", "");
    if (diff > 0) {
      nav.fixedElement.classList.add(nav.scrollClass);
      openMenuScroll.classList.add(nav.scrollClass);
    } else {
      nav.fixedElement.classList.remove(nav.scrollClass);
      openMenuScroll.classList.remove(nav.scrollClass);
    }
  },
});

openMenu.addEventListener("click", () => nav.open());
openMenuScroll.addEventListener("click", () => nav.open());

menuClose.addEventListener("click", () => nav.close());
pageOpaque.addEventListener("click", () => nav.close());
window.addEventListener("scroll", () => {
  nav.scrollFix();
});
navPageLinks.forEach((a) => {
  a.addEventListener("click", () => {
    nav
      .querySelector(".side-nav-fixed .nav-list .nav-item a.current")
      .classList.remove("current");
    a.classList.add("current");
  });
});
