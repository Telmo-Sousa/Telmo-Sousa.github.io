document.addEventListener("DOMContentLoaded", function () {
    const posts = document.querySelectorAll('.posts-grid .post');
    const loadMoreButton = document.querySelector('.load-more');

    let postsPerPage;
    let currentPage = 1;

    function showPosts() {
        if (window.innerWidth <= 768) {
            postsPerPage = 1; // Show only 3 posts per page on mobile
            loadMoreButton.style.display = 'block';
        } else {
            postsPerPage = posts.length; // Show all posts on desktop
            loadMoreButton.style.display = 'none';
        }

        posts.forEach((post, index) => {
            if (index < postsPerPage * currentPage) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });

        if (currentPage * postsPerPage >= posts.length) {
            loadMoreButton.style.display = 'none'; // Hide button when all posts are loaded
        }
    }

    loadMoreButton.addEventListener('click', function () {
        currentPage = Math.ceil(posts.length / postsPerPage); // Set current page to last page
        showPosts();
    });

    // Initial call
    showPosts();

    // Update on window resize
    window.addEventListener('resize', showPosts);
});
