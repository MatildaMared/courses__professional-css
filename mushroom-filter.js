const cards = document.querySelectorAll(".mushroom-guide .card");
const seasonalFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");
const noResultsMessage = document.querySelector(".no-matches");

const currentFilters = {
	season: "all",
	edible: "all",
};

cards.forEach((card, index) => {
	const mushroomId = `mushroom-${index + 1}`;
	card.style.viewTransitionName = `mushroom-card-${mushroomId}`;
});

function updateFilter(e) {
	const filterType = e.target.name;
	currentFilters[filterType] = e.target.value;

	if (!document.startViewTransition) {
		filterCards();
	}

	document.startViewTransition(() => filterCards());
}

function filterCards() {
	let hasVisibleCards = false;

	cards.forEach((card) => {
		const season = card.querySelector("[data-season]").dataset.season;
		const edible = card.querySelector("[data-edible]").dataset.edible;

		const matchesSeason = season === currentFilters.season;
		const matchesEdible = edible === currentFilters.edible;

		if (
			(matchesSeason || currentFilters.season === "all") &&
			(matchesEdible || currentFilters.edible === "all")
		) {
			card.hidden = false;
			hasVisibleCards = true;
		} else {
			card.hidden = true;
		}

		if (hasVisibleCards) {
			noResultsMessage.hidden = true;
		} else {
			noResultsMessage.hidden = false;
		}
	});
}

seasonalFilter.addEventListener("change", updateFilter);
edibleFilter.addEventListener("change", updateFilter);
