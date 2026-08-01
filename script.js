// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('WebDevCore script loaded successfully!');
    // 1. Requirement Action: Button that triggers an alert message when clicked
    const alertBtn = document.getElementById('alertBtn');
    if (alertBtn) {
        alertBtn.addEventListener('click', () => {
            alert('🎉 Hello World! You triggered a JavaScript alert message!\n\nJavaScript enables dynamic, interactive experiences on the web.');
        });
    }
    // 2. Custom Toast Notification Trigger
    const toastBtn = document.getElementById('toastBtn');
    const toast = document.getElementById('toast');
    let toastTimeout;
    if (toastBtn && toast) {
        toastBtn.addEventListener('click', () => {
            showToast('Custom JavaScript Toast', 'Events and DOM updates allow real-time UI responses without page reloads!');
        });
    }
    function showToast(title, message) {
        const toastTitle = document.getElementById('toastTitle');
        const toastMessage = document.getElementById('toastMessage');
        if (toastTitle) toastTitle.textContent = title;
        if (toastMessage) toastMessage.textContent = message;
        // Show toast
        toast.classList.remove('hidden');
        // Clear existing timeout if active
        if (toastTimeout) clearTimeout(toastTimeout);
        // Auto-hide after 4 seconds
        toastTimeout = setTimeout(() => {
            toast.classList.add('hidden');
        }, 4000);
    }
    // 3. Interactive DOM Counter (State & Manipulation demo)
    let count = 0;
    const counterValue = document.getElementById('counterValue');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetBtn = document.getElementById('resetBtn');
     function showToast(title, message) {
        const toastTitle = document.getElementById('toastTitle');
        const toastMessage = document.getElementById('toastMessage');
        if (toastTitle) toastTitle.textContent = title;
        if (toastMessage) toastMessage.textContent = message;
        // Show toast
        toast.classList.remove('hidden');
        // Clear existing timeout if active
        if (toastTimeout) clearTimeout(toastTimeout);
        // Auto-hide after 4 seconds
        toastTimeout = setTimeout(() => {
            toast.classList.add('hidden');
        }, 4000);
    }
    // 3. Interactive DOM Counter (State & Manipulation demo)
    let count = 0;
    const counterValue = document.getElementById('counterValue');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetBtn = document.getElementById('resetBtn');
    function updateCounterDisplay() {
        if (counterValue) {
            counterValue.textContent = count;
            
            // Add pop animation effect
            counterValue.style.transform = 'scale(1.2)';
            setTimeout(() => {
                counterValue.style.transform = 'scale(1)';
            }, 150);
        }
    }
 if (incrementBtn) {
        incrementBtn.addEventListener('click', () => {
            count++;
            updateCounterDisplay();
        });
    }
    if (decrementBtn) {
        decrementBtn.addEventListener('click', () => {
            count--;
            updateCounterDisplay();
        });
    }
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            count = 0;
            updateCounterDisplay();
        });
    }
    // Smooth scroll active state highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
