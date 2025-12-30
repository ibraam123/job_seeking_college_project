// models/CvModel.js
export const CvModel = {
    key(userId) {
        return `cvs_${userId}`;
    },

    getAll(userId) {
        return JSON.parse(localStorage.getItem(this.key(userId))) || [];
    },

    getById(userId, id) {
        return this.getAll(userId).find(c => c.id === id);
    },

    save(userId, cvs) {
        localStorage.setItem(this.key(userId), JSON.stringify(cvs));
    },

    add(userId, cv) {
        let cvs = this.getAll(userId);

        // If the new CV is set as primary, unmark all existing CVs as primary
        if (cv.isPrimary) {
            cvs = cvs.map(c => ({ ...c, isPrimary: false }));
        }

        // Ensure downloads field exists
        cv.downloads = cv.downloads || 0;

        cvs.push(cv);
        this.save(userId, cvs);
    },

    update(userId, updatedCv) {
        let cvs = this.getAll(userId);
        cvs = cvs.map(c => {
            if (updatedCv.isPrimary) c.isPrimary = false; // unset all if new is primary
            return c.id === updatedCv.id ? { ...updatedCv } : c;
        });
        this.save(userId, cvs);
    },

    delete(userId, id) {
        const cvs = this.getAll(userId).filter(c => c.id !== id);
        this.save(userId, cvs);
    },

    setPrimary(userId, id) {
        const cvs = this.getAll(userId).map(c => ({
            ...c,
            isPrimary: c.id === id
        }));
        this.save(userId, cvs);
    },

    incrementDownloads(userId, id) {
        const cvs = this.getAll(userId).map(c => {
            if (c.id === id) {
                return { ...c, downloads: (c.downloads || 0) + 1 };
            }
            return c;
        });
        this.save(userId, cvs);
    }
};
