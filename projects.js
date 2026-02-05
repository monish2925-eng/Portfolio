// projects.js - Project data that will be dynamically loaded

const projectsData = [
    {
        id: 1,
        title: "Python Security Scripts",
        description: "A collection of Python security tools and scripts for penetration testing. Includes network scanners, password cracking utilities, OSINT tools, and automation scripts for common security tasks. Built to streamline reconnaissance and exploitation workflows.",
        tech: ["Python", "Networking", "Security", "Automation"],
        features: [
            "Network scanning automation",
            "Password utility tools",
            "OSINT gathering scripts",
            "Penetration testing helpers"
        ],
        github: "https://github.com/jarus10/python-script",
        live: "https://github.com/jarus10/python-script",
        image: ""
    },
    {
        id: 2,
        title: "Cybersecurity Portfolio",
        description: "My personal cybersecurity-focused portfolio website showcasing red teaming projects, CTF write-ups, and security research. Features a cyberpunk theme with neon accents and includes detailed documentation of my learning journey in ethical hacking.",
        tech: ["HTML5", "CSS3", "JavaScript", "Cyberpunk Design"],
        features: [
            "Responsive cyberpunk design",
            "Project showcase",
            "Skills and certifications",
            "Contact form with validation"
        ],
        github: "https://github.com/jarus10/Portfolio",
        live: "https://jarus10.github.io/Portfolio",
        image: ""
    },
    {
        id: 3,
        title: "Jarus10 Security Hub",
        description: "A comprehensive repository documenting my cybersecurity journey, including TryHackMe write-ups, tool configurations, and security resources. Contains cheatsheets for privilege escalation, web exploitation techniques, and Active Directory attacks.",
        tech: ["Markdown", "Security Tools", "Documentation"],
        features: [
            "TryHackMe room write-ups",
            "Security cheatsheets",
            "Tool installation guides",
            "CTF challenge solutions"
        ],
        github: "https://github.com/jarus10/Jarus10",
        live: "https://github.com/jarus10/Jarus10",
        image: ""
    },
    {
        id: 4,
        title: "Pavarga 2025 CTF",
        description: "Capture The Flag platform and challenges developed for the Pavarga 2025 cybersecurity competition. Includes web exploitation, cryptography, forensics, and reverse engineering challenges designed to test various security skills.",
        tech: ["JavaScript", "Web Security", "CTF Design"],
        features: [
            "Multiple CTF categories",
            "Challenge management system",
            "Scoreboard tracking",
            "Security challenge design"
        ],
        github: "https://github.com/jarus10/pavarga2025",
        live: "https://github.com/jarus10/pavarga2025",
        image: ""
    },
    {
        id: 5,
        title: "Login Dashboard App",
        description: "A secure authentication and dashboard application demonstrating best practices in user authentication, session management, and secure frontend development. Implements modern security features including CSRF protection and secure password handling.",
        tech: ["HTML5", "CSS3", "JavaScript", "Authentication"],
        features: [
            "Secure user authentication",
            "Session management",
            "Responsive dashboard UI",
            "Security best practices"
        ],
        github: "https://github.com/jarus10/login_dashboard_app",
        live: "https://github.com/jarus10/login_dashboard_app",
        image: ""
    },
    {
        id: 6,
        title: "Linux Privilege Escalation Notes",
        description: "Comprehensive documentation and cheatsheet for Linux privilege escalation techniques. Covers SUID binaries, capabilities, kernel exploits, cron jobs, and more. Based on hands-on practice from TryHackMe and HackTheBox machines.",
        tech: ["Linux", "Bash", "Documentation", "Security"],
        features: [
            "Privilege escalation techniques",
            "Command reference guide",
            "Real-world examples",
            "Enumeration scripts"
        ],
        github: "https://github.com/jarus10/linux-privesc-notes",
        live: "https://github.com/jarus10/linux-privesc-notes",
        image: ""
    }
];

// Function to create project cards
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) return;
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-aos', 'fade-up');
        
        projectCard.innerHTML = `
            <div class="project-image">
                ${project.image 
                    ? `<img src="${project.image}" alt="${project.title}">` 
                    : '<div class="project-placeholder">🔐</div>'
                }
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" class="project-link">GitHub</a>
                    <a href="${project.live}" target="_blank" class="project-link">View Project</a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Load projects when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProjects);
} else {
    loadProjects();
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projectsData };
}
