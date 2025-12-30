from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional


app = FastAPI(title="Job Service API", description="Microservice for managing job listings with advanced details")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models (Updated based on Screenshots) ---
class Job(BaseModel):
    # Basic Info
    id: int
    title: str
    company: str
    company_logo: str       # New: URL for the logo
    location: str

    # Card & Filter Details
    salary_range: str
    job_type: str           # New: Full-time, Part-time, Contract
    remote: str             # New: Remote, Onsite, Hybrid
    experience_level: str   # New: Junior, Mid-Level, Senior
    posted_date: str        # New: ISO Date string (YYYY-MM-DD)

    # Detailed Page Info
    description: str
    responsibilities: List[str] # New: List of bullet points for responsibilities
    requirements: List[str] # New: List of bullet points
    benefits: List[str]     # New: List of bullet points
    company_overview: str   # New: Paragraph about company
    company_industry: str   # New: Company industry
    company_size: str       # New: Company size
    company_founded: str    # New: Company founded year
    easy_apply: bool        # New: To trigger the "Easy Apply" button

class Application(BaseModel):
    job_id: int
    user_id: int
    full_name: str
    email: str
    phone: Optional[str]
    linkedin: Optional[str]
    portfolio: Optional[str]
    cv_id: Optional[int] = None
    cover_letter: str
    consent: bool

# --- Mock Database (6 Jobs with full details) ---
jobs_db = [
    {
        "id": 1,
        "title": "Backend Engineer",
        "company": "TechNova",
        "company_logo": "assets/images/img1.jpg",
        "location": "San Francisco, CA",
        "salary_range": "$120k - $160k",
        "job_type": "Full-time",
        "remote": "Remote",
        "experience_level": "Senior",
        "posted_date": "1 hour ago",
        "description": "Develop scalable APIs using Python and FastAPI.",
        "responsibilities": ["Design and implement RESTful APIs", "Optimize database queries for performance", "Collaborate with frontend developers"],
        "requirements": ["5+ years Python experience", "Experience with AWS", "Knowledge of SQL and NoSQL"],
        "benefits": ["Health Insurance", "Unlimited PTO", "Home office stipend"],
        "company_overview": "TechNova is a leading innovator in cloud solutions.",
        "company_industry": "Technology",
        "company_size": "500-1000 employees",
        "company_founded": "2015",
        "easy_apply": True
    },
    {
        "id": 2,
        "title": "Data Scientist",
        "company": "DataCorp",
        "company_logo": "assets/images/img2.jpg",
        "location": "New York, NY",
        "salary_range": "$120k - $160k",
        "job_type": "Full-time",
        "remote": "Onsite",
        "experience_level": "Mid-Level",
        "posted_date": "2 Days",
        "description": "Analyze large datasets to build predictive models.",
        "responsibilities": ["Build machine learning models", "Clean and preprocess data", "Present findings to stakeholders"],
        "requirements": ["Masters in CS or Stats", "Python/R proficiency", "Experience with TensorFlow"],
        "benefits": ["401k Matching", "Gym Membership", "Free Lunch"],
        "company_overview": "DataCorp turns data into actionable insights for Fortune 500s.",
        "company_industry": "Data Analytics",
        "company_size": "1000-5000 employees",
        "company_founded": "2010",
        "easy_apply": False
    },
    {
        "id": 3,
        "title": "DevOps Engineer",
        "company": "CloudSystems",
        "company_logo": "assets/images/img3.jpg",
        "location": "Austin, TX",
        "salary_range": "$50k - $80k",
        "job_type": "Contract",
        "remote": "Hybrid",
        "experience_level": "Senior",
        "posted_date": "6 days",
        "description": "Manage AWS infrastructure and CI/CD pipelines.",
        "responsibilities": ["Set up CI/CD pipelines", "Monitor system performance", "Ensure security compliance"],
        "requirements": ["AWS Certified", "Docker & Kubernetes expert", "Linux administration"],
        "benefits": ["Flexible hours", "Remote options"],
        "company_overview": "CloudSystems helps businesses migrate to the cloud seamlessly.",
        "company_industry": "Cloud Computing",
        "company_size": "200-500 employees",
        "company_founded": "2018",
        "easy_apply": True
    },
    {
        "id": 4,
        "title": "Frontend Developer",
        "company": "Creative Web",
        "company_logo": "assets/images/img4.jpg",
        "location": "Los Angeles, CA",
        "salary_range": "$80k - $120k",
        "job_type": "Part-time",
        "remote": "Remote",
        "experience_level": "Junior",
        "posted_date": "1 week",
        "description": "Build responsive UI using React and TypeScript.",
        "responsibilities": ["Develop user interfaces", "Ensure cross-browser compatibility", "Participate in code reviews"],
        "requirements": ["1+ year React experience", "HTML/CSS mastery", "Portfolio required"],
        "benefits": ["Learning budget", "Mentorship program"],
        "company_overview": "Creative Web builds beautiful digital experiences.",
        "company_industry": "Web Development",
        "company_size": "50-200 employees",
        "company_founded": "2020",
        "easy_apply": True
    },
    {
        "id": 5,
        "title": "Product Manager",
        "company": "Innovate Ltd",
        "company_logo": "assets/images/img5.jpg",
        "location": "London, UK",
        "salary_range": "$80k - $120k",
        "job_type": "Full-time",
        "remote": "Hybrid",
        "experience_level": "Senior",
        "posted_date": "2 days",
        "description": "Lead product strategy and roadmap execution.",
        "responsibilities": ["Define product vision", "Work with engineering teams", "Analyze market trends"],
        "requirements": ["Agile methodology", "Strong communication skills", "Data-driven mindset"],
        "benefits": ["Stock options", "Private healthcare", "Travel allowance"],
        "company_overview": "Innovate Ltd creates products that change the world.",
        "company_industry": "Product Development",
        "company_size": "500-1000 employees",
        "company_founded": "2012",
        "easy_apply": False
    },
    {
        "id": 6,
        "title": "QA Automation Engineer",
        "company": "SecureCode",
        "company_logo": "assets/images/img6.jpg",
        "location": "Berlin, Germany",
        "salary_range": "$50k - $80k",
        "job_type": "Full-time",
        "remote": "Onsite",
        "experience_level": "Mid-Level",
        "posted_date": "1 month",
        "description": "Write automated tests using Selenium and PyTest.",
        "responsibilities": ["Create automated test scripts", "Identify and report bugs", "Maintain test frameworks"],
        "requirements": ["Python scripting", "Selenium WebDriver", "CI/CD integration"],
        "benefits": ["30 days vacation", "Public transport ticket", "German lessons"],
        "company_overview": "SecureCode ensures software reliability for banking sectors.",
        "company_industry": "Software Testing",
        "company_size": "100-500 employees",
        "company_founded": "2016",
        "easy_apply": True
    }
]

