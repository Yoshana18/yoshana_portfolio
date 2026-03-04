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
    const closeButton = document.querySelector('.close-button');
    const learnMoreButtons = document.querySelectorAll('.btn-learn-more');

    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
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

            const description = longDesc || shortDesc;

            modalTitle.textContent = title;
            
            // Make "Project Overview:" and "My Contribution:" bold with better spacing
            let formattedDesc = description
                .replace('Project Overview:', '<strong>Project Overview:</strong>')
                .replace('My Contribution:', '<br><br><strong>My Contribution:</strong>');
            
            modalDesc.innerHTML = formattedDesc;
            
            if (imgSrc) {
                modalImg.src = imgSrc;
                modalImg.style.display = 'block';
            } else {
                modalImg.style.display = 'none';
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
    };

});
