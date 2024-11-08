//listener for form submission
document.getElementById("post-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    //retrieve post title, content, and image
    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;
    const imageFile = document.getElementById("image").files[0];

    //image conversion (base64)
    let imageData = null;
    if (imageFile) {
        const reader = new FileReader(); //read the image
        reader.onloadend = function () {
            imageData = reader.result; //base64 representationg of the image
            savePostData(title, content, imageData); //save post data with image
        };
        reader.readAsDataURL(imageFile); //convert the image to a data URL
    } else {
        savePostData(title, content, null); //save post data without image
    }
});

//new object to hold the post data
function savePostData(title, content, imageData) {
    const newPost = {
        title: title, //store post title
        content: content, //store post content
        image: imageData //store post image
    };

    //retreieve existing posts
    const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    posts.push(newPost); //add the new post to the array
    localStorage.setItem("blogPosts", JSON.stringify(posts)); //save the updated posts array
    window.location.href = "index.html"; //reload the page
}

//cancel post button functionality
document.getElementById("cancel-post-btn").addEventListener("click", function () {
    document.getElementById("post-form").reset();  //reset the form inputs
    window.location.href = "index.html";  //redirect to homepage
});