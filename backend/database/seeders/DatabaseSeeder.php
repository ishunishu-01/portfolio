<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Skill;
use App\Models\Project;
use App\Models\Experience;
use App\Models\Education;
use App\Models\Certification;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User
        User::updateOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password123'),
            ]
        );

        // 2. Skills
        $skills = [
            ['name' => 'React',       'category' => 'Frontend',  'level' => 'Advanced'],
            ['name' => 'Next.js',     'category' => 'Frontend',  'level' => 'Intermediate'],
            ['name' => 'JavaScript',  'category' => 'Frontend',  'level' => 'Advanced'],
            ['name' => 'TypeScript',  'category' => 'Frontend',  'level' => 'Intermediate'],
            ['name' => 'Tailwind CSS','category' => 'Frontend',  'level' => 'Advanced'],
            ['name' => 'Laravel',     'category' => 'Backend',   'level' => 'Advanced'],
            ['name' => 'PHP',         'category' => 'Backend',   'level' => 'Advanced'],
            ['name' => 'Node.js',     'category' => 'Backend',   'level' => 'Intermediate'],
            ['name' => 'REST API',    'category' => 'Backend',   'level' => 'Advanced'],
            ['name' => 'Python',      'category' => 'Backend',   'level' => 'Intermediate'],
            ['name' => 'MySQL',       'category' => 'Database',  'level' => 'Advanced'],
            ['name' => 'Prisma',      'category' => 'Database',  'level' => 'Intermediate'],
            ['name' => 'Git',         'category' => 'Tools',     'level' => 'Expert'],
            ['name' => 'Docker',      'category' => 'Tools',     'level' => 'Intermediate'],
            ['name' => 'Postman',     'category' => 'Tools',     'level' => 'Advanced'],
            ['name' => 'Machine Learning', 'category' => 'AI/ML', 'level' => 'Intermediate'],
            ['name' => 'NLP',         'category' => 'AI/ML',     'level' => 'Beginner'],
        ];

        foreach ($skills as $i => $skill) {
            $skill['sort_order'] = $i;
            Skill::create($skill);
        }

        // 3. Projects
        $projects = [
            [
                'title' => 'MediCare Pharmacy ERP',
                'description' => 'A comprehensive pharmacy management system with inventory control, billing, prescription management, supplier tracking, and daily report analytics dashboard.',
                'technologies' => ['Laravel', 'PHP', 'MySQL', 'Blade', 'Bootstrap'],
                'image' => '/assets/projects/medicarepharmacy2.png',
                'github_url' => 'https://github.com/yourusername/medicare-erp',
                'live_url' => null,
                'category' => 'Web App',
                'featured' => true,
            ],
            [
                'title' => 'Fertilizer Shop Management',
                'description' => 'A full-featured POS and inventory system for fertilizer shops with stock tracking, supplier management, customer billing, contact form, and automated email replies.',
                'technologies' => ['Laravel', 'PHP', 'MySQL', 'Blade', 'Bootstrap'],
                'image' => '/assets/projects/ferlilizershopmanagementsystem.png',
                'github_url' => 'https://github.com/yourusername/fertilizer-shop',
                'live_url' => null,
                'category' => 'Web App',
                'featured' => false,
            ],
            [
                'title' => 'AI-Integrated OSINT & Privacy Risk Framework',
                'description' => 'An AI-powered OSINT tool for automated digital footprint discovery and identity verification, featuring face recognition, Google CSE integration, and privacy risk scoring.',
                'technologies' => ['Python', 'Streamlit', 'ArcFace', 'Google CSE API', 'NLP'],
                'image' => '/assets/projects/osint-privacy-risk.png',
                'github_url' => 'https://github.com/yourusername/osint-privacy',
                'live_url' => null,
                'category' => 'AI / ML',
                'featured' => true,
            ],
            [
                'title' => 'React CRUD Notice Board App',
                'description' => 'A Company Notice Board application built with React frontend and Laravel REST API backend, supporting full CRUD operations with search functionality.',
                'technologies' => ['React', 'Laravel', 'MySQL', 'REST API', 'Vite'],
                'image' => '/assets/projects/reactcrudfrontend.png',
                'github_url' => 'https://github.com/yourusername/react-crud-app',
                'live_url' => null,
                'category' => 'Web App',
                'featured' => false,
            ],
            [
                'title' => 'Student Management System',
                'description' => 'A full student portal with dashboard, subject management, exam scheduling, quiz tracking, attendance (94%), grade reports, and profile management for students.',
                'technologies' => ['Laravel', 'MySQL', 'PHP', 'Blade', 'Bootstrap'],
                'image' => '/assets/projects/studentmangement1.png',
                'github_url' => 'https://github.com/yourusername/student-management',
                'live_url' => null,
                'category' => 'Web App',
                'featured' => false,
            ],
            [
                'title' => 'Wanderlust Travel Website',
                'description' => 'A stunning travel booking platform with destination discovery, tour browsing, and a premium UI featuring hero sections, animated statistics, and responsive design.',
                'technologies' => ['React', 'Vite', 'CSS', 'JavaScript'],
                'image' => '/assets/projects/wondelusttravelsite.png',
                'github_url' => 'https://github.com/yourusername/wanderlust-travel',
                'live_url' => null,
                'category' => 'Frontend',
                'featured' => true,
            ],
        ];

        foreach ($projects as $i => $project) {
            $project['sort_order'] = $i;
            Project::create($project);
        }

        // 4. Experiences
        $experiences = [
            [
                'company' => 'Self-Employed / Freelance',
                'role' => 'Full-Stack Developer',
                'location' => 'Sri Lanka (Remote)',
                'start_date' => '2023-01',
                'end_date' => null,
                'is_current' => true,
                'description' => "Working as a freelance full-stack developer building custom web applications for clients across various industries including healthcare, retail, and agriculture.\n\nAchievements:\n- Built MediCare Pharmacy ERP using React + Laravel + MySQL\n- Developed Fertilizer Shop Management System with Next.js + Prisma\n- Delivered REST API integrations for multiple client projects\n- Managed end-to-end project delivery including design, development, and deployment",
                'technologies' => ['React', 'Laravel', 'MySQL', 'Next.js', 'TypeScript'],
            ],
            [
                'company' => 'University Project',
                'role' => 'AI/ML Developer',
                'location' => 'Sri Lanka',
                'start_date' => '2024-01',
                'end_date' => '2024-06',
                'is_current' => false,
                'description' => "Led development of an AI-based OSINT privacy risk assessment tool as a final year project, applying machine learning and natural language processing techniques.\n\nAchievements:\n- Designed ML pipeline for privacy risk scoring from OSINT data\n- Implemented NLP-based entity recognition using Python\n- Built Flask REST API to serve ML model predictions\n- Achieved 87% accuracy on test dataset",
                'technologies' => ['Python', 'TensorFlow', 'Flask', 'NLP', 'Machine Learning'],
            ],
        ];

        foreach ($experiences as $i => $exp) {
            $exp['sort_order'] = $i;
            Experience::create($exp);
        }

        // 5. Education
        $educationList = [
            [
                'institution' => 'Rajarata University of srilanka',
                'degree' => 'Bachelor of Information and Communication Technology(Hons)',
                'field' => 'Information and Communication Technology',
                'grade' => 'Expected 2026',
                'start_date' => '2021-09',
                'end_date' => '2026-06',
                'description' => "Studying software engineering, web development, databases, networking, AI/ML, cybersecurity, and project management.\n\nHighlights:\n- Specialization in Software Engineering & AI\n- Final Year Project: AI-Based OSINT Privacy Risk Assessment\n- Active member of IT Society ATIT\n- Dean's List recognition",
            ],
        ];

        foreach ($educationList as $i => $edu) {
            $edu['sort_order'] = $i;
            Education::create($edu);
        }

        // 6. Certifications
        $certifications = [
            ['name' => 'Introduction to the Internet of Things (IoT)', 'organization' => 'Alison', 'issue_date' => '2023-01', 'category' => 'IoT', 'credential_id' => '1747-49967198', 'certificate_url' => 'https://alison.com', 'certificate_image' => '/assets/certificates/cert-1.jpg', 'icon' => '📡'],
            ['name' => 'ISO 9001:2015 — The Complete Guide to Quality Management Systems QMS', 'organization' => 'Alison', 'issue_date' => '2023-01', 'category' => 'Quality Management', 'credential_id' => '7499-49967190', 'certificate_url' => 'https://alison.com', 'certificate_image' => '/assets/certificates/cert-2.jpg', 'icon' => '✅'],
            ['name' => 'Basics of Prompt Engineering', 'organization' => 'Alison', 'issue_date' => '2023-01', 'category' => 'AI / ML', 'credential_id' => '6130-49967190', 'certificate_url' => 'https://alison.com', 'certificate_image' => '/assets/certificates/cert-3.jpg', 'icon' => '🤖'],
            ['name' => 'Figma Course', 'organization' => 'DP Education IT Campus', 'issue_date' => '2026-01', 'category' => 'Design', 'credential_id' => '', 'certificate_url' => '', 'certificate_image' => '/assets/certificates/cert-4.png', 'icon' => '🎨'],
            ['name' => 'Machine Learning for Absolute Beginners', 'organization' => 'Alison', 'issue_date' => '2023-01', 'category' => 'AI / ML', 'credential_id' => '4340-49967190', 'certificate_url' => 'https://alison.com', 'certificate_image' => '/assets/certificates/cert-5.jpg', 'icon' => '🧠'],
            ['name' => 'Fundamentals of Manual Handling', 'organization' => 'Alison', 'issue_date' => '2023-01', 'category' => 'General', 'credential_id' => '1668-49967190', 'certificate_url' => 'https://alison.com', 'certificate_image' => '/assets/certificates/cert-7.jpg', 'icon' => '📦'],
            ['name' => 'Introduction to DevOps Tools', 'organization' => 'Simplilearn SkillUp', 'issue_date' => '2026-01', 'category' => 'DevOps', 'credential_id' => '9733717', 'certificate_url' => 'https://simplilearn.com', 'certificate_image' => '/assets/certificates/cert-9.png', 'icon' => '⚙️'],
            ['name' => 'Software Quality Assurance Manual Testing', 'organization' => 'Coding Academy', 'issue_date' => '2023-01', 'category' => 'QA / Testing', 'credential_id' => '', 'certificate_url' => '', 'certificate_image' => '/assets/certificates/cert-10.jpg', 'icon' => '🔍'],
        ];

        foreach ($certifications as $i => $cert) {
            $cert['sort_order'] = $i;
            Certification::create($cert);
        }
    }
}
