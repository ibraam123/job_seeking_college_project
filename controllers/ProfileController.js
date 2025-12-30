import { ProfileModel } from "../models/ProfileModel.js";
import { profileView } from "../views/profileView.js";

let currentUser = null;

function renderNavbarUser() {
    const userDisplayName = document.getElementById("user-display-name");
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    if (userDisplayName) {
        userDisplayName.textContent = user.name;
    }
}

function initProfile() {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    currentUser = user;

    // 1️⃣ initialize profile from Firebase user
    ProfileModel.initFromUser(user);

    // 2️⃣ load saved profile (if exists)
    ProfileModel.load(user.id);

    // 3️⃣ render UI
    profileView.renderMainInfo(ProfileModel.data);
    profileView.renderSkills(ProfileModel.data.skills);
    profileView.renderItems(
        document.getElementById("experience-items"),
        ProfileModel.experience,
        "experience"
    );
    profileView.renderItems(
        document.getElementById("education-items"),
        ProfileModel.education,
        "education"
    );
    profileView.renderItems(
        document.getElementById("certification-items"),
        ProfileModel.certifications,
        "certifications"
    );

    profileView.updateProgress(ProfileModel.calculateProgress());

    renderNavbarUser();
}

function handleSaveMainInfo() {
    ProfileModel.update({
        name: document.getElementById("edit-name").value,
        title: document.getElementById("edit-title").value,
        location: document.getElementById("edit-location").value,
        email: document.getElementById("edit-email").value,
        phone: document.getElementById("edit-phone").value,
        portfolio: document.getElementById("edit-portfolio").value,
        about: document.getElementById("edit-about-text").value
    });

    ProfileModel.save(currentUser.id);

    // update navbar name
    const user = JSON.parse(localStorage.getItem("currentUser"));
    user.name = ProfileModel.data.name;
    localStorage.setItem("currentUser", JSON.stringify(user));

    profileView.renderMainInfo(ProfileModel.data);
    profileView.updateProgress(ProfileModel.calculateProgress());
    renderNavbarUser();
}

