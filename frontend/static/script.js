const wrapper = document.getElementsByClassName("wrapper")[0];

// #############################################
// everything needed for the dropdown menu
// #############################################
const leistungen_link = document.getElementById("leistungen-link");
const leistungen_sublinks = document.getElementsByClassName("leistungen-sublinks")[0];
const ueberuns_link = document.getElementById("ueber-uns-link");
const ueberuns_sublinks = document.getElementsByClassName("ueber-uns-sublinks")[0];
const dropdown_wrapper = document.getElementsByClassName("dropdown-wrapper")[0];

// #############################################
// everything needed for the hamburger menu
// #############################################
const hamburger_wrapper = document.getElementsByClassName("hamburger-wrapper")[0];
const hamburger_links_container = document.getElementsByClassName("hamburger-links-container")[0];
// initially set links_container display to "none"
hamburger_links_container.style.display = "none";
const preisrechner_btn_container = document.getElementsByClassName("hamburger-preisrechner-btn-container")[0];
const preisrechner_btn = preisrechner_btn_container.querySelector("button");
const hamburger_logo = document.getElementById("hamburger-logo");
const hamburger_icon = document.getElementById("hamburger-icon");

window.addEventListener("DOMContentLoaded", () => {
	let calculatorOpen = false;
	const openCalculatorButton = document.getElementById("open-calculator-btn");
	const priceCalculatorCloseIcon = document.getElementById("calculator-close-icon");
	const bodyTag = document.getElementById("main-body");
	const calculatorHook = document.getElementById("preisrechner-hook");

	const toggleCalculatorOverlay = () => {
		if (calculatorOpen) {
			bodyTag.classList.remove("overflow");
			calculatorHook.style.display = "none";
			calculatorOpen = false;
		} else {
			bodyTag.classList.add("overflow");
			calculatorHook.style.display = "flex";
			calculatorOpen = true;
		}
	};

	openCalculatorButton.addEventListener("click", toggleCalculatorOverlay);
	priceCalculatorCloseIcon.addEventListener("click", toggleCalculatorOverlay);
});

// #############################################
// media queries
// #############################################

const mq_str_1280 = "(min-width: 1280px)";
const mq_str_960 = "(max-width: 1279px) and (min-width: 960px)";
const mq_str_600 = "(max-width: 959px) and (min-width: 600px)";
const mq_str_320 = "(max-width: 599px)";

// #############################################
// handling the hamburger menu
// #############################################

let hamburgerMenuOpen = false;

const closeHamburgerMenu = () => {
	hamburger_links_container.style.display = "none";
	hamburger_wrapper.style.background = "rgba(0, 0, 0, 0)";
	hamburger_icon.classList.remove("bright");
	hamburger_logo.classList.remove("bright");
	preisrechner_btn.classList.remove("hamburger-menu-open");
	hamburgerMenuOpen = false;
	if (window.matchMedia(mq_str_320).matches) {
		preisrechner_btn_container.style.display = "none";
	}
};

const openHamburgerMenu = () => {
	hamburger_links_container.style.display = "grid";
	hamburger_wrapper.style.background = "rgba(0, 0, 0, 0.75)";
	hamburger_icon.classList.add("bright");
	hamburger_logo.classList.add("bright");
	preisrechner_btn.classList.add("hamburger-menu-open");
	hamburgerMenuOpen = true;
	if (window.matchMedia(mq_str_320).matches) {
		preisrechner_btn_container.style.display = "flex";
	}
};

const toggleHamburgerMenu = () => {
	if (hamburgerMenuOpen === false) {
		openHamburgerMenu();
	} else {
		closeHamburgerMenu();
	}
};

hamburger_icon.addEventListener("click", () => {
	toggleHamburgerMenu();
});

const handleMediaQuery = (event) => {
	if (event.media === mq_str_320 && event.matches) {
		closeHamburgerMenu();
		preisrechner_btn_container.style.display = "none";
	} else if (event.media === mq_str_600 && event.matches) {
		closeHamburgerMenu();
		preisrechner_btn_container.style.display = "flex";
	}
};

const mq_320 = window.matchMedia(mq_str_320);
const mq_600 = window.matchMedia(mq_str_600);
mq_320.addEventListener("change", handleMediaQuery);
mq_600.addEventListener("change", handleMediaQuery);

// #############################################
// handling the dropdown menu
// #############################################

// eventListener to show the dropdown-menu background (wrapper)
dropdown_wrapper.addEventListener("mouseout", onMouseOutHandler, true);

// eventListeners to show the hovered menu 1
leistungen_link.addEventListener("mouseenter", () => {
	dropdown_wrapper.style.display = "block";
	leistungen_sublinks.style.display = "block";
	ueberuns_sublinks.style.display = "none";
});
ueberuns_link.addEventListener("mouseenter", () => {
	dropdown_wrapper.style.display = "block";
	leistungen_sublinks.style.display = "none";
	ueberuns_sublinks.style.display = "block";
});

// check if the mouse is far enough away from the top of the page,
// if it is hide the dropdown-menu background (wrapper)
function onMouseOutHandler(event) {
	if (event.pageY >= dropdown_wrapper.offsetHeight + 10) {
		dropdown_wrapper.style.display = "none";
	}
}
// hide dropdown menu on click
dropdown_wrapper.addEventListener("click", () => {
	dropdown_wrapper.style.display = "none";
});
