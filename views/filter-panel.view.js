export default {
    filterPanel: document.querySelector(".filter-panel"),
    filterBtn: document.querySelector(".filter-btn"),
    closeBtn: document.querySelector(".close-btn"),

    showFilters() {
        this.filterPanel.style.display = "block";
    },

    hideFilters() {
        this.filterPanel.style.display = "none";
    }
};
