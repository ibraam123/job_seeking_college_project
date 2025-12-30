const filtersView = {
    typeMenu: document.querySelectorAll(".dropdown:nth-child(1) .dropdown-item"),
    levelMenu: document.querySelectorAll(".dropdown:nth-child(2) .dropdown-item"),
    salaryMenu: document.querySelectorAll(".dropdown:nth-child(3) .dropdown-item"),

    jobsContainer: document.querySelector("#jobs-container"),

    typeView: document.querySelector(".dropdown:nth-child(1) .dropdown-toggle"),
    levelView: document.querySelector(".dropdown:nth-child(2) .dropdown-toggle"),
    salaryView: document.querySelector(".dropdown:nth-child(3) .dropdown-toggle"),

    renderJobs(jobs) {
        this.jobsContainer.innerHTML = "";
        jobs.forEach(job => {
            const card = `
                <div id="job-${job.id}" class="job-card-container col-lg-6 col-sm-12">
                    <div class="job-card rounded-3 p-4" style="border: solid #7575752a 1px;">
                        <div class="d-flex justify-content-between" style="height: 50px;">
                            <div class="d-flex gap-3">
                                <div><img class="rounded-3" src="${job.company_logo}" alt="Company logo"></div>
                                <div>
                                    <p>${job.title}<br>
                                    <span class="text-secondary">${job.company}</span></p>
                                </div>
                            </div>
                            <div><button class="save-btn p-2 rounded-3"><i class="fa-regular fa-bookmark text-secondary"></i></button></div>
                        </div>

                        <div class="mt-3">
                            <p class="text-secondary">${job.description}</p>
                            <div class="d-flex gap-2">
                                <div class="job-card-skill rounded-pill">
                                    <p class="text-center">${job.experience_level}</p>
                                </div>
                            </div>
                            <div class="text-secondary d-flex gap-3 mt-3">
                                <p><i class="fa-solid fa-location-dot"></i> ${job.location}</p>
                                <p><i class="fa-solid fa-suitcase"></i> ${job.job_type}</p>
                                <p><i class="fa-solid fa-dollar-sign"></i> ${job.salary_range}</p>
                                <p><i class="fa-regular fa-clock"></i> ${job.posted_date}</p>
                            </div>
                            <button class="w-100 rounded-3 py-2 border-0" onclick="window.location='job-d.html?id=${job.id}'">View Details</button>
                        </div>
                    </div>
                </div>
            `;
            this.jobsContainer.innerHTML += card;
        });
    },

    changeFilterView(filter, selected) {
        const label = filter.querySelector(".filter-label");
        if (label) label.textContent = selected;
    }
};

export default filtersView;
