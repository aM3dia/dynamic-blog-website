document.addEventListener("DOMContentLoaded", function () {
    //retreieve blog post from local storage
    const postList = document.getElementById("post-list");
    const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    //render the post
    posts.forEach((post, index) => {
        //create a new div for each post
        const postBox = document.createElement("div");
        postBox.className = "post-box";
        //adding image
        let imageHtml = '';
        if (post.image) {
            //if an image exists, display it
            imageHtml = `<img src="${post.image}" alt="Post Image" class="post-image">`;
        }
        //populate the HTML with the content
        postBox.innerHTML = `
            ${imageHtml}
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <a href="post.html?id=${index}">View/Edit</a>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        postList.appendChild(postBox);
    });
    //delete the post
    postList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.getAttribute("data-index");
            posts.splice(index, 1); //remove post from array
            localStorage.setItem("blogPosts", JSON.stringify(posts)); //save changes
            window.location.reload(); //reload the page
        }
    });
});
