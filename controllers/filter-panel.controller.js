import view from "../views/filter-panel.view.js";

export function initFilters() {
    view.hideFilters();

    view.filterBtn.addEventListener("click", () => {
        view.showFilters();
    });

    view.closeBtn.addEventListener("click", () => {
        view.hideFilters();
    });
}
