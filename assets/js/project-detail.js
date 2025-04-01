// assets/js/project-detail.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Get Embedded Project Data ---
    const projectDataElement = document.getElementById('project-data');
    let projects = [];
    if (projectDataElement) {
        try {
            // Parse the JSON data embedded in the script tag by Jekyll
            projects = JSON.parse(projectDataElement.textContent);
        } catch (e) {
            console.error("Error parsing project data:", e);
            showNotFoundError(); // Show error if data is missing or corrupt
            return;
        }
    } else {
        console.error("Project data script tag not found.");
        showNotFoundError();
        return;
    }

    // --- DOM Elements ---
    // (Get references same as in the previous project.html script)
    const projectTitleEl = document.getElementById('projectTitle');
    const projectTagsEl = document.getElementById('projectTags');
    const projectShortDescriptionEl = document.getElementById('projectShortDescription');
    const projectLinksEl = document.getElementById('projectLinks');
    const demoContainerEl = document.getElementById('demoContainer');
    const demoSectionEl = document.getElementById('demoSection');
    const videoSectionEl = document.getElementById('videoSection');
    const videoContainerEl = document.getElementById('videoContainer');
    const fullDescriptionEl = document.getElementById('fullDescription');
    const githubSectionEl = document.getElementById('githubSection');
    const repoInfoEl = document.getElementById('repoInfo');
    const codePreviewEl = document.getElementById('codePreview');
    const mainContentEl = document.getElementById('mainContent'); // Assuming main content container might need hiding
    const notFoundSectionEl = document.getElementById('notFoundSection');


    // --- Load Project Logic ---
    loadProject();

    // --- Functions --- (Mostly same as before, adapted slightly)

    function loadProject() {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');

        if (!projectId) {
            showNotFoundError();
            return;
        }

        // Find project in the data loaded from the JSON script tag
        // Ensure project is published (important!)
        const project = projects.find(p => p.id === projectId && p.published);

        if (!project) {
            showNotFoundError();
            return;
        }

        // --- Populate Page Content ---
        document.title = `${project.title || 'Project'} | ${document.title.split('|')[1] || 'Project Gallery'}`; // Update browser title
        projectTitleEl.textContent = project.title || 'Untitled Project';
        projectShortDescriptionEl.textContent = project.description || '';

        // Tags
        projectTagsEl.innerHTML = '';
        if (project.tags && project.tags.length > 0) {
            project.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'project-tag'; // Use class from style.css
                tagSpan.textContent = tag;
                projectTagsEl.appendChild(tagSpan);
            });
        }

        // Links
        projectLinksEl.innerHTML = '';
        if (project.githubUrl) {
            const githubLink = document.createElement('a');
            githubLink.href = project.githubUrl;
            githubLink.className = 'project-link github-link'; // Use class from style.css
            githubLink.target = '_blank';
            githubLink.rel = 'noopener noreferrer';
            githubLink.innerHTML = `<i class="fab fa-github" aria-hidden="true"></i> View on GitHub`;
            projectLinksEl.appendChild(githubLink);
        }
        // Add Live Demo link (adjust URL logic as needed)
        // Example: Assume relative path based on project ID or a dedicated 'demoUrl' field
        const liveDemoUrl = project.demoUrl || `/projects/${project.id}/index.html`; // Adjust this path! Needs setup.
        const liveLink = document.createElement('a');
        // Check if demo URL exists before adding link
        // For now, assume it might exist based on convention
        liveLink.href = liveDemoUrl;
        liveLink.className = 'project-link live-link'; // Use class from style.css
        // liveLink.target = '_blank'; // Optional: open demo in new tab
        // liveLink.rel = 'noopener noreferrer';
        liveLink.innerHTML = `<i class="fas fa-external-link-alt" aria-hidden="true"></i> Live Demo`;
        projectLinksEl.appendChild(liveLink);


        // Full Description (assuming safe HTML from data file)
        fullDescriptionEl.innerHTML = project.fullDescription || '<p>No detailed description available.</p>';

        // Demo
        loadInteractiveDemo(project);

        // Video
        if (project.videoUrl) {
            videoSectionEl.style.display = 'block';
            loadVideo(project.videoUrl);
        } else {
            videoSectionEl.style.display = 'none';
        }

        // GitHub Section
        if (project.githubUrl) {
            githubSectionEl.style.display = 'block';
            loadGitHubPreview(project.githubUrl); // Placeholder
        } else {
            githubSectionEl.style.display = 'none';
        }
    }

    function showNotFoundError() {
         if (mainContentEl) mainContentEl.style.display = 'none';
         if (notFoundSectionEl) notFoundSectionEl.style.display = 'block';
         if (projectTitleEl) projectTitleEl.textContent = "Project Not Found";
         document.title = "Project Not Found | Project Gallery";
     }

    function loadInteractiveDemo(project) {
        // Adjust the demo URL logic here based on your project structure
        // Example: Assume demos are in /assets/demos/{project-id}/index.html
        const demoUrl = `/assets/demos/${project.id}/index.html`; // Needs actual setup!

        demoContainerEl.innerHTML = `
            <iframe class="demo-iframe" src="${demoUrl}" title="Interactive Demo for ${project.title}" loading="lazy">
                Your browser does not support iframes, or the demo could not be loaded.
                <a href="${demoUrl}" target="_blank" rel="noopener noreferrer">Open demo in new tab</a>.
            </iframe>
        `;
        const iframe = demoContainerEl.querySelector('iframe');
         if(iframe) {
             iframe.onerror = () => {
                 demoContainerEl.innerHTML = `
                     <div class="demo-placeholder">
                         <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                         <p>Could not load the interactive demo.</p>
                         <a href="${demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link live-link" style="display: inline-flex; margin-top: 0.5rem;">Try Opening Demo</a>
                     </div>`;
             };
         }
    }

    function loadVideo(videoUrl) {
        let embedUrl = '';
        let videoHost = '';
         try {
            if (videoUrl.includes('youtube.com/watch?v=')) {
                const videoId = videoUrl.split('v=')[1].split('&')[0];
                embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
                videoHost = 'YouTube';
            } else if (videoUrl.includes('youtu.be/')) {
                const videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
                embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
                 videoHost = 'YouTube';
            }
            else if (videoUrl.includes('vimeo.com/')) {
                const videoId = videoUrl.match(/vimeo.com\/(\d+)/)[1];
                embedUrl = `https://player.vimeo.com/video/${videoId}`;
                 videoHost = 'Vimeo';
            }
        } catch (e) {
             console.error("Error parsing video URL:", e);
             if(videoSectionEl) videoSectionEl.style.display = 'none';
             return;
        }

        if (embedUrl) {
            videoContainerEl.innerHTML = `
                <iframe
                    src="${embedUrl}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    title="Project Video (${videoHost})"
                    loading="lazy">
                </iframe>`;
        } else {
             console.warn("Unsupported video URL format:", videoUrl);
             if(videoSectionEl) videoSectionEl.style.display = 'none';
        }
    }

    function loadGitHubPreview(githubUrl) {
        // Placeholder - No actual API call here
        if (!githubUrl || !githubUrl.includes('github.com')) {
             if(githubSectionEl) githubSectionEl.style.display = 'none';
             return;
        }
        const stars = Math.floor(Math.random() * 500);
        const forks = Math.floor(Math.random() * 100);

        if(repoInfoEl) {
            repoInfoEl.innerHTML = `
                <div class="repo-stat">
                    <div class="repo-stat-number">${stars}</div>
                    <div class="repo-stat-label">Stars</div>
                </div>
                <div class="repo-stat">
                    <div class="repo-stat-number">${forks}</div>
                    <div class="repo-stat-label">Forks</div>
                </div>
                <div class="repo-stat" style="min-width: auto; margin-left: auto;">
                     <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link github-link" style="padding: 0.5rem 1rem;">
                         <i class="fab fa-github" aria-hidden="true"></i> View Repo
                     </a>
                </div>
            `;
        }
        if(codePreviewEl) {
             codePreviewEl.innerHTML = `<pre><code>// GitHub API integration needed for actual code preview.</code></pre>`;
        }
    }
});