function handleAddItem(type) {
    document.getElementById('itemTypeField').value = type;
    document.getElementById('itemIndexField').value = '';
    document.getElementById('itemForm').reset();
    document.getElementById('itemModalLabel').textContent = `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    document.getElementById('modalSaveButton').textContent = 'Add Item';

    // Adjust fields based on item type
    const descriptionField = document.getElementById('item-description-field');
    const endDateField = document.getElementById('itemEndDate');
    const presentCheck = document.getElementById('itemPresentCheck');
    if (type === 'certifications') {
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

function handleEditItem(type, index) {
    const itemArray = type === 'experience' ? ProfileModel.experience : type === 'education' ? ProfileModel.education : ProfileModel.certifications;
    const item = itemArray[index];

    document.getElementById('itemTypeField').value = type;
    document.getElementById('itemIndexField').value = index;
    document.getElementById('itemTitle').value = item.title;
    document.getElementById('itemOrganization').value = item.organization;
    document.getElementById('itemStartDate').value = item.startDate;
    document.getElementById('itemEndDate').value = item.endDate;
    document.getElementById('itemDescription').value = item.description || '';
    document.getElementById('itemPresentCheck').checked = item.isPresent || false;
    document.getElementById('itemModalLabel').textContent = `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    document.getElementById('modalSaveButton').textContent = 'Save Changes';

    // Adjust fields based on item type
    const descriptionField = document.getElementById('item-description-field');
    const endDateField = document.getElementById('itemEndDate');
    const presentCheck = document.getElementById('itemPresentCheck');
    if (type === 'certifications') {
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

function handleSaveItem() {
    const type = document.getElementById('itemTypeField').value;
    const index = document.getElementById('itemIndexField').value;
    const title = document.getElementById('itemTitle').value.trim();
    const organization = document.getElementById('itemOrganization').value.trim();
    const startDate = document.getElementById('itemStartDate').value;
    const endDate = document.getElementById('itemEndDate').value;
    const description = document.getElementById('itemDescription').value.trim();
    const isPresent = document.getElementById('itemPresentCheck').checked;

    // Form validations
    if (!title || !organization || !startDate) {
        alert('Please fill in all required fields.');
        return;
    }
    if (type !== 'certifications' && !isPresent && !endDate) {
        alert('Please provide an end date or check "I currently work here".');
        return;
    }
    if (type === 'certifications' && !endDate) {
        alert('Please provide an issue date for the certification.');
        return;
    }

    const item = { title, organization, startDate, endDate, description, isPresent };

    if (index === '') {
        ProfileModel.addItem(type, item);
    } else {
        ProfileModel.updateItem(type, parseInt(index), item);
    }

    ProfileModel.save(currentUser.id);

    // Re-render items
    profileView.renderItems(
        document.getElementById(`${type}-items`),
        type === 'experience' ? ProfileModel.experience : type === 'education' ? ProfileModel.education : ProfileModel.certifications,
        type
    );

    profileView.updateProgress(ProfileModel.calculateProgress());

    const modal = bootstrap.Modal.getInstance(document.getElementById('itemModal'));
    modal.hide();
}

function toggleEditMode(isEditing) {
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const saveProfileBtn = document.getElementById('save-profile-btn');
    const editButtons = document.querySelectorAll('.edit-btn');
    const editItemButtons = document.querySelectorAll('.edit-item-btn');
    const profileImgOverlay = document.getElementById('profile-img-upload-overlay');

    editProfileBtn.style.display = isEditing ? 'none' : 'inline-block';
    saveProfileBtn.style.display = isEditing ? 'inline-block' : 'none';
    editButtons.forEach(btn => btn.style.display = isEditing ? 'inline-block' : 'none');
    editItemButtons.forEach(btn => btn.style.display = isEditing ? 'inline-block' : 'none');
    if (profileImgOverlay) {
        profileImgOverlay.style.display = isEditing ? 'flex' : 'none';
    }

    if (!isEditing) {
        handleSaveMainInfo();
        document.querySelectorAll('.editable-content').forEach(content => {
            if (content.id !== 'main-info-content') saveSection(content.id);
        });
        ProfileModel.save(currentUser.id);
        alert('Profile changes saved successfully!');
        profileView.updateProgress(ProfileModel.calculateProgress());
    } else {
        // Populate edit fields
        document.getElementById('edit-name').value = ProfileModel.data.name;
        document.getElementById('edit-title').value = ProfileModel.data.title;
        document.getElementById('edit-location').value = ProfileModel.data.location;
        document.getElementById('edit-email').value = ProfileModel.data.email;
        document.getElementById('edit-phone').value = ProfileModel.data.phone;
        document.getElementById('edit-portfolio').value = ProfileModel.data.portfolio;
        document.getElementById('edit-about-text').value = ProfileModel.data.about;
        document.getElementById('edit-skills-input').value = ProfileModel.data.skills;
        alert('Profile is now in Edit Mode. Click section pencils to edit specifics.');
    }
}

function saveSection(sectionId) {
    const content = document.getElementById(sectionId);
    if (!content) return;
    const staticView = content.querySelector('.static-view');
    const editView = content.querySelector('.edit-view');

    if (sectionId === 'about-content') {
        ProfileModel.update({ about: document.getElementById('edit-about-text').value.trim() });
        document.getElementById('display-about-text').textContent = ProfileModel.data.about;
    } else if (sectionId === 'skills-content') {
        ProfileModel.update({ skills: document.getElementById('edit-skills-input').value.trim() });
        profileView.renderSkills(ProfileModel.data.skills);
    }

    if (editView && editView.style.display !== 'none') {
        staticView.style.display = 'block';
        editView.style.display = 'none';
    }
}

window.toggleSectionEdit = (sectionId, forceEditMode = null) => {
    const content = document.getElementById(sectionId);
    const staticView = content.querySelector('.static-view');
    const editView = content.querySelector('.edit-view');
    const isCurrentlyEditing = staticView.style.display === 'none';
    const shouldBeEditing = forceEditMode !== null ? forceEditMode : !isCurrentlyEditing;
    if (shouldBeEditing) {
        staticView.style.display = 'none';
        editView.style.display = 'block';
    } else {
        saveSection(sectionId);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initProfile();

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            window.location.href = "login.html";
        });
    }

    const editBtn = document.getElementById("edit-profile-btn");
    if (editBtn) {
        editBtn.addEventListener("click", () => toggleEditMode(true));
    }

    const saveBtn = document.getElementById("save-profile-btn");
    if (saveBtn) {
        saveBtn.addEventListener("click", () => toggleEditMode(false));
    }

    // Add item buttons
    document.querySelectorAll('.add-item-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.target.getAttribute('data-type');
            handleAddItem(type);
        });
    });

    // Edit item buttons (delegated)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-item-btn') || e.target.closest('.edit-item-btn')) {
            const btn = e.target.classList.contains('edit-item-btn') ? e.target : e.target.closest('.edit-item-btn');
            const type = btn.getAttribute('data-type');
            const index = btn.getAttribute('data-index');
            handleEditItem(type, parseInt(index));
        }
    });

    // Modal save
    document.getElementById('itemForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handleSaveItem();
    });

    // Profile image upload
    const profileImgInput = document.getElementById('profile-img-input');
    const profileImgOverlay = document.getElementById('profile-img-upload-overlay');
    if (profileImgInput) {
        profileImgInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    ProfileModel.update({ image: e.target.result, hasPhoto: true });
                    ProfileModel.save(currentUser.id);
                    profileView.renderMainInfo(ProfileModel.data);
                    profileView.updateProgress(ProfileModel.calculateProgress());
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
});

window.renderNavbarUser = renderNavbarUser;
