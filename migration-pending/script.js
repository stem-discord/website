/*global Vue*/
const title = new Vue({
  el: "#title",
  data: {
    header: "STEM Discord",
  },
});

const sideNav = new Vue({
  el: "#side-nav",
  data: {
    links: [
      {
        text: "Home",
        destination: "#",
      },
      {
        text: "Discord",
        destination: "https://discord.gg/stem",
      },
      {
        text: "Server Rules",
        destination: "rules.html",
      },
      {
        text: "About",
        destination: "#",
      },
    ],
  },
});

const mainMessage = new Vue({
  el: "#main-message",
  data: {
    messageHeader: "Welcome to STEM",
    paragraphs: [
      {
        subheading: "About the server",
        mainText:
          "A server dedicated to both tutoring and technical discussion in\n" +
          "                        STEM (Science, Technology, Engineering, Mathematics) topics for\n" +
          "                        students, professionals, and enthusiasts of all ages (13+) and\n" +
          "                        backgrounds. Whether you're a student or just interested in\n" +
          "                        learning about any of these subjects or related fields, this\n" +
          "                        server is for you! Feel free to start/join in a discussion in any\n" +
          "                        of our subject-related channels or just chill in any of our\n" +
          "                        general ones",
      },
      {
        subheading: "❯ Getting Started",
        mainText:
          "Head on over to #get-roles to assign yourself some roles\n" +
          "                        ✪ If you're here to ask STEM questions, read #how-to-ask.\n" +
          "                        ✪ Check out the pins 📌 in each channel for subject-related\n" +
          "                        resources!",
      },
      {
        subheading: "❯ Expectations",
        mainText:
          "✪ Respect all Discord ToS, Guidelines, and server staff.\n" +
          "                        ✪ Post in the appropriate channel.\n" +
          "                        ✪ Use English.\n" +
          "                        ✪ Respect your fellow STEM members. Be civil and don't be\n" +
          "                        toxic.\n" +
          "                        ✪ Do not spam.\n" +
          "                        ✪ Do not post inappropriate\n" +
          "                        content.\n" +
          "                        ✪ No unsolicited advertising or any kind of\n" +
          "                        promotions within the server or DMs.\n" +
          "                        \n" +
          "                        You can report misconduct\n" +
          "                        using #🔕contact-mods.",
      },
    ],
  },
});

const footer = new Vue({
  el: "#footer",
  data: {
    contact: "Contact Me",
    credits: "Owner nope#7777",
  },
});

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
