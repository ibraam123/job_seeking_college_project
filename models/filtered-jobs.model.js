const filtersModel = {
    selected: {
        type: "All Types",
        level: "All Levels",
        salary: "Any Salary",
    },

    // Demo job data (API data later)
    jobs: [
        {
            id: 1,
            title: "Senior Frontend Developer",
            company: "TechCorp",
            company_logo: "/assets/images/img1.jpg",
            description: "We are seeking a skilled Senior Frontend Developer to join our team and contribute to innovative web projects.",
            experience_level: "Senior Level",
            location: "Cairo",
            job_type: "Full-time",
            salary_range: "$120k - $160k",
            posted_date: "1 week ago"
        },
        {
            id: 2,
            title: "Junior Frontend Developer",
            company: "TechCorp",
            company_logo: "/assets/images/img2.jpg",
            description: "Exciting opportunity for a Junior Frontend Developer to work on cutting-edge technologies and grow your skills.",
            experience_level: "Entry Level",
            location: "San Francisco, CA",
            job_type: "Freelance",
            salary_range: "$120k - $160k",
            posted_date: "3 days ago"
        },
        {
            id: 3,
            title: "Product Designer",
            company: "Design Studio",
            company_logo: "/assets/images/img3.jpg",
            description: "Join our creative team as a Product Designer and help shape the future of user experiences.",
            experience_level: "Mid Level",
            location: "Remote",
            job_type: "Full-time",
            salary_range: "$80k - $120k",
            posted_date: "5 days ago"
        }
    ],

    setFilter(key, value) {
        this.selected[key] = value;
    },

    getFilteredJobs() {
        return this.jobs.filter(job => {
            const s = this.selected;

            return (
                (s.type === "All Types" || job.job_type === s.type) &&
                (s.level === "All Levels" || job.experience_level === s.level) &&
                (s.salary === "Any Salary" || job.salary_range === s.salary)
            );
        });
    }
};

export default filtersModel;