import model from "../models/filtered-jobs.model.js";
import view from "../views/filtered-jobs.view.js";
import { jobsCounterController } from "./jobs-counter.controller.js";
import { savedJobsController } from "./saved-jobs.controller.js";

export function Filters() {

    // Job Type
    view.typeMenu.forEach(item => {
        item.addEventListener("click", () => {
            model.setFilter("type", item.textContent.trim());
            view.renderJobs(model.getFilteredJobs());
            savedJobsController();
            view.changeFilterView(view.typeView, item.textContent.trim());
            jobsCounterController();
        });
    });

    // Experience Level
    view.levelMenu.forEach(item => {
        item.addEventListener("click", () => {
            model.setFilter("level", item.textContent.trim());
            view.renderJobs(model.getFilteredJobs());
            savedJobsController();
            view.changeFilterView(view.levelView, item.textContent.trim());
            jobsCounterController();
        });
    });

    // Salary Range
    view.salaryMenu.forEach(item => {
        item.addEventListener("click", () => {
            model.setFilter("salary", item.textContent.trim());
            view.renderJobs(model.getFilteredJobs());
            savedJobsController();
            view.changeFilterView(view.salaryView, item.textContent.trim());
            jobsCounterController();
        });
    });

    // Initial load
    view.renderJobs(model.jobs);
}
