import { initFilters } from "./assets/js/controllers/filter-panel.controller.js";
import { Filters } from "./assets/js/controllers/filtered-jobs.controller.js";
import { savedJobsController } from "./assets/js/controllers/saved-jobs.controller.js";
import savedJobsView from "./assets/js/views/saved-jobs.view.js";
import { jobsCounterController } from "./assets/js/controllers/jobs-counter.controller.js";

document.addEventListener("DOMContentLoaded", () => {

    // Browse Jobs page
    if (document.querySelector("#jobs-container")) {
        initFilters();
        Filters();
        savedJobsController();
    }

    // Saved Jobs page
    if (document.querySelector("#saved-jobs-container")) {
        savedJobsView.loadSavedJobs();
    }

    jobsCounterController();
});


import { profileController } from "controllers/ProfileController.js";

document.addEventListener('DOMContentLoaded', () => {
    profileController.init();
});



import { initFiltersJobs } from "controllers/filtered-jobs.controller.js";
import { initFilters } from "controllers/filter-panel.controller.js";
import { jobsCounterController } from "controllers/jobs-counter.controller.js";

// Execute all initial setup functions
document.addEventListener("DOMContentLoaded", () => {
    initFiltersJobs();
    initFilters();
    jobsCounterController(); // To ensure initial counter is set
});