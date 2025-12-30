export const JobsView = {
    renderJobs(jobs) {
        const container = document.getElementById('jobs-container');
        container.innerHTML = '';

        if (!jobs.length) {
            container.innerHTML = '<p class="text-center">No jobs found.</p>';
            return;
        }

        jobs.forEach(job => {
            const col = document.createElement('div');
            col.className = 'col-lg-6 col-sm-12';
            col.innerHTML = `
                <div class="job-card bg-white rounded-3 p-4" style="border: solid #7575752a 1px;">
                    <div class="d-flex justify-content-between" style="height: 50px;">
                        <div class="d-flex gap-3">
                            <div><img class="rounded-3" src="${job.logo}" alt="Company logo"></div>
                            <div>
                                <p>${job.title} <br>
                                <span class="text-secondary">${job.company}</span></p>
                            </div>
                        </div>
                        <div>
                            <button class="save-btn p-2 rounded-3 text-center"><i class="fa-regular fa-bookmark text-secondary"></i></button>
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="text-secondary">${job.description}</p>
                        <div class="d-flex gap-2 flex-wrap">
                            ${job.skills.map(skill => `<div class="job-card-skill rounded-pill"><p class="text-center">${skill}</p></div>`).join('')}
                        </div>
                        <div class="text-secondary d-flex gap-3 mt-3 flex-wrap">
                            <div><p><i class="fa-solid fa-location-dot"></i> ${job.location}</p></div>
                            <div><p><i class="fa-solid fa-suitcase"></i> ${job.type}</p></div>
                            <div><p><i class="fa-solid fa-dollar-sign"></i> ${job.salary}</p></div>
                            <div><p><i class="fa-regular fa-clock"></i> ${job.posted}</p></div>
                        </div>
                        <div><button class="w-100 rounded-3 py-2 border-0 view-details-btn" data-id="${job.id}">View Details</button></div>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });

        document.getElementById('jobs-counter').innerText = jobs.length;
    }
};
