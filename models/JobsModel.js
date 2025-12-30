export const JobsModel = {
    jobs: [],

    async fetchJobs() {
        try {
            const res = await fetch('http://127.0.0.1:5000/jobs'); // app.py endpoint
            this.jobs = await res.json();
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    },

    getJobs() {
        return this.jobs;
    }
};
