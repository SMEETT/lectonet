const wrapper = document.getElementsByClassName("wrapper")[0];

const leistungen_link = document.getElementById("leistungen-link");
const leistungen_sublinks = document.getElementsByClassName("leistungen-sublinks")[0];

const ueberuns_link = document.getElementById("ueber-uns-link");
const ueberuns_sublinks = document.getElementsByClassName("ueber-uns-sublinks")[0];

const dropdown_wrapper = document.getElementsByClassName("dropdown-wrapper")[0];

const mediaQuery = window.matchMedia("(max-width: 1279px)");
console.log(mediaQuery);

function handleTabletChange(e) {
	// Check if the media query is true
	// console.log(e);
	if (e.matches) {
		// Then log the following message to the console
		console.log("Media Query Matched!");
	} else {
		console.log("changed back");
	}
}

mediaQuery.addEventListener("change", handleTabletChange);

handleTabletChange(mediaQuery);

const wrapperTopMargin = parseInt(window.getComputedStyle(wrapper).marginTop.slice(0, 2));

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
	console.log(wrapperTopMargin);
	if (event.pageY >= dropdown_wrapper.offsetHeight + wrapperTopMargin) {
		dropdown_wrapper.style.display = "none";
	}
}

// hide dropdown menu on click
dropdown_wrapper.addEventListener("click", () => {
	dropdown_wrapper.style.display = "none";
});
