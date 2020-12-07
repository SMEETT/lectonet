const wrapper = document.getElementsByClassName("wrapper")[0];

const leistungen_link = document.getElementById("leistungen-link");
const leistungen_sublinks = document.getElementsByClassName("leistungen-sublinks")[0];

const ueberuns_link = document.getElementById("ueber-uns-link");
const ueberuns_sublinks = document.getElementsByClassName("ueber-uns-sublinks")[0];

const dropdown_wrapper = document.getElementsByClassName("dropdown-wrapper")[0];

// hamburger menu elements

const hamburger_content = document.getElementsByClassName("hamburger-content")[0];
const hamburger_wrapper = document.getElementsByClassName("hamburger-wrapper")[0];

console.log(hamburger_wrapper);

const hamburger_icon_menuHidden = document.getElementById("hamburger-icon-toggle-menuHidden");
const hamburger_icon_menuVisible = document.getElementById("hamburger-icon-toggle-menuVisible");

hamburger_icon_menuHidden.addEventListener("click", () => {
	hamburger_wrapper.style.display = "none";
	hamburger_content.style.display = "flex";
});

hamburger_icon_menuVisible.addEventListener("click", () => {
	hamburger_wrapper.style.display = "flex";
	hamburger_content.style.display = "none";
});

const mediaQuery = window.matchMedia("(max-width: 959px)");
console.log(mediaQuery);

function handleTabletChange(e) {
	// Check if the media query is true
	// console.log(e);
	if (e.matches) {
		// Then log the following message to the console

		console.log("Media Query Matched!");
	} else {
		hamburger_wrapper.style.display = "none";
		hamburger_content.style.display = "none";
	}
}

mediaQuery.addEventListener("change", handleTabletChange);

handleTabletChange(mediaQuery);

// const wrapperTopMargin = parseInt(window.getComputedStyle(wrapper).marginTop.slice(0, 2));

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

dropdown_wrapper.addEventListener("mouseout", onMouseOutHandler, true);

function onMouseOutHandler(event) {
	if (event.pageY >= dropdown_wrapper.offsetHeight + 30) {
		dropdown_wrapper.style.display = "none";
	}
}

// hide dropdown menu on click
dropdown_wrapper.addEventListener("click", () => {
	dropdown_wrapper.style.display = "none";
});
