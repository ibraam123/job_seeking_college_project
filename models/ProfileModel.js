export const ProfileModel = {
    data: {
        name: "",
        email: "",
        title: "",
        location: "",
        phone: "",
        portfolio: "",
        about: "",
        skills: "",
        hasPhoto: false,
        image: "",
        applicationsSent: 0,
        appliedJobs: []
    },

    experience: [],
    education: [],
    certifications: [],

    initFromUser(user) {
        this.data.name = user.name || user.displayName || "User";
        this.data.email = user.email || "";
    },

    load(userId) {
        const key = `profile_${userId}`;
        const stored = localStorage.getItem(key);

        if (stored) {
            const parsed = JSON.parse(stored);
            this.data = { ...this.data, ...parsed.data };
            this.experience = parsed.experience || [];
            this.education = parsed.education || [];
            this.certifications = parsed.certifications || [];
        }
    },

    save(userId) {
        const key = `profile_${userId}`;
        localStorage.setItem(
            key,
            JSON.stringify({
                data: this.data,
                experience: this.experience,
                education: this.education,
                certifications: this.certifications
            })
        );
    },

    update(fields) {
        this.data = { ...this.data, ...fields };
    },

    calculateProgress() {
        let filled = 0;
        const total = 6;

        if (this.data.hasPhoto) filled++;
        if (this.data.about && this.data.about.length > 0) filled++;
        if (this.experience.length > 0) filled++;
        if (this.education.length > 0) filled++;
        if (this.certifications.length > 0) filled++;
        if (this.data.portfolio && this.data.portfolio.startsWith("http"))
            filled++;

        return Math.round((filled / total) * 100);
    },

    addItem(type, item) {
        if (type === 'experience') {
            this.experience.push(item);
        } else if (type === 'education') {
            this.education.push(item);
        } else if (type === 'certifications') {
            this.certifications.push(item);
        }
    },

    updateItem(type, index, item) {
        if (type === 'experience') {
            this.experience[index] = item;
        } else if (type === 'education') {
            this.education[index] = item;
        } else if (type === 'certifications') {
            this.certifications[index] = item;
        }
    },

    deleteItem(type, index) {
        if (type === 'experience') {
            this.experience.splice(index, 1);
        } else if (type === 'education') {
            this.education.splice(index, 1);
        } else if (type === 'certifications') {
            this.certifications.splice(index, 1);
        }
    },

    addAppliedJob(job) {
        if (!this.data.appliedJobs.some(applied => applied.jobId === job.jobId)) {
            this.data.appliedJobs.push(job);
            this.data.applicationsSent = this.data.appliedJobs.length;
        }
    },

    getAppliedJobs() {
        return this.data.appliedJobs;
    }
};
