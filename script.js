/**
 * ApexPlanet Task 2 - Intermediate HTML, CSS, and JavaScript
 * Dynamic DOM Manipulation, Real-Time Validation & Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('ApexPlanet Nexus Studio App Initialized!');

    // Initialize all modules
    initMobileNav();
    initContactFormValidation();
    initToDoApp();
    initImageGallery();
});

/* ==========================================================================
   1. Toast Notification Utility
   ========================================================================== */
let toastTimeout;
function showToast(title, message, icon = '🚀') {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    if (!toast) return;

    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = message;
    if (toastIcon) toastIcon.textContent = icon;

    toast.classList.remove('hidden');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.add('hidden');
    }, 4000);
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.add('hidden');
            });
        });
    }
}

/* ==========================================================================
   3. Contact Form Real-Time & Submit Validation (Steps 1 & 2)
   ========================================================================== */
function initContactFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const subjectSelect = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const charCounter = document.getElementById('charCount');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    const checkName = document.getElementById('checkName');
    const checkEmail = document.getElementById('checkEmail');
    const checkSubject = document.getElementById('checkSubject');
    const checkMessage = document.getElementById('checkMessage');

    const formSuccessCard = document.getElementById('formSuccessCard');
    const successDetails = document.getElementById('successDetails');
    const resetBtn = document.getElementById('resetFormBtn');

    // Email regex validation rule
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Real-time character counter for message
    if (messageInput && charCounter) {
        messageInput.addEventListener('input', () => {
            const length = messageInput.value.length;
            charCounter.textContent = `${length} / 300`;
            if (length > 300) {
                charCounter.style.color = 'var(--accent-rose)';
            } else {
                charCounter.style.color = 'var(--text-muted)';
            }
        });
    }

    // Input Validation functions
    function validateName() {
        const value = fullNameInput.value.trim();
        const isValid = value.length >= 2;
        toggleFieldStatus(fullNameInput, nameError, checkName, isValid);
        return isValid;
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        const isValid = emailRegex.test(value);
        toggleFieldStatus(emailInput, emailError, checkEmail, isValid);
        return isValid;
    }

    function validateSubject() {
        const value = subjectSelect.value;
        const isValid = value !== '';
        toggleFieldStatus(subjectSelect, subjectError, checkSubject, isValid);
        return isValid;
    }

    function validateMessage() {
        const value = messageInput.value.trim();
        const isValid = value.length >= 10 && value.length <= 300;
        toggleFieldStatus(messageInput, messageError, checkMessage, isValid);
        return isValid;
    }

    function toggleFieldStatus(inputEl, errorEl, checkEl, isValid) {
        if (isValid) {
            inputEl.classList.remove('invalid');
            inputEl.classList.add('valid');
            if (errorEl) errorEl.classList.add('hidden');
            if (checkEl) {
                checkEl.classList.add('passed');
                checkEl.querySelector('.check-icon').textContent = '✓';
            }
        } else {
            inputEl.classList.remove('valid');
            inputEl.classList.add('invalid');
            if (errorEl) errorEl.classList.remove('hidden');
            if (checkEl) {
                checkEl.classList.remove('passed');
                checkEl.querySelector('.check-icon').textContent = '⚪';
            }
        }
    }

    // Attach real-time input listeners
    if (fullNameInput) {
        fullNameInput.addEventListener('input', validateName);
        fullNameInput.addEventListener('blur', validateName);
    }
    if (emailInput) {
        emailInput.addEventListener('input', validateEmail);
        emailInput.addEventListener('blur', validateEmail);
    }
    if (subjectSelect) {
        subjectSelect.addEventListener('change', validateSubject);
    }
    if (messageInput) {
        messageInput.addEventListener('input', validateMessage);
        messageInput.addEventListener('blur', validateMessage);
    }

    // Handle Reset Button
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            form.reset();
            [fullNameInput, emailInput, subjectSelect, messageInput].forEach(el => {
                if (el) el.classList.remove('valid', 'invalid');
            });
            [nameError, emailError, subjectError, messageError].forEach(err => {
                if (err) err.classList.add('hidden');
            });
            [checkName, checkEmail, checkSubject, checkMessage].forEach(chk => {
                if (chk) {
                    chk.classList.remove('passed');
                    chk.querySelector('.check-icon').textContent = '⚪';
                }
            });
            if (formSuccessCard) formSuccessCard.classList.add('hidden');
            if (charCounter) charCounter.textContent = '0 / 300';
            showToast('Form Cleared', 'Contact form inputs have been reset.', '🧹');
        });
    }

    // Submit handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            const nameVal = fullNameInput.value.trim();
            const emailVal = emailInput.value.trim();
            const subjectVal = subjectSelect.value;

            if (formSuccessCard && successDetails) {
                formSuccessCard.classList.remove('hidden');
                successDetails.textContent = `Thank you ${nameVal}! Your inquiry regarding "${subjectVal}" has been validated and received. A confirmation has been sent to ${emailVal}.`;
            }

            showToast('Success!', `Form submitted successfully by ${nameVal}`, '✅');
        } else {
            if (formSuccessCard) formSuccessCard.classList.add('hidden');
            showToast('Validation Error', 'Please correct highlighted errors in the form.', '⚠️');
        }
    });
}

