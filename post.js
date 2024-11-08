document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id"); // Get the post ID from the URL to identify which post to edit

    const posts = JSON.parse(localStorage.getItem("blogPosts")) || []; //retrieve existing posts from local storage
    const post = posts[postId]; //identify the post being edited

    // Create an image container
    const imageContainer = document.createElement("div");
    imageContainer.id = "image-container";
    document.querySelector("main").insertBefore(imageContainer, document.getElementById("edit-post-form"));

    if (post) {
        // Populate the form with the post data
        document.getElementById("post-title").value = post.title;
        document.getElementById("post-content").value = post.content;

        // update the image
        updateImageDisplay(post.image);
    }

    // Event listener for image change
    document.getElementById("image").addEventListener("change", function () {
        const imageInput = document.getElementById("image");
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const reader = new FileReader();

            reader.onloadend = function () {
                updateImageDisplay(reader.result);
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById("save-post-btn").addEventListener("click", saveChanges);
    document.getElementById("cancel-post-btn").addEventListener("click", cancelChanges);
    //save post changes
    function saveChanges() {
        const postTitle = document.getElementById("post-title").value;
        const postContent = document.getElementById("post-content").value;
        const imageInput = document.getElementById("image");

        post.title = postTitle;
        post.content = postContent;

        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const reader = new FileReader();

            reader.onloadend = function () {
                post.image = reader.result; // Update image in localStorage
                posts[postId] = post;
                localStorage.setItem("blogPosts", JSON.stringify(posts)); // Save to localStorage
                window.location.href = "index.html"; // Redirect to index.html
            };
            reader.readAsDataURL(file);
        } else {
            posts[postId] = post;
            localStorage.setItem("blogPosts", JSON.stringify(posts));
            window.location.href = "index.html";
        }
    }
//cancel changes
    function cancelChanges() {
        // Redirect back to the homepage without saving changes
        window.location.href = "index.html";
    }
//image update function
    function updateImageDisplay(imageSrc) {
        imageContainer.innerHTML = ""; // Clear the container

        if (imageSrc) {
            const imageElement = document.createElement("img");
            imageElement.src = imageSrc;
            imageElement.alt = "Post Image";
            imageElement.classList.add("post-image");
            imageContainer.appendChild(imageElement);
        } else {
            imageContainer.innerHTML = "<p>No image available for this post.</p>";
        }
    }
});

