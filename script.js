// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Initialize converter pages
    initializeConverters();
    
    // Update last modified dates
    updateLastModifiedDates();
});

// Converter Simulation
function initializeConverters() {
    const uploadAreas = document.querySelectorAll('.upload-area');
    const fileInputs = document.querySelectorAll('.file-input');
    const convertBtns = document.querySelectorAll('.convert-btn');
    const progressContainers = document.querySelectorAll('.progress-container');
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    // File upload handling
    uploadAreas.forEach((area, index) => {
        const fileInput = fileInputs[index];
        const convertBtn = convertBtns[index];
        
        area.addEventListener('click', () => fileInput.click());
        
        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.classList.add('dragover');
        });
        
        area.addEventListener('dragleave', () => {
            area.classList.remove('dragover');
        });
        
        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.classList.remove('dragover');
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                updateUploadArea(area, e.dataTransfer.files[0]);
                convertBtn.disabled = false;
            }
        });
        
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                updateUploadArea(area, fileInput.files[0]);
                convertBtn.disabled = false;
            }
        });
    });
    
    // Conversion simulation
    convertBtns.forEach((btn, index) => {
        const progressContainer = progressContainers[index];
        const downloadBtn = downloadBtns[index];
        const progressBar = progressContainer.querySelector('.progress');
        
        btn.addEventListener('click', () => {
            // Show progress
            progressContainer.style.display = 'block';
            
            // Simulate conversion progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Show download button after completion
                    setTimeout(() => {
                        downloadBtn.style.display = 'block';
                    }, 500);
                }
                progressBar.style.width = progress + '%';
            }, 200);
        });
    });
    
    // Download simulation
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('In a real implementation, this would download your converted file. This is a frontend simulation.');
        });
    });
}

function updateUploadArea(area, file) {
    const icon = area.querySelector('.upload-icon');
    const text = area.querySelector('h3');
    const subtext = area.querySelector('p');
    
    icon.textContent = '📄';
    text.textContent = file.name;
    subtext.textContent = `Size: ${formatFileSize(file.size)} • Type: ${file.type}`;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Update last modified dates
function updateLastModifiedDates() {
    const lastUpdatedElements = document.querySelectorAll('.last-updated');
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    lastUpdatedElements.forEach(element => {
        element.textContent = formattedDate;
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});