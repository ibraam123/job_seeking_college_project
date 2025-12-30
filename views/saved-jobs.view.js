import { savedJobsModel } from "../models/saved-jobs.model.js";

const savedJobsView = {
    savedJobsContainer: document.querySelector("#saved-jobs-container"),

    loadSavedJobs() {
        const jobs = savedJobsModel.getAll();
        this.savedJobsContainer.innerHTML = jobs.join("");

        this.savedJobsContainer
            .querySelectorAll(".job-card-container")
            .forEach(card => {
                const saveBtn = card.querySelector(".save-btn");

                saveBtn.addEventListener("click", () => {
                    savedJobsModel.remove(card.outerHTML);
                    card.remove();
                });
            });
    },

    toggleBookmarkIcon(btn, isSaved) {
        if (isSaved) {
            btn.innerHTML = `<i class="active fa-solid fa-bookmark"></i>`;
        } else {
            btn.innerHTML = `<i class="fa-regular fa-bookmark text-secondary"></i>`;
        }
    }
};

export default savedJobsView;