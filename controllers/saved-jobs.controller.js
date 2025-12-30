import savedJobsView from "../views/saved-jobs.view.js";
import { savedJobsModel } from "../models/saved-jobs.model.js";
import { jobsCounterController } from "./jobs-counter.controller.js";

export function savedJobsController() {

    const jobs = document.querySelectorAll(".job-card-container");

    jobs.forEach(job => {
        const saveBtn = job.querySelector(".save-btn");
        const jobHTML = job.outerHTML;

        const isSaved = savedJobsModel.exists(jobHTML);
        savedJobsView.toggleBookmarkIcon(saveBtn, isSaved);

        saveBtn.addEventListener("click", () => {
            if (savedJobsModel.exists(jobHTML)) {
                savedJobsModel.remove(jobHTML);
                savedJobsView.toggleBookmarkIcon(saveBtn, false);
            } else {
                savedJobsModel.save(jobHTML);
                savedJobsView.toggleBookmarkIcon(saveBtn, true);                
            }
            jobsCounterController();
        });
    });
}
