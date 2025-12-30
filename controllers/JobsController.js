import { JobsModel } from '../models/JobsModel.js';
import { JobsView } from '../views/JobsView.js';

export const JobsController = {
    async init() {
        await JobsModel.fetchJobs();
        JobsView.renderJobs(JobsModel.getJobs());

        const searchBtn = document.getElementById('search-btn');
        searchBtn.addEventListener('click', () => this.searchJobs());
    },

    searchJobs() {
        const keyword = document.getElementById('first-search').value.toLowerCase();
        const location = document.getElementById('second-search').value.toLowerCase();

        const filtered = JobsModel.getJobs().filter(job => 
            job.title.toLowerCase().includes(keyword) &&
            job.location.toLowerCase().includes(location)
        );

        JobsView.renderJobs(filtered);
    }
};
// JobModel.js - Model for job data and API interactions
// This model handles fetching job listings, saving jobs, and job details from the Flask backend.
// It uses fetch() for API calls and stores data in a scoped object to avoid global conflicts.

export class JobModel {
  constructor() {
    this.jobs = []; // Array to hold job data
    this.savedJobs = []; // Array to hold saved jobs
    this.currentJob = null; // Object for current job details
  }

  // Fetch all jobs from Flask backend
  async fetchJobs() {
    try {
      const response = await fetch('/api/jobs'); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch jobs');
      this.jobs = await response.json();
      return this.jobs;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  }

  // Fetch saved jobs for the user
  async fetchSavedJobs() {
    try {
      const response = await fetch('/api/saved-jobs'); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch saved jobs');
      this.savedJobs = await response.json();
      return this.savedJobs;
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      return [];
    }
  }

  // Fetch details for a specific job
  async fetchJobDetails(jobId) {
    try {
      const response = await fetch(`/api/job/${jobId}`); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch job details');
      this.currentJob = await response.json();
      return this.currentJob;
    } catch (error) {
      console.error('Error fetching job details:', error);
      return null;
    }
  }

  // Save a job (POST to backend)
  async saveJob(jobId) {
    try {
      const response = await fetch('/api/save-job', { // Assuming your Flask endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId })
      });
      if (!response.ok) throw new Error('Failed to save job');
      return await response.json();
    } catch (error) {
      console.error('Error saving job:', error);
      return null;
    }
  }
}// JobModel.js - Model for job data and API interactions
// This model handles fetching job listings, saving jobs, and job details from the Flask backend.
// It uses fetch() for API calls and stores data in a scoped object to avoid global conflicts.

export class JobModel {
  constructor() {
    this.jobs = []; // Array to hold job data
    this.savedJobs = []; // Array to hold saved jobs
    this.currentJob = null; // Object for current job details
  }

  // Fetch all jobs from Flask backend
  async fetchJobs() {
    try {
      const response = await fetch('/api/jobs'); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch jobs');
      this.jobs = await response.json();
      return this.jobs;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  }

  // Fetch saved jobs for the user
  async fetchSavedJobs() {
    try {
      const response = await fetch('/api/saved-jobs'); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch saved jobs');
      this.savedJobs = await response.json();
      return this.savedJobs;
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      return [];
    }
  }

  // Fetch details for a specific job
  async fetchJobDetails(jobId) {
    try {
      const response = await fetch(`/api/job/${jobId}`); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch job details');
      this.currentJob = await response.json();
      return this.currentJob;
    } catch (error) {
      console.error('Error fetching job details:', error);
      return null;
    }
  }

  // Save a job (POST to backend)
  async saveJob(jobId) {
    try {
      const response = await fetch('/api/save-job', { // Assuming your Flask endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId })
      });
      if (!response.ok) throw new Error('Failed to save job');
      return await response.json();
    } catch (error) {
      console.error('Error saving job:', error);
      return null;
    }
  }
}// JobModel.js - Model for job data and API interactions
// This model handles fetching job listings, saving jobs, and job details from the Flask backend.
// It uses fetch() for API calls and stores data in a scoped object to avoid global conflicts.

export class JobModel {
  constructor() {
    this.jobs = []; // Array to hold job data
    this.savedJobs = []; // Array to hold saved jobs
    this.currentJob = null; // Object for current job details
  }

  // Fetch all jobs from Flask backend
  async fetchJobs() {
    try {
      const response = await fetch('/api/jobs'); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch jobs');
      this.jobs = await response.json();
      return this.jobs;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  }

  // Fetch saved jobs for the user
  async fetchSavedJobs() {
    try {
      const response = await fetch('/api/saved-jobs'); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch saved jobs');
      this.savedJobs = await response.json();
      return this.savedJobs;
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      return [];
    }
  }

  // Fetch details for a specific job
  async fetchJobDetails(jobId) {
    try {
      const response = await fetch(`/api/job/${jobId}`); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch job details');
      this.currentJob = await response.json();
      return this.currentJob;
    } catch (error) {
      console.error('Error fetching job details:', error);
      return null;
    }
  }

  // Save a job (POST to backend)
  async saveJob(jobId) {
    try {
      const response = await fetch('/api/save-job', { // Assuming your Flask endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId })
      });
      if (!response.ok) throw new Error('Failed to save job');
      return await response.json();
    } catch (error) {
      console.error('Error saving job:', error);
      return null;
    }
  }
}// JobModel.js - Model for job data and API interactions
// This model handles fetching job listings, saving jobs, and job details from the Flask backend.
// It uses fetch() for API calls and stores data in a scoped object to avoid global conflicts.

export class JobModel {
  constructor() {
    this.jobs = []; // Array to hold job data
    this.savedJobs = []; // Array to hold saved jobs
    this.currentJob = null; // Object for current job details
  }

