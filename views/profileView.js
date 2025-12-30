import { ProfileModel } from "../models/ProfileModel.js";

export const profileView = {
    renderMainInfo(profileData) {
        document.getElementById("display-name").textContent =
            profileData.name || "Your Name";
        document.getElementById("display-title").textContent =
            profileData.title || "Job Title";
        document.getElementById("display-location").textContent =
            profileData.location || "Location";
        document.getElementById("display-email").textContent =
            profileData.email || "Email";
        document.getElementById("display-phone").textContent =
            profileData.phone || "Phone";

        const portfolioEl = document.getElementById("display-portfolio");
        portfolioEl.innerHTML = profileData.portfolio
            ? `<i class="bi bi-link-45deg me-2"></i>
               <a href="${profileData.portfolio}" target="_blank">
                    ${profileData.portfolio}
               </a>`
            : "";

        // Set profile image
        const profileImg = document.getElementById("profile-img");
        if (profileImg && profileData.image) {
            profileImg.src = profileData.image;
        }

        // edit fields
        document.getElementById("edit-name").value = profileData.name || "";
        document.getElementById("edit-title").value = profileData.title || "";
        document.getElementById("edit-location").value =
            profileData.location || "";
        document.getElementById("edit-email").value = profileData.email || "";
        document.getElementById("edit-phone").value = profileData.phone || "";
        document.getElementById("edit-portfolio").value =
            profileData.portfolio || "";
        document.getElementById("edit-about-text").value =
            profileData.about || "";
        document.getElementById("display-about-text").textContent =
            profileData.about || "";
    },

    renderSkills(skills) {
        const container = document.getElementById("static-skills-view");
        container.innerHTML = "";
        if (!skills) return;

        skills.split(",").forEach(skill => {
            const span = document.createElement("span");
            span.className = "skill-tag";
            span.textContent = skill.trim();
            container.appendChild(span);
        });

        document.getElementById("edit-skills-input").value = skills || "";
    },

    renderItems(container, items, type) {
        if (!container) return;
        container.innerHTML = "";

        const iconClass = type === 'experience' ? 'bi-briefcase-fill' :
                         type === 'education' ? 'bi-mortarboard-fill' :
                         'bi-patch-check-fill';

        items.forEach((item, index) => {
            const startDate = item.startDate ? new Date(item.startDate).getFullYear() : '';
            const endDateText = item.isPresent ? 'Present' :
                                item.endDate ? new Date(item.endDate).getFullYear() :
                                type === 'certifications' ? `Issued: ${new Date(item.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : '';
            const organizationDisplay = type === 'experience' ? ` <span class="text-muted fw-normal">(${item.organization})</span>` : item.organization;
            const div = document.createElement("div");
            div.className = "d-flex mb-4 editable-item";
            div.setAttribute('data-item-index', index);
            div.innerHTML = `
                <i class="bi ${iconClass} icon-lg me-4"></i>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h6 class="fw-bold mb-0">${item.title}${type === 'experience' ? organizationDisplay : ''}</h6>
                            <small class="text-muted">${type !== 'certifications' ? `${startDate} - ${endDateText}` : organizationDisplay}</small>
                            ${type === 'education' ? `<p class="mb-0 text-muted">${item.organization}</p>` : ''}
                            ${type === 'certifications' ? `<p class="mb-0 text-muted">${endDateText}</p>` : ''}
                        </div>
                        <button class="btn btn-sm btn-outline-secondary edit-item-btn" data-type="${type}" data-index="${index}" style="display:none;"><i class="bi bi-pencil"></i></button>
                    </div>
                    ${item.description ? `<p class="mt-1 mb-0">${item.description}</p>` : ''}
                </div>
            `;
            container.appendChild(div);
        });
    },

    updateProfileStrength(percentage) {
        document.getElementById("completeness-percentage").textContent =
            percentage + "%";
        document.getElementById("completeness-bar").style.width =
            percentage + "%";

        const updateItem = (id, condition) => {
            const el = document.getElementById(id);
            if (!el) return;

            const icon = el.querySelector("i");
            if (condition) {
                icon.className = "bi bi-check-circle-fill text-success me-2";
            } else {
                icon.className = "bi bi-circle me-2";
            }
        };

        updateItem("check-photo", ProfileModel.data.hasPhoto);
        updateItem(
            "check-bio",
            ProfileModel.data.about &&
                ProfileModel.data.about.length > 0
        );
        updateItem("check-experience", ProfileModel.experience.length > 0);
        updateItem("check-education", ProfileModel.education.length > 0);
        updateItem(
            "check-certifications",
            ProfileModel.certifications.length > 0
        );
        updateItem(
            "check-portfolio",
            ProfileModel.data.portfolio &&
                ProfileModel.data.portfolio.startsWith("http")
        );
    },

    updateProgress(percentage) {
        this.updateProfileStrength(percentage);
    }
};
