document.addEventListener('DOMContentLoaded', () => {
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const saveProfileBtn = document.getElementById('save-profile-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const profileImg = document.getElementById('profile-img');
    const profileImgOverlay = document.getElementById('profile-img-upload-overlay');
    const profileImgInput = document.getElementById('profile-img-input');
    const experienceList = document.getElementById('experience-list');
    const educationList = document.getElementById('education-list');
    const certificationsList = document.getElementById('certifications-list');
    const completenessPercentage = document.getElementById('completeness-percentage');
    const completenessBar = document.getElementById('completeness-bar');
    const checkPhoto = document.getElementById('check-photo');
    const checkBio = document.getElementById('check-bio');
    const checkExperience = document.getElementById('check-experience');
    const checkEducation = document.getElementById('check-education');
    const checkCertifications = document.getElementById('check-certifications');
    const checkPortfolio = document.getElementById('check-portfolio');

    let profileData = {
        name: '',
        title: '',
        location: '',
        email: '',
        phone: '',
        portfolio: '',
        about: '',
        skills: '',
        hasPhoto: false,
        image: '',
    };

    let experienceItems = [];
    let educationItems = [];
    let certificationItems = [];

    let currentUser = null;
    let userId = null;

    // --- Load/Save Profile Data ---
    function loadProfileData() {
        if (!userId) return;
        const key = `profile_${userId}`;
        const stored = localStorage.getItem(key);
        if (stored) {
            const parsed = JSON.parse(stored);
            profileData = { ...profileData, ...parsed.data };
            experienceItems = parsed.experience || [];
            educationItems = parsed.education || [];
            certificationItems = parsed.certifications || [];
        }
    }

    function saveProfileData() {
        if (!userId) return;
        const key = `profile_${userId}`;
        const toSave = {
            data: { ...profileData }, // <-- ensure name/email included
            experience: experienceItems,
            education: educationItems,
            certifications: certificationItems
        };
        localStorage.setItem(key, JSON.stringify(toSave));

        // Also update currentUserProfile for navbar
        const currentUserProfile = JSON.parse(localStorage.getItem("currentUserProfile")) || {};
        currentUserProfile.name = profileData.name;
        currentUserProfile.email = profileData.email;
        localStorage.setItem("currentUserProfile", JSON.stringify(currentUserProfile));
    }

    // --- Render Functions ---
    function renderSkills(skillsString) {
        const staticSkillsView = document.getElementById('static-skills-view');
        staticSkillsView.innerHTML = '';
        if (skillsString) {
            skillsString.split(',').map(s => s.trim()).filter(s => s).forEach(skill => {
                const span = document.createElement('span');
                span.className = 'skill-tag';
                span.textContent = skill;
                staticSkillsView.appendChild(span);
            });
        }
    }

    function renderItems(itemArray, containerElement, itemType) {
        containerElement.innerHTML = '';
        const iconClass = itemType === 'Experience' ? 'bi-briefcase-fill' : 
                         itemType === 'Education' ? 'bi-mortarboard-fill' : 
                         'bi-patch-check-fill';
        itemArray.forEach((item, index) => {
            const startDate = item.startDate ? new Date(item.startDate).getFullYear() : '';
            const endDateText = item.isPresent ? 'Present' : 
                                item.endDate ? new Date(item.endDate).getFullYear() : 
                                itemType === 'Certification' ? `Issued: ${new Date(item.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : '';
            const organizationDisplay = itemType === 'Experience' ? ` <span class="text-muted fw-normal">(${item.organization})</span>` : item.organization;
            const html = `
                <div class="d-flex mb-4 editable-item" data-item-index="${index}">
                    <i class="bi ${iconClass} icon-lg me-4"></i>
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between">
                            <div>
                                <h6 class="fw-bold mb-0">${item.title}${itemType === 'Experience' ? organizationDisplay : ''}</h6>
                                <small class="text-muted">${itemType !== 'Certification' ? `${startDate} - ${endDateText}` : organizationDisplay}</small>
                                ${itemType === 'Education' ? `<p class="mb-0 text-muted">${item.organization}</p>` : ''}
                                ${itemType === 'Certification' ? `<p class="mb-0 text-muted">${endDateText}</p>` : ''}
                            </div>
                            <button class="btn btn-sm btn-outline-secondary edit-item-btn" onclick="editItem(this, '${itemType}')" style="display:none;"><i class="bi bi-pencil"></i></button>
                        </div>
                        ${item.description ? `<p class="mt-1 mb-0">${item.description}</p>` : ''}
                    </div>
                </div>
            `;
            containerElement.insertAdjacentHTML('beforeend', html);
        });
        const isEditing = saveProfileBtn.style.display !== 'none';
        document.querySelectorAll('.edit-item-btn').forEach(btn => btn.style.display = isEditing ? 'inline-block' : 'none');
    }

    // --- Profile Completeness ---
    function calculateCompleteness() {
        const total = 6;
        checkPhoto.innerHTML = profileData.hasPhoto ? '<i class="bi bi-check-circle-fill me-2 text-success"></i> Profile photo added' : '<i class="bi bi-circle-fill me-2" style="color: var(--input-border);"></i> Add profile photo';
        checkBio.innerHTML = profileData.about?.length > 0 ? '<i class="bi bi-check-circle-fill me-2 text-success"></i> Bio completed' : '<i class="bi bi-circle-fill me-2" style="color: var(--input-border);"></i> Complete your professional bio';
        checkExperience.innerHTML = experienceItems.length>0 ? '<i class="bi bi-check-circle-fill me-2 text-success"></i> Added professional experience' : '<i class="bi bi-patch-check-fill me-2 text-secondary-custom"></i> Add your work experience';
        checkEducation.innerHTML = educationItems.length>0 ? '<i class="bi bi-check-circle-fill me-2 text-success"></i> Added education background' : '<i class="bi bi-patch-check-fill me-2 text-secondary-custom"></i> Add your education';
        checkCertifications.innerHTML = certificationItems.length>0 ? '<i class="bi bi-check-circle-fill me-2 text-success"></i> Added certifications' : '<i class="bi bi-patch-check-fill me-2 text-secondary-custom"></i> Add professional certifications';
        checkPortfolio.innerHTML = profileData.portfolio?.startsWith('http') ? '<i class="bi bi-check-circle-fill me-2 text-success"></i> Portfolio link added' : '<i class="bi bi-circle-fill me-2" style="color: var(--input-border);"></i> Add portfolio link';
        const percentage = Math.round(([
            profileData.hasPhoto,
            profileData.about?.length > 0,
            experienceItems.length > 0,
            educationItems.length > 0,
            certificationItems.length > 0,
            profileData.portfolio?.startsWith('http')
        ].filter(Boolean).length / total) * 100);
        completenessPercentage.textContent = `${percentage}%`;
        completenessBar.style.width = `${percentage}%`;
    }

    // --- Initialize Profile ---
    function initializeProfile() {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) { window.location.href = "login.html"; return; }
        currentUser = user;
        userId = user.id || user.uid;

        let userProfile = JSON.parse(localStorage.getItem("currentUserProfile"));
        if (!userProfile) {
            userProfile = { ...currentUser };
            localStorage.setItem("currentUserProfile", JSON.stringify(userProfile));
        }

        profileData = { ...profileData, ...userProfile.data, name: userProfile.name || '', email: userProfile.email || '' };

        loadProfileData();
        renderSkills(profileData.skills);
        renderItems(experienceItems, experienceList, 'Experience');
        renderItems(educationItems, educationList, 'Education');
        renderItems(certificationItems, certificationsList, 'Certification');
        calculateCompleteness();
        updateMainInfoDisplay(profileData);

        // Set profile image if exists
        if (profileData.image) {
            profileImg.src = profileData.image;
            profileData.hasPhoto = true;
        }

        toggleEditMode(false);
    }

    function updateMainInfoDisplay(data) {
        document.getElementById('display-name').textContent = data.name;
        document.getElementById('display-title').textContent = data.title;
        document.getElementById('display-location').innerHTML = `<i class="bi bi-geo-alt me-2"></i> ${data.location}`;
        document.getElementById('display-email').innerHTML = `<i class="bi bi-envelope me-2"></i> ${data.email}`;
        document.getElementById('display-phone').innerHTML = `<i class="bi bi-telephone me-2"></i> ${data.phone}`;
        const displayPortfolio = document.getElementById('display-portfolio');
        if(data.portfolio?.startsWith('http')){
            displayPortfolio.innerHTML = `<i class="bi bi-link-45deg me-2"></i> <a href="${data.portfolio}" target="_blank" class="text-decoration-none">${data.portfolio.replace(/^(https?:\/\/)/,'')}</a>`;
            displayPortfolio.style.display='block';
        } else { displayPortfolio.style.display='none'; }
    }

    function saveMainProfileInfo() {
        profileData.name = document.getElementById('edit-name').value.trim();
        profileData.email = document.getElementById('edit-email').value.trim();

        updateMainInfoDisplay(profileData);
        saveProfileData(); // <-- ensures name/email persist on refresh

        window.toggleSectionEdit('main-info-content', false);
    }

    // --- Add/Edit Item Functions ---
    window.addItem = (itemType) => {
        document.getElementById('itemTypeField').value = itemType;
        document.getElementById('itemIndexField').value = '';
        document.getElementById('itemForm').reset();
        document.getElementById('itemModalLabel').textContent = `Add New ${itemType}`;
        document.getElementById('modalSaveButton').textContent = 'Add Item';

        // Adjust fields based on item type
        const descriptionField = document.getElementById('item-description-field');
        const endDateField = document.getElementById('itemEndDate');
        const presentCheck = document.getElementById('itemPresentCheck');
        if (itemType === 'Certification') {
            descriptionField.style.display = 'none';
            endDateField.required = true;
            endDateField.previousElementSibling.textContent = 'Issue Date';
            presentCheck.style.display = 'none';
        } else {
            descriptionField.style.display = 'block';
            endDateField.required = false;
            endDateField.previousElementSibling.textContent = 'End Date';
            presentCheck.style.display = 'block';
        }

        const modal = new bootstrap.Modal(document.getElementById('itemModal'));
        modal.show();
    }

    window.editItem = (button, itemType) => {
        const itemIndex = button.closest('.editable-item').dataset.itemIndex;
        const itemArray = itemType === 'Experience' ? experienceItems : itemType === 'Education' ? educationItems : certificationItems;
        const item = itemArray[itemIndex];

        document.getElementById('itemTypeField').value = itemType;
        document.getElementById('itemIndexField').value = itemIndex;
        document.getElementById('itemTitle').value = item.title;
        document.getElementById('itemOrganization').value = item.organization;
        document.getElementById('itemStartDate').value = item.startDate;
        document.getElementById('itemEndDate').value = item.endDate;
        document.getElementById('itemDescription').value = item.description || '';
        document.getElementById('itemPresentCheck').checked = item.isPresent || false;
        document.getElementById('itemModalLabel').textContent = `Edit ${itemType}`;
        document.getElementById('modalSaveButton').textContent = 'Save Changes';

        // Adjust fields based on item type
        const descriptionField = document.getElementById('item-description-field');
        const endDateField = document.getElementById('itemEndDate');
        const presentCheck = document.getElementById('itemPresentCheck');
        if (itemType === 'Certification') {
            descriptionField.style.display = 'none';
            endDateField.required = true;
            endDateField.previousElementSibling.textContent = 'Issue Date';
            presentCheck.style.display = 'none';
        } else {
            descriptionField.style.display = 'block';
            endDateField.required = false;
            endDateField.previousElementSibling.textContent = 'End Date';
            presentCheck.style.display = 'block';
        }

        const modal = new bootstrap.Modal(document.getElementById('itemModal'));
        modal.show();
    }

    function saveItem() {
        const itemType = document.getElementById('itemTypeField').value;
        const itemIndex = document.getElementById('itemIndexField').value;
        const title = document.getElementById('itemTitle').value.trim();
        const organization = document.getElementById('itemOrganization').value.trim();
        const startDate = document.getElementById('itemStartDate').value;
        const endDate = document.getElementById('itemEndDate').value;
        const description = document.getElementById('itemDescription').value.trim();
        const isPresent = document.getElementById('itemPresentCheck').checked;

        if (!title || !organization || !startDate || (itemType !== 'Certification' && !isPresent && !endDate)) {
            alert('Please fill in all required fields.');
            return;
        }

        const item = { title, organization, startDate, endDate, description, isPresent };

        const itemArray = itemType === 'Experience' ? experienceItems : itemType === 'Education' ? educationItems : certificationItems;
        const containerElement = itemType === 'Experience' ? experienceList : itemType === 'Education' ? educationList : certificationsList;

        if (itemIndex === '') {
            // Add new item
            itemArray.push(item);
        } else {
            // Edit existing item
            itemArray[itemIndex] = item;
        }

        renderItems(itemArray, containerElement, itemType);
        saveProfileData();
        calculateCompleteness();

        const modal = bootstrap.Modal.getInstance(document.getElementById('itemModal'));
        modal.hide();
    }

    // Bind modal save button
    document.getElementById('itemForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveItem();
    });

    // --- Toggle Edit Mode ---
    window.toggleEditMode = (isEditing) => {
        const editButtons = document.querySelectorAll('.edit-btn');
        const editItemButtons = document.querySelectorAll('.edit-item-btn');
        editProfileBtn.style.display = isEditing ? 'none' : 'inline-block';
        saveProfileBtn.style.display = isEditing ? 'inline-block' : 'none';
        editButtons.forEach(btn => btn.style.display = isEditing ? 'inline-block' : 'none');
        editItemButtons.forEach(btn => btn.style.display = isEditing ? 'inline-block' : 'none');
        window.toggleSectionEdit('main-info-content', isEditing);
        profileImgOverlay.style.display = isEditing ? 'flex' : 'none';

        if (!isEditing) {
            saveMainProfileInfo();
            document.querySelectorAll('.editable-content').forEach(content => {
                if(content.id!=='main-info-content') saveSection(content.id);
            });
            saveProfileData();
            alert('Profile changes saved successfully!');
            calculateCompleteness();
        } else {
            document.getElementById('edit-name').value = profileData.name;
            document.getElementById('edit-title').value = profileData.title;
            document.getElementById('edit-location').value = profileData.location;
            document.getElementById('edit-email').value = profileData.email;
            document.getElementById('edit-phone').value = profileData.phone;
            document.getElementById('edit-portfolio').value = profileData.portfolio;
            document.getElementById('edit-about-text').value = profileData.about;
            document.getElementById('edit-skills-input').value = profileData.skills;
            alert('Profile is now in Edit Mode. Click section pencils to edit specifics.');
        }
    }

    function saveSection(sectionId){
        const content = document.getElementById(sectionId);
        if(!content) return;
        const staticView = content.querySelector('.static-view');
        const editView = content.querySelector('.edit-view');

        if(sectionId==='about-content'){
            profileData.about = document.getElementById('edit-about-text').value.trim();
            document.getElementById('display-about-text').textContent = profileData.about;
        } else if(sectionId==='skills-content'){
            profileData.skills = document.getElementById('edit-skills-input').value.trim();
            renderSkills(profileData.skills);
        }

        if(editView && editView.style.display!=='none'){
            staticView.style.display='block';
            editView.style.display='none';
        }
    }

    window.toggleSectionEdit = (sectionId, forceEditMode=null) => {
        const content=document.getElementById(sectionId);
        const staticView=content.querySelector('.static-view');
        const editView=content.querySelector('.edit-view');
        const isCurrentlyEditing=staticView.style.display==='none';
        const shouldBeEditing=forceEditMode!==null?forceEditMode:!isCurrentlyEditing;
        if(shouldBeEditing){ staticView.style.display='none'; editView.style.display='block'; }
        else{ saveSection(sectionId); }
    }

    if(editProfileBtn) editProfileBtn.addEventListener('click',()=>window.toggleEditMode(true));
    if(saveProfileBtn) saveProfileBtn.addEventListener('click',()=>window.toggleEditMode(false));
    if(logoutBtn) logoutBtn.addEventListener('click',()=>{
        localStorage.removeItem('userSessionToken');
        alert('You have been logged out.');
        window.location.href='login.html';
    });

    // --- Profile Image Upload ---
    if (profileImgInput) {
        profileImgInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImg.src = e.target.result;
                    profileData.image = e.target.result;
                    profileData.hasPhoto = true;
                    saveProfileData();
                    calculateCompleteness();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Click overlay to trigger file input
    if (profileImgOverlay) {
        profileImgOverlay.addEventListener('click', () => {
            profileImgInput.click();
        });
    }

    initializeProfile();
});
