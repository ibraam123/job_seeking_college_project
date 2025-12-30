import view from "../views/jobs-counter.view.js"
import filtersModel from "../models/filtered-jobs.model.js"
import { savedJobsModel } from "../models/saved-jobs.model.js"

export function jobsCounterController() {
    if(document.querySelector("#jobs-counter")) {
        view.renderCounter(filtersModel.getFilteredJobs().length)
    }
    view.renderSavedCounter(savedJobsModel.getAll().length)
}