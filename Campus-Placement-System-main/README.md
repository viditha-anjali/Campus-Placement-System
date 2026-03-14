# Smart Campus Placement System

A modern, AI-powered platform designed to automate and streamline the campus placement process for students, recruiters, and administrators.

## 🚀 Overview
The **Smart Campus Placement System** acts as a bridge between students seeking opportunities and recruiters searching for talent. It leverages Machine Learning to provide intelligent features like automated resume parsing and skill-based job recommendations, ensuring a more efficient matches for both parties.

## 🛠️ Tech Stack
### **Frontend**
- **Framework:** [React.js](https://reactjs.org/) (Vite)
- **Styling:** [Bootstrap 5](https://getbootstrap.com/)
- **Routing:** React Router DOM
- **API Client:** Axios

### **Backend**
- **Framework:** [Django](https://www.djangoproject.com/)
- **API:** Django REST Framework (DRF)
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** SQLite (default)

### **Machine Learning Engine**
- **NLP & Parsing:** [Spacy](https://spacy.io/), [PyMuPDF](https://pymupdf.readthedocs.io/)
- **Recommendations:** [Scikit-Learn](https://scikit-learn.org/) (TF-IDF & Cosine Similarity)

## 🔄 System Workflow

### **1. Student Journey**
- **Registration:** Create a profile and provide academic details.
- **Resume Parsing:** Upload a PDF resume; the system uses NLP to extract relevant skills automatically.
- **Job Discovery:** Browse job listings or view **AI-powered recommendations** tailored to their skill set.
- **Application:** Apply for multiple positions and track status (Applied → Shortlisted → Selected).

### **2. Recruiter Journey**
- **Company Management:** Create and manage company profiles.
- **Job Postings:** Post vacancies with detailed descriptions and required skills.
- **Applicant Management:** Review applications and view **candidate rankings** based on skill similarity.
- **Hiring Pipeline:** Move candidates through various stages of the interview process.

### **3. Admin Management**
- **Monitoring:** Manage students, recruiters, and job listings.
- **Analytics:** View placement statistics and overall system activity.
- **Control:** Secure the platform through role-based access control.

## ⚙️ Setup & Installation

### **Prerequisites**
- Python 3.8+
- Node.js (v16+)
- npm

### **Backend Setup**
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install required packages:
   ```bash
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers scikit-learn pandas numpy spacy nltk pymupdf
   ```
4. Download the NLP model:
   ```bash
   python -m spacy download en_core_web_sm
   ```
5. Apply database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
6. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```
7. Start the server:
   ```bash
   python manage.py runserver
   ```

### **Frontend Setup**
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## ✨ Key Features
- 📄 **PDF Resume Parsing:** Automatic skill extraction using Spacy.
- 🎯 **Intelligent Recommendations:** TF-IDF based matching for jobs and candidates.
- 🔐 **Secure Authentication:** JWT-based login for all roles.
- 📱 **Responsive Design:** Mobile-friendly UI built with Bootstrap.
- 📊 **Real-time Tracking:** Seamless application status updates.

## 📂 Project Structure
```text
Campus-Placement-System/
├── backend/                # Django Backend
│   ├── core/               # Main logic, models, and views
│   ├── ml_engine/          # Resume parser and recommender
│   ├── smart_placement/    # Project settings
│   └── manage.py
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Student, Recruiter, Admin dashboards
│   │   └── App.jsx
│   └── package.json
└── setup_backend.ps1      # Setup automation script
```
