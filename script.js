// Blog posts data
const blogPostsData = [
    {
        id: 1,
        title: "Getting Started with JavaScript",
        date: "June 5, 2024",
        excerpt: "Learn the basics of JavaScript programming and start your journey as a web developer. Discover variables, functions, and more.",
        content: "Full article content here..."
    },
    {
        id: 2,
        title: "CSS Tips and Tricks",
        date: "June 3, 2024",
        excerpt: "Master CSS with these essential tips and tricks for creating beautiful, responsive web designs.",
        content: "Full article content here..."
    },
    {
        id: 3,
        title: "Building Responsive Websites",
        date: "June 1, 2024",
        excerpt: "A comprehensive guide to creating websites that look great on all devices and screen sizes.",
        content: "Full article content here..."
    },
    {
        id: 4,
        title: "Web Performance Optimization",
        date: "May 30, 2024",
        excerpt: "Learn how to optimize your website for faster loading times and better user experience.",
        content: "Full article content here..."
    },
    {
        id: 5,
        title: "Understanding Web APIs",
        date: "May 28, 2024",
        excerpt: "Deep dive into Web APIs and how to use them to build interactive web applications.",
        content: "Full article content here..."
    },
    {
        id: 6,
        title: "Modern JavaScript ES6+",
        date: "May 25, 2024",
        excerpt: "Explore modern JavaScript features and how they can make your code cleaner and more efficient.",
        content: "Full article content here..."
    }
];

let postsDisplayed = 3;

// Real-time update display
function updateRealTimeInfo() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const realTimeElement = document.getElementById('real-time-update');
    if (realTimeElement) {
        realTimeElement.textContent = `Last updated: ${dateString} at ${timeString}`;
    }
}

// Load blog posts dynamically
function loadBlogPosts() {
    const blogPostsContainer = document.getElementById('blog-posts');
    
    // Clear existing posts
    blogPostsContainer.innerHTML = '';
    
    // Load first 'postsDisplayed' posts
    for (let i = 0; i < postsDisplayed && i < blogPostsData.length; i++) {
        const post = blogPostsData[i];
        const postElement = createBlogPostElement(post);
        blogPostsContainer.appendChild(postElement);
    }
    
    // Update real-time info
    updateRealTimeInfo();
}

// Create blog post HTML element
function createBlogPostElement(post) {
    const article = document.createElement('article');
    article.className = 'blog-post';
    article.innerHTML = `
        <div class="blog-post-header">
            <div class="blog-post-date">${post.date}</div>
            <h3>${post.title}</h3>
        </div>
        <div class="blog-post-body">
            <p class="blog-post-excerpt">${post.excerpt}</p>
            <a href="#" class="read-more">Read More →</a>
        </div>
    `;
    return article;
}

// Load more posts
function loadMorePosts() {
    postsDisplayed = Math.min(postsDisplayed + 3, blogPostsData.length);
    loadBlogPosts();
    
    // Show notification
    showNotification('New posts loaded! ✨');
    
    // Animate load more button
    const btn = document.querySelector('.load-more-btn');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);
}

// Scroll to section smoothly
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Handle contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Validate
            if (name.trim() && email.trim() && message.trim()) {
                // Show success message
                showNotification(`Thanks ${name}! Message received. I'll get back to you soon! 📧`);
                
                // Reset form
                contactForm.reset();
                
                // Log to console (in real app, would send to server)
                console.log('Form submitted:', { name, email, message });
            } else {
                showNotification('Please fill in all fields! ⚠️');
            }
        });
    }
    
    // Load blog posts on page load
    loadBlogPosts();
    
    // Update real-time info every second
    setInterval(updateRealTimeInfo, 1000);
});

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            scrollToSection(href.substring(1));
        }
    });
});

// Add scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .blog-post');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Add CSS for notification animations (if not already in CSS file)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Real-time visitor counter (stored in localStorage)
function initializeVisitorCounter() {
    let visitCount = localStorage.getItem('visitCount');
    visitCount = visitCount ? parseInt(visitCount) + 1 : 1;
    localStorage.setItem('visitCount', visitCount);
    console.log(`Total visits: ${visitCount}`);
}

// Initialize visitor counter
document.addEventListener('DOMContentLoaded', initializeVisitorCounter);

// Real-time clock animation
function updateClock() {
    const now = new Date();
    updateRealTimeInfo();
}

// Update clock every second
setInterval(updateClock, 1000);

// Active navigation link highlight
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.style.color = 'var(--primary-color)';
            link.style.borderBottom = '2px solid var(--primary-color)';
        } else {
            link.style.borderBottom = 'none';
        }
    });
});
