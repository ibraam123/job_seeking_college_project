// controllers/CvController.js
import { CvModel } from "../models/CvModel.js";
import { CvView } from "../views/CvView.js";
import { ProfileModel } from "../models/ProfileModel.js";

export const CvController = {
    user: null,

    init() {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) {
            window.location.href = "login.html";
            return;
        }
        this.user = user;
        document.getElementById("user-display-name").textContent = this.user.name || "User";

        this.render();
        this.bindEvents();

        // Check if we should show applied jobs modal
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('showApplied') === 'true') {
            // Clear the URL parameter
            window.history.replaceState({}, document.title, window.location.pathname);
            // Show applied jobs modal after a short delay to ensure DOM is ready
            setTimeout(() => this.showAppliedJobs(), 500);
        }
    },

    render() {
        const cvs = CvModel.getAll(this.user.id);
        CvView.renderTable(cvs);

        // Update stats
        const totalCvs = cvs.length;
        const totalDownloads = cvs.reduce((sum, cv) => sum + (cv.downloads || 0), 0);

        ProfileModel.load(this.user.id);
        const appliedJobs = ProfileModel.getAppliedJobs();
        const applicationsSent = appliedJobs.length;

        document.getElementById("total-cvs").textContent = totalCvs;
        document.getElementById("total-downloads").textContent = totalDownloads;
        document.getElementById("applications-sent").textContent = applicationsSent;
    },

    bindEvents() {
        document.getElementById("uploadForm").addEventListener("submit", this.handleUpload.bind(this));
        document.getElementById("editForm").addEventListener("submit", this.handleEdit.bind(this));

        document.getElementById("applications-card").addEventListener("click", this.showAppliedJobs.bind(this));

        document.addEventListener("click", e => {
            const btn = e.target.closest(".action-btn");
            if (!btn) return;

            const id = Number(btn.dataset.id);
            const action = btn.dataset.action;
            const cv = CvModel.getById(this.user.id, id);
            if (!cv) return;

            switch(action) {
                case "view": CvView.showPdf(cv); break;
                case "download": this.handleDownload(cv); break;
                case "delete":
                    if (confirm(`Delete "${cv.name}"?`)) {
                        CvModel.delete(this.user.id, id);
                        this.render();
                    }
                    break;
                case "primary":
                    CvModel.setPrimary(this.user.id, id);
                    this.render();
                    break;
                case "edit": CvView.showEditModal(cv); break;
            }
        });

        document.getElementById("logout-btn").addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            window.location.href = "login.html";
        });
    },

    handleUpload(e) {
        e.preventDefault();
        const file = document.getElementById("fileUpload").files[0];
        if (!file) return;

        CvModel.add(this.user.id, {
            id: Date.now(),
            name: document.getElementById("cvName").value || file.name,
            isPrimary: document.getElementById("setPrimary").checked,
            modified: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }),
            size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
            status: "Active",
            filePath: URL.createObjectURL(file)
        });

        CvView.hideUploadModal();
        e.target.reset();
        this.render();
    },

    handleEdit(e) {
        e.preventDefault();
        const id = Number(document.getElementById("editCvId").value);
        const cv = CvModel.getById(this.user.id, id);
        if (!cv) return;

        const updatedCv = {
            ...cv,
            name: document.getElementById("editCvName").value.trim(),
            isPrimary: document.getElementById("editSetPrimary").checked
        };

        CvModel.update(this.user.id, updatedCv);
        bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
        this.render();
    },

    handleDownload(cv) {
        CvModel.incrementDownloads(this.user.id, cv.id);
        this.render();

        const a = document.createElement('a');
        a.href = cv.filePath;
        a.download = cv.name.replace(/ /g, "_") + ".pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },

    showAppliedJobs() {
        ProfileModel.load(this.user.id);
        const appliedJobs = ProfileModel.getAppliedJobs();

        // Update the applications sent count in the UI
        document.getElementById("applications-sent").textContent = appliedJobs.length;

        const modal = new bootstrap.Modal(document.getElementById('appliedJobsModal'));
        const jobListContainer = document.getElementById('applied-jobs-list');
        const noApplicationsDiv = document.getElementById('no-applications');

        if (appliedJobs.length === 0) {
            jobListContainer.innerHTML = '';
            noApplicationsDiv.classList.remove('d-none');
        } else {
            noApplicationsDiv.classList.add('d-none');
            jobListContainer.innerHTML = appliedJobs.map(job => {
                let cvName = 'No CV selected';
                if (job.cvId) {
                    const cv = CvModel.getById(this.user.id, job.cvId);
                    if (cv) {
                        cvName = cv.name;
                    }
                }
                return `
                    <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-1 job-title" style="cursor: pointer; color: #007bff;" data-job-id="${job.jobId}">${job.title}</h6>
                            <p class="mb-1 text-muted">${job.company}</p>
                            <small class="text-muted">${job.location}</small>
                            <small class="text-muted">CV: ${cvName}</small>
                        </div>
                        <span class="badge bg-primary rounded-pill">${job.jobId}</span>
                    </div>
                `;
            }).join('');

            // Add event listeners for job titles
            document.querySelectorAll('.job-title').forEach(title => {
                title.addEventListener('click', () => {
                    const jobId = title.dataset.jobId;
                    window.location.href = `job-d.html?id=${jobId}`;
                });
            });
        }

    }
};

document.addEventListener("DOMContentLoaded", () => CvController.init());
