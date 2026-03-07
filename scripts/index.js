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
                        const div = document.createElement('div');
                        div.className = 'gallery-item';
                        div.innerHTML = `<img src="${img.src}" alt="${img.caption}"><p class="gallery-caption">${img.caption}</p>`;
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

});
