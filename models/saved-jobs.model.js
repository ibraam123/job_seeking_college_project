export const savedJobsModel = {
    key: "savedJobs",

    getAll() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    },

    save(jobHTML) {
        const jobs = this.getAll();
        jobs.push(jobHTML);
        localStorage.setItem(this.key, JSON.stringify(jobs));
    },

    remove(jobHTML) {
        let jobs = this.getAll();
        jobs = jobs.filter(j => j !== jobHTML);
        localStorage.setItem(this.key, JSON.stringify(jobs));
    },

    exists(jobHTML) {
        return this.getAll().includes(jobHTML);
    }
};