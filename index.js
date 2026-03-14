document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Typing Effect
    const text = "Yoshana Magendran";
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        let index = 0;
        function type() {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        }
        setTimeout(type, 500);
    }

    // Scroll Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
    
    // Modal Logic
    const modal = document.getElementById('project-modal');
    const closeButton = document.querySelector('#project-modal .close-button');
    const learnMoreButtons = document.querySelectorAll('.btn-learn-more');

    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalGallery = document.getElementById('modal-gallery');
    const modalImg = document.getElementById('modal-img');
    const modalGhLink = document.getElementById('modal-gh-link');

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.project-card');
            const title = card.dataset.title;
            const longDesc = card.dataset.longDesc;
            const shortDesc = card.querySelector('.project-content p').textContent;
            const ghLink = card.dataset.ghLink;
            const imgSrc = card.dataset.imgSrc;
            const imagesData = card.dataset.images;

            const description = longDesc || shortDesc;

            modalTitle.textContent = title;
            
            // Make "Project Overview:" and "My Contribution:" bold with better spacing
            let formattedDesc = description
                .replace('Project Overview:', '<strong>Project Overview:</strong>')
                .replace('My Contribution:', '<br><br><strong>My Contribution:</strong>');
            
            modalDesc.innerHTML = formattedDesc;
            
            modalImg.style.display = 'none';
            modalGallery.style.display = 'none';
            modalGallery.innerHTML = '';

            if (imagesData) {
                // Handle multiple images (Side by Side)
                try {
                    const images = JSON.parse(imagesData);
                    modalGallery.style.display = 'flex';
                    images.forEach(img => {
                        const div = document.createElement('div'); // The container for one gallery item
                        div.className = 'gallery-item';
                        const imgElement = document.createElement('img');
                        imgElement.src = img.src;
                        imgElement.alt = img.caption || 'Project image';
                        const captionElement = document.createElement('p');
                        captionElement.className = 'gallery-caption';
                        captionElement.textContent = img.caption;
                        div.append(imgElement, captionElement);
                        modalGallery.appendChild(div);
                    });
                } catch (e) {
                    console.error("Error parsing images JSON", e);
                }
            } else if (imgSrc) {
                // Handle single image (Old way)
                modalImg.src = imgSrc;
                modalImg.style.display = 'block';
            }

            if (ghLink) {
                modalGhLink.href = ghLink;
                modalGhLink.style.display = 'inline-block';
                if (ghLink.includes('hackster.io')) {
                    modalGhLink.textContent = 'View on Hackster.io';
                } else {
                    modalGhLink.textContent = 'View on GitHub';
                }
            } else {
                modalGhLink.style.display = 'none';
            }

            modal.style.display = 'block';
        });
    });

    closeButton.onclick = () => modal.style.display = 'none';

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
        if (typeof certModal !== 'undefined' && event.target == certModal) {
            certModal.style.display = 'none';
            if (typeof certFrame !== 'undefined') certFrame.src = '';
        }
    };

    // Achievement Click Effect
    const achievementCategories = document.querySelectorAll('.achievement-category');

    achievementCategories.forEach(clickedCategory => {
        const header = clickedCategory.querySelector('h3');
        const grid = clickedCategory.querySelector('.achievement-grid');

        if (grid && header) {
            header.addEventListener('click', () => {
                const isCurrentlyActive = grid.classList.contains('active');

                // Close all other categories
                achievementCategories.forEach(otherCategory => {
                    otherCategory.querySelector('h3').classList.remove('active');
                    otherCategory.querySelector('.achievement-grid').classList.remove('active');
                });

                // If it wasn't active, open it
                if (!isCurrentlyActive) {
                    header.classList.add('active');
                    grid.classList.add('active');
                }
            });
        }
    });

    // Certificate Modal Logic
    const certModal = document.getElementById('cert-modal');
    const certFrame = document.getElementById('cert-frame');
    const certClose = document.querySelector('.cert-close');
    const certButtons = document.querySelectorAll('.achievement-card .btn-outline');

    if (certModal && certFrame && certButtons.length > 0) {
        certButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // On mobile, allow the link to open in a new tab (native PDF viewer)
                if (window.innerWidth <= 768) return;

                const href = btn.getAttribute('href');
                // Check if it is a PDF or a local file (doesn't start with http/https)
                // External links (Credly, etc.) will function normally (new tab)
                if (href && (href.endsWith('.pdf') || !href.startsWith('http'))) {
                    e.preventDefault();
                    certFrame.src = href;
                    certModal.style.display = 'block';
                }
            });
        });

        certClose.onclick = () => {
            certModal.style.display = 'none';
            certFrame.src = ''; // Clear src to stop loading
        };

    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Close menu when a link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggleBtn) {
            themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    };

    // Check for saved user preference, if any, on load
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        setTheme(currentTheme);
    } else if (prefersDarkScheme.matches) {
        setTheme('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                setTheme('light');
            } else {
                setTheme('dark');
            }
        });
    }

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active Navigation Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Use IntersectionObserver with a rootMargin that creates a "line" in the middle of the screen
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // --- Interactive Like Buttons for Projects ---
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        const footer = card.querySelector('.project-footer');
        
        if (footer) {
            // Create the button
            const likeBtn = document.createElement('button');
            likeBtn.className = 'like-btn';
            
            // Create a unique key for local storage to remember if this user liked it
            const projectTitle = card.dataset.title || `project-${index}`;
            const storageKey = `liked-${projectTitle.replace(/\s+/g, '-').toLowerCase()}`;
            
            // Check if user already liked it, and generate a baseline mock count (e.g. 12-42 likes)
            let isLiked = localStorage.getItem(storageKey) === 'true';
            let baseCount = (index * 7 + 13) % 40 + 10; // Generates a static random-looking number
            let currentCount = isLiked ? baseCount + 1 : baseCount;

            // Set initial HTML
            const heartSpan = document.createElement('span');
            heartSpan.className = 'heart';
            heartSpan.textContent = isLiked ? '❤️' : '🤍';
            const countSpan = document.createElement('span');
            countSpan.className = 'count';
            countSpan.textContent = currentCount;
            footer.appendChild(likeBtn);
            likeBtn.append(heartSpan, ' ', countSpan); // ' ' creates a text node for space

            // Add click interaction
            likeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevents bubbling if the card itself has a click event
                isLiked = !isLiked;
                localStorage.setItem(storageKey, isLiked);
                
                currentCount = isLiked ? currentCount + 1 : currentCount - 1;
                
                heartSpan.textContent = isLiked ? '❤️' : '🤍';
                countSpan.textContent = currentCount;
                
                // Add a small pop animation
                heartSpan.style.animation = 'popAnimation 0.3s ease';
                setTimeout(() => { heartSpan.style.animation = ''; }, 300);
            });
        }
    });
});