  // Fetch all jobs from Flask backend
  async fetchJobs() {
    try {
      const response = await fetch('/api/jobs'); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch jobs');
      this.jobs = await response.json();
      return this.jobs;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  }

  // Fetch saved jobs for the user
  async fetchSavedJobs() {
    try {
      const response = await fetch('/api/saved-jobs'); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch saved jobs');
      this.savedJobs = await response.json();
      return this.savedJobs;
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      return [];
    }
  }

  // Fetch details for a specific job
  async fetchJobDetails(jobId) {
    try {
      const response = await fetch(`/api/job/${jobId}`); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch job details');
      this.currentJob = await response.json();
      return this.currentJob;
    } catch (error) {
      console.error('Error fetching job details:', error);
      return null;
    }
  }

  // Save a job (POST to backend)
  async saveJob(jobId) {
    try {
      const response = await fetch('/api/save-job', { // Assuming your Flask endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId })
      });
      if (!response.ok) throw new Error('Failed to save job');
      return await response.json();
    } catch (error) {
      console.error('Error saving job:', error);
      return null;
    }
  }
}// JobModel.js - Model for job data and API interactions
// This model handles fetching job listings, saving jobs, and job details from the Flask backend.
// It uses fetch() for API calls and stores data in a scoped object to avoid global conflicts.

export class JobModel {
  constructor() {
    this.jobs = []; // Array to hold job data
    this.savedJobs = []; // Array to hold saved jobs
    this.currentJob = null; // Object for current job details
  }

  // Fetch all jobs from Flask backend
  async fetchJobs() {
    try {
      const response = await fetch('/api/jobs'); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch jobs');
      this.jobs = await response.json();
      return this.jobs;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  }

  // Fetch saved jobs for the user
  async fetchSavedJobs() {
    try {
      const response = await fetch('/api/saved-jobs'); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch saved jobs');
      this.savedJobs = await response.json();
      return this.savedJobs;
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      return [];
    }
  }

  // Fetch details for a specific job
  async fetchJobDetails(jobId) {
    try {
      const response = await fetch(`/api/job/${jobId}`); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch job details');
      this.currentJob = await response.json();
      return this.currentJob;
    } catch (error) {
      console.error('Error fetching job details:', error);
      return null;
    }
  }

  // Save a job (POST to backend)
  async saveJob(jobId) {
    try {
      const response = await fetch('/api/save-job', { // Assuming your Flask endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId })
      });
      if (!response.ok) throw new Error('Failed to save job');
      return await response.json();
    } catch (error) {
      console.error('Error saving job:', error);
      return null;
    }
  }
}// JobModel.js - Model for job data and API interactions
// This model handles fetching job listings, saving jobs, and job details from the Flask backend.
// It uses fetch() for API calls and stores data in a scoped object to avoid global conflicts.

export class JobModel {
  constructor() {
    this.jobs = []; // Array to hold job data
    this.savedJobs = []; // Array to hold saved jobs
    this.currentJob = null; // Object for current job details
  }

  // Fetch all jobs from Flask backend
  async fetchJobs() {
    try {
      const response = await fetch('/api/jobs'); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch jobs');
      this.jobs = await response.json();
      return this.jobs;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  }

  // Fetch saved jobs for the user
  async fetchSavedJobs() {
    try {
      const response = await fetch('/api/saved-jobs'); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch saved jobs');
      this.savedJobs = await response.json();
      return this.savedJobs;
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      return [];
    }
  }

  // Fetch details for a specific job
  async fetchJobDetails(jobId) {
    try {
      const response = await fetch(`/api/job/${jobId}`); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch job details');
      this.currentJob = await response.json();
      return this.currentJob;
    } catch (error) {
      console.error('Error fetching job details:', error);
      return null;
    }
  }

  // Save a job (POST to backend)
  async saveJob(jobId) {
    try {
      const response = await fetch('/api/save-job', { // Assuming your Flask endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId })
      });
      if (!response.ok) throw new Error('Failed to save job');
      return await response.json();
    } catch (error) {
      console.error('Error saving job:', error);
      return null;
    }
  }
}// JobModel.js - Model for job data and API interactions
// This model handles fetching job listings, saving jobs, and job details from the Flask backend.
// It uses fetch() for API calls and stores data in a scoped object to avoid global conflicts.

export class JobModel {
  constructor() {
    this.jobs = []; // Array to hold job data
    this.savedJobs = []; // Array to hold saved jobs
    this.currentJob = null; // Object for current job details
  }

  // Fetch all jobs from Flask backend
  async fetchJobs() {
    try {
      const response = await fetch('/api/jobs'); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch jobs');
      this.jobs = await response.json();
      return this.jobs;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  }

  // Fetch saved jobs for the user
  async fetchSavedJobs() {
    try {
      const response = await fetch('/api/saved-jobs'); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch saved jobs');
      this.savedJobs = await response.json();
      return this.savedJobs;
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      return [];
    }
  }

  // Fetch details for a specific job
  async fetchJobDetails(jobId) {
    try {
      const response = await fetch(`/api/job/${jobId}`); // Assuming your Flask endpoint
      if (!response.ok) throw new Error('Failed to fetch job details');
      this.currentJob = await response.json();
      return this.currentJob;
    } catch (error) {
      console.error('Error fetching job details:', error);
      return null;
    }
  }

  // Save a job (POST to backend)
  async saveJob(jobId) {
    try {
      const response = await fetch('/api/save-job', { // Assuming your Flask endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId })
      });
      if (!response.ok) throw new Error('Failed to save job');
      return await response.json();
    } catch (error) {
      console.error('Error saving job:', error);
      return null;
    }
  }
}