@app.get("/jobs", response_model=List[Job])
def get_all_jobs(
    keyword: Optional[str] = Query(None, description="Search title or description"),
    location: Optional[str] = Query(None, description="City or 'Remote'"),
    job_type: Optional[str] = Query(None, description="Full-time, Part-time, Contract"),
    experience_level: Optional[str] = Query(None, description="Junior, Senior, etc."),
    salary_range: Optional[str] = Query(None, description="Salary range filter"),
    company: Optional[str] = Query(None, description="Filter by company name")
):
    results = jobs_db

    # 1. Keyword Search (Title or Description)
    if keyword:
        kw = keyword.lower()
        results = [
            j for j in results 
            if kw in j["title"].lower() or kw in j["description"].lower()
        ]
    
    # 2. Location Filter
    if location:
        loc = location.lower()
        results = [
            j for j in results 
            if loc in j["location"].lower() or loc in j["remote"].lower()
        ]

    # 3. Job Type Filter
    if job_type:
        results = [j for j in results if j["job_type"].lower() == job_type.lower()]

    # 4. Experience Level Filter
    if experience_level:
        exp_filter = experience_level.lower().replace("-", " ").strip()
        results = [
            j for j in results 
            if j["experience_level"].lower().replace("-", " ").strip() == exp_filter
        ]

    # 5. Salary Range Filter
    if salary_range:
        salary_map = {
            "50k-80k": ["$50k - $80k", "$50K - $80K"],
            "80k-120k": ["$80k - $120k", "$80K - $120K"],
            "120k-160k": ["$120k - $160k", "$120K - $160K"],
            "160k+": ["$160k+", "$160K+"]
        }
        valid_salaries = salary_map.get(salary_range, [])
        results = [j for j in results if j["salary_range"] in valid_salaries]

    # 6. Company Filter
    if company:
        results = [j for j in results if j["company"].lower() == company.lower()]

    return results


@app.get("/jobs/{job_id}", response_model=Job)
def get_job_details(job_id: int):
    """
    Get detailed job view including requirements, benefits, and company overview.
    """
    job = next((item for item in jobs_db if item["id"] == job_id), None)

    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")

    return job

# --- Mock Database for Applications ---
applications_db = []

@app.get("/jobs/{job_id}/similar", response_model=List[Job])
def get_similar_jobs(job_id: int, limit: int = Query(3, description="Number of similar jobs to return")):
    """
    Get similar jobs based on job type and experience level.
    """
    job = next((item for item in jobs_db if item["id"] == job_id), None)

    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")

    # Find similar jobs based on job_type and experience_level
    similar_jobs = [
        j for j in jobs_db
        if j["id"] != job_id and
        (j["job_type"] == job["job_type"] or j["experience_level"] == job["experience_level"])
    ]

    # Sort by relevance (same job_type first, then same experience_level)
    similar_jobs.sort(key=lambda x: (
        x["job_type"] != job["job_type"],  # Same job_type gets priority (False sorts before True)
        x["experience_level"] != job["experience_level"]
    ))

    # Return limited number of similar jobs
    return similar_jobs[:limit]

@app.post("/applications", response_model=dict)
def submit_application(application: Application):
    """
    Submit a job application.
    """
    # In a real app, you'd validate the job exists, user exists, etc.
    # For now, just store it in the mock DB
    applications_db.append(application.dict())
    return {"message": "Application submitted successfully", "application_id": len(applications_db)}

    