/* ==========================================================================
   4. Dynamic To-Do List Application (Step 4A)
   ========================================================================== */
function initToDoApp() {
    const todoForm = document.getElementById('todoForm');
    const taskInput = document.getElementById('taskInput');
    const taskCategory = document.getElementById('taskCategory');
    const taskList = document.getElementById('taskList');

    const countAllEl = document.getElementById('countAll');
    const countActiveEl = document.getElementById('countActive');
    const countCompletedEl = document.getElementById('countCompleted');
    const taskStatsText = document.getElementById('taskStatsText');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let currentFilter = 'all';

    // State array for tasks
    let tasks = [
        { id: '1', title: 'Complete ApexPlanet Task 2 Web Application', category: 'Development', completed: true },
        { id: '2', title: 'Implement real-time JavaScript email validation', category: 'Development', completed: true },
        { id: '3', title: 'Test responsive Flexbox & CSS Grid breakpoints', category: 'Design', completed: false },
        { id: '4', title: 'Verify dynamic DOM node addition & deletion', category: 'Urgent', completed: false }
    ];

    // Initial render
    renderTasks();

    // Form submit for adding tasks
    if (todoForm) {
        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = taskInput.value.trim();
            if (!title) return;

            const category = taskCategory.value || 'General';
            const newTask = {
                id: Date.now().toString(),
                title: title,
                category: category,
                completed: false
            };

            tasks.unshift(newTask);
            taskInput.value = '';
            renderTasks();
            showToast('Task Created', `Added task "${title}"`, '📝');
        });
    }

    // Filter Buttons logic
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    // Clear completed tasks handler
    if (clearCompletedBtn) {
        clearCompletedBtn.addEventListener('click', () => {
            const initialLength = tasks.length;
            tasks = tasks.filter(t => !t.completed);
            const removedCount = initialLength - tasks.length;
            if (removedCount > 0) {
                renderTasks();
                showToast('Cleared Tasks', `Removed ${removedCount} completed task(s)`, '🗑️');
            }
        });
    }

    // Render tasks to DOM
    function renderTasks() {
        if (!taskList) return;

        taskList.innerHTML = '';

        // Filter tasks according to state
        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true;
        });

        // Update counts
        const activeCount = tasks.filter(t => !t.completed).length;
        const completedCount = tasks.filter(t => t.completed).length;

        if (countAllEl) countAllEl.textContent = tasks.length;
        if (countActiveEl) countActiveEl.textContent = activeCount;
        if (countCompletedEl) countCompletedEl.textContent = completedCount;
        if (taskStatsText) taskStatsText.textContent = `${activeCount} item(s) remaining`;

        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <li class="task-item flex-row justify-center align-center padding-lg">
                    <span class="text-muted">No tasks found in this section. Add one above!</span>
                </li>
            `;
            return;
        }

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item flex-row justify-between align-center gap-sm ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id;

            const categoryEmoji = getCategoryEmoji(task.category);

            li.innerHTML = `
                <div class="flex-row align-center gap-sm flex-grow-1">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} aria-label="Toggle Complete">
                    <span class="task-text">${escapeHtml(task.title)}</span>
                    <span class="task-category-badge">${categoryEmoji} ${escapeHtml(task.category)}</span>
                </div>
                <button class="task-delete-btn" title="Delete Task">&times;</button>
            `;

            // Toggle checkbox event
            const checkbox = li.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                renderTasks();
            });

            // Delete task event
            const deleteBtn = li.querySelector('.task-delete-btn');
            deleteBtn.addEventListener('click', () => {
                li.style.transform = 'translateX(20px)';
                li.style.opacity = '0';
                setTimeout(() => {
                    tasks = tasks.filter(t => t.id !== task.id);
                    renderTasks();
                    showToast('Task Removed', `Deleted task "${task.title}"`, '🗑️');
                }, 200);
            });

            taskList.appendChild(li);
        });
    }

    function getCategoryEmoji(cat) {
        switch (cat) {
            case 'Development': return '💻';
            case 'Design': return '🎨';
            case 'Urgent': return '🔥';
            default: return '🏷️';
        }
    }
}

/* ==========================================================================
   5. Dynamic Image Gallery Application (Step 4B)
   ========================================================================== */
function initImageGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');

    const openAddImageModalBtn = document.getElementById('openAddImageModalBtn');
    const imageModal = document.getElementById('imageModal');
    const closeImageModalBtn = document.getElementById('closeImageModalBtn');
    const cancelAddImgBtn = document.getElementById('cancelAddImgBtn');
    const addImageForm = document.getElementById('addImageForm');

    const lightboxModal = document.getElementById('lightboxModal');
    const closeLightboxBtn = document.getElementById('closeLightboxBtn');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCategory = document.getElementById('lightboxCategory');

    let currentCategory = 'all';

    // Gallery Initial State Data
    let galleryItems = [
        {
            id: 'g1',
            title: 'Developer Workspace & Code',
            category: 'tech',
            url: 'assets/tech_workspace.jpg'
        },
        {
            id: 'g2',
            title: 'Abstract 3D UI UX Component Matrix',
            category: 'design',
            url: 'assets/design_3d.jpg'
        },
        {
            id: 'g3',
            title: 'Modern Cyber Architecture',
            category: 'tech',
            url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'
        },
        {
            id: 'g4',
            title: 'Geometric Neon Art',
            category: 'design',
            url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'
        },
        {
            id: 'g5',
            title: 'Minimal Forest Mist',
            category: 'nature',
            url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80'
        },
        {
            id: 'g6',
            title: 'High Tech Server Infrastructure',
            category: 'tech',
            url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80'
        }
    ];

    renderGallery();

    // Filter Buttons Listener
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderGallery();
        });
    });

    // Add Image Modal Toggle
    if (openAddImageModalBtn && imageModal) {
        openAddImageModalBtn.addEventListener('click', () => {
            imageModal.classList.remove('hidden');
        });
    }

    function closeModal() {
        if (imageModal) imageModal.classList.add('hidden');
        if (addImageForm) addImageForm.reset();
    }

    if (closeImageModalBtn) closeImageModalBtn.addEventListener('click', closeModal);
    if (cancelAddImgBtn) cancelAddImgBtn.addEventListener('click', closeModal);

    // Preset Links Handler inside modal
    document.querySelectorAll('.preset-btn').forEach(preset => {
        preset.addEventListener('click', () => {
            const urlInput = document.getElementById('imgUrl');
            const titleInput = document.getElementById('imgTitle');
            const catSelect = document.getElementById('imgCategory');

            if (urlInput) urlInput.value = preset.dataset.url;
            if (titleInput) titleInput.value = preset.dataset.title;
            if (catSelect) catSelect.value = preset.dataset.cat;
        });
    });

    // Form submission for adding image
    if (addImageForm) {
        addImageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('imgTitle').value.trim();
            const category = document.getElementById('imgCategory').value;
            const url = document.getElementById('imgUrl').value.trim();

            if (!title || !url) return;

            const newImg = {
                id: Date.now().toString(),
                title: title,
                category: category,
                url: url
            };

            galleryItems.unshift(newImg);
            renderGallery();
            closeModal();
            showToast('Image Added', `Added "${title}" to gallery`, '🖼️');
        });
    }

    // Render Gallery Cards
    function renderGallery() {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';

        const filtered = galleryItems.filter(item => {
            if (currentCategory === 'all') return true;
            return item.category === currentCategory;
        });

        if (filtered.length === 0) {
            galleryGrid.innerHTML = `
                <div class="glass-panel flex-col justify-center align-center padding-lg span-2">
                    <p class="text-muted">No images found for category "${currentCategory}".</p>
                </div>
            `;
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            card.dataset.id = item.id;

            card.innerHTML = `
                <img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.title)}" class="gallery-img" loading="lazy">
                <div class="gallery-overlay flex-col justify-between">
                    <div class="flex-row justify-end gap-xs">
                        <button class="icon-btn icon-btn-zoom" title="View Fullscreen">🔍</button>
                        <button class="icon-btn icon-btn-delete" title="Delete Image">🗑️</button>
                    </div>
                    <div class="flex-col gap-xs">
                        <span class="gallery-card-cat">${item.category.toUpperCase()}</span>
                        <h4 class="gallery-card-title">${escapeHtml(item.title)}</h4>
                    </div>
                </div>
            `;

            // Lightbox Zoom Event
            const zoomBtn = card.querySelector('.icon-btn-zoom');
            zoomBtn.addEventListener('click', () => {
                if (lightboxModal && lightboxImg) {
                    lightboxImg.src = item.url;
                    if (lightboxTitle) lightboxTitle.textContent = item.title;
                    if (lightboxCategory) lightboxCategory.textContent = item.category.toUpperCase();
                    lightboxModal.classList.remove('hidden');
                }
            });

            // Delete Image Event
            const deleteBtn = card.querySelector('.icon-btn-delete');
            deleteBtn.addEventListener('click', () => {
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0';
                setTimeout(() => {
                    galleryItems = galleryItems.filter(g => g.id !== item.id);
                    renderGallery();
                    showToast('Image Deleted', `Removed "${item.title}"`, '🗑️');
                }, 200);
            });

            galleryGrid.appendChild(card);
        });
    }

    // Lightbox Close Event
    if (closeLightboxBtn && lightboxModal) {
        closeLightboxBtn.addEventListener('click', () => {
            lightboxModal.classList.add('hidden');
        });
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.add('hidden');
            }
        });
    }
}

/* ==========================================================================
   6. Helper Utility: Escape HTML
   ========================================================================== */
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}