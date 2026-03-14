from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Company, Job, StudentProfile, Application

User = get_user_model()

class AdminAndJobPostingTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create an admin user
        self.admin_user = User.objects.create_superuser(
            username='adminuser', password='password123', email='admin@example.com'
        )
        
        # Create a recruiter user and company
        self.recruiter_user = User.objects.create_user(
            username='recruiteruser', password='password123', role='recruiter'
        )
        self.company = Company.objects.create(user=self.recruiter_user, name='Test Company')
        
        # Create a student user and profile
        self.student_user = User.objects.create_user(
            username='studentuser', password='password123', role='student'
        )
        self.student_profile = StudentProfile.objects.create(
            user=self.student_user, first_name='Test', last_name='Student', major='CS'
        )

    def test_job_posting_success(self):
        """Test that a recruiter can post a job without explicitly sending the company ID."""
        self.client.force_authenticate(user=self.recruiter_user)
        url = '/api/recruiter/jobs/'
        data = {
            'title': 'Software Engineer',
            'description': 'A great job',
            'required_skills': 'Python, Django',
            'experience_needed': '1-2 years',
            'salary_package': '10 LPA',
            'location': 'Remote'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Job.objects.count(), 1)
        self.assertEqual(Job.objects.first().company, self.company)

    def test_admin_dashboard_stats(self):
        """Test that the admin dashboard returns correct stats."""
        # Post a job first
        Job.objects.create(
            company=self.company, title='Job 1', description='Desc', 
            required_skills='Skills', location='Loc'
        )
        
        self.client.force_authenticate(user=self.admin_user)
        url = '/api/admin/dashboard/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_students'], 1)
        self.assertEqual(response.data['total_companies'], 1)
        self.assertEqual(response.data['total_jobs'], 1)

    def test_admin_student_list(self):
        """Test that admin can view the list of students."""
        self.client.force_authenticate(user=self.admin_user)
        url = '/api/admin/students/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['first_name'], 'Test')

    def test_admin_company_list(self):
        """Test that admin can view the list of companies."""
        self.client.force_authenticate(user=self.admin_user)
        url = '/api/admin/companies/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Test Company')

    def test_admin_access_restriction(self):
        """Test that non-admin users cannot access admin endpoints."""
        self.client.force_authenticate(user=self.student_user)
        url = '/api/admin/dashboard/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
