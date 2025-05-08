const cards = document.querySelectorAll(".mushroom-guide .card");
const seasonalFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");

const currentFilters = {
	season: "all",
	edible: "all",
};

function updateFilter(e) {
	const filterType = e.target.name;
	currentFilters[filterType] = e.target.value;
	filterCards();
}

function filterCards() {
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
		} else {
			card.hidden = true;
		}
	});
}

seasonalFilter.addEventListener("change", updateFilter);
edibleFilter.addEventListener("change", updateFilter);
