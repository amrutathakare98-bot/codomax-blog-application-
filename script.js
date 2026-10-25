
// BlogSpace - JavaScript functionality

// Register a new user (practice/demo only)
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value;

        if (!name || !email || password.length < 6) {
            alert("Please enter valid details. Password must be at least 6 characters.");
            return;
        }

        localStorage.setItem("blogspaceUser", JSON.stringify({
            name: name,
            email: email
        }));

        alert("Registration successful! You can now log in.");
        window.location.href = "login.html";
    });
}

// Demo login
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const savedUser = JSON.parse(
            localStorage.getItem("blogspaceUser") || "null"
        );

        if (savedUser && savedUser.email === email && password.length >= 6) {
            localStorage.setItem("blogspaceLoggedIn", "true");
            alert("Welcome back, " + savedUser.name + "!");
            window.location.href = "dashboard.html";
        } else {
            alert("Please register first using this browser, then log in.");
        }
    });
}

// Create and save a blog
const blogForm = document.getElementById("blogForm");

if (blogForm) {
    blogForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("blogTitle").value.trim();
        const category = document.getElementById("blogCategory").value;
        const content = document.getElementById("blogContent").value.trim();

        if (!title || !category || !content) {
            alert("Please fill in all fields.");
            return;
        }

        const blogs = JSON.parse(localStorage.getItem("blogspaceBlogs") || "[]");

        blogs.push({
            title: title,
            category: category,
            content: content,
            date: new Date().toLocaleDateString()
        });

        localStorage.setItem("blogspaceBlogs", JSON.stringify(blogs));

        alert("Blog published successfully!");
        window.location.href = "dashboard.html";
    });
}

// Display saved blogs on dashboard
const myBlogs = document.getElementById("myBlogs");

if (myBlogs) {
    const blogs = JSON.parse(localStorage.getItem("blogspaceBlogs") || "[]");
    const totalBlogs = document.getElementById("totalBlogs");
    const emptyMessage = document.getElementById("emptyMessage");

    totalBlogs.textContent = blogs.length;
    emptyMessage.style.display = blogs.length ? "none" : "block";

    blogs.forEach(function (blog) {
        const card = document.createElement("article");
        card.className = "blog-card";

        const category = document.createElement("p");
        category.className = "category";
        category.textContent = blog.category.toUpperCase();

        const heading = document.createElement("h3");
        heading.textContent = blog.title;

        const content = document.createElement("p");
        content.textContent = blog.content;

        const date = document.createElement("small");
        date.textContent = "Published: " + blog.date;

        card.append(category, heading, content, date);
        myBlogs.appendChild(card);
    });
}
