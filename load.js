document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll('.projects .project-card');
    const loadMoreButton = document.querySelector('.load-more');

    let projectsPerPage;
    let currentPage = 1;

    function showProjects() {
        if (window.innerWidth <= 768) {
            projectsPerPage = 2;
            loadMoreButton.style.display = 'block';
        } else {
            projectsPerPage = projects.length;
            loadMoreButton.style.display = 'none';
        }

        projects.forEach((project, index) => {
            if (index < projectsPerPage * currentPage) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });

        if (currentPage * projectsPerPage >= projects.length) {
            loadMoreButton.style.display = 'none'; 
        }
    }

    loadMoreButton.addEventListener('click', function () {
        currentPage = Math.ceil(projects.length / projectsPerPage);
        showProjects();
    });

    showProjects();

    window.addEventListener('resize', showProjects);
});
