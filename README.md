# brettreifs.github.io
My personal project portfolio site

# Project Gallery - Product Requirements Document

## Overview
This document outlines the requirements for a modern, accessible GitHub Pages portfolio site that showcases Canvas apps and web projects. The site features a bento grid layout with vibrant gradient colors against a dark background, and includes an administrator dashboard for content management.

## Visual Design Requirements

### Layout
- **Bento Grid Layout**: Organize projects in a responsive grid with varying card sizes
  - Epic projects: Large rectangles (6 columns wide, 2 rows tall)
  - Feature projects: Medium rectangles (4 columns wide)
  - Mini projects: Small rectangles (3 columns wide)
- **Responsive Design**: Layout adapts seamlessly to all screen sizes
  - Desktop: Full bento grid display
  - Tablet: Simplified grid with fewer columns
  - Mobile: Single column stack

### Color & Typography
- **Color Scheme**:
  - Background: Dark gray (#212121)
  - Card backgrounds: Slightly lighter gray (#2d2d2d)
  - Text gradients: Goldenrod (#daa520) to vibrant magenta (#ff00ff)
  - Accent colors: Various gradients for card borders
- **Typography**:
  - High contrast text (white on dark background)
  - Gradient text effects for titles and important elements
  - Responsive font sizing using clamp()

### Image & Media
- **Background Images**:
  - Each project card features a relevant background image
  - Semi-transparent dark overlay ensures text readability
  - Images stored in '/images' directory with consistent naming convention
- **Fallback Support**:
  - Graceful fallback to solid backgrounds if images fail to load

## Accessibility Requirements
- **Screen Reader Support**:
  - Semantic HTML structure
  - Proper ARIA attributes
  - Alt text for all images
- **Keyboard Navigation**:
  - Full keyboard support for navigating between projects
  - Tab index properly implemented
  - Enter key activates project links
- **Visual Accessibility**:
  - High contrast text
  - Support for high contrast mode
  - Reduced motion support

## Landing Page Features
- **Project Cards**:
  - Title with gradient effect
  - Brief description
  - Relevant tags
  - Interaction statistics (stars, forks)
  - Background image with overlay
  - Prominent "View Project" link
- **Card Categories**:
  - Epic projects (featured, large cards)
  - Feature projects (medium-sized cards)
  - Mini projects (smaller cards)

## Project Detail Pages
- **Content Structure**:
  - Interactive demo at the top (if applicable)
  - Embedded video (if available)
  - Detailed project description
  - Technologies used
  - Screenshots/examples
  - Links to live demo and source code
- **GitHub Integration**:
  - Code preview from associated GitHub repository
  - Display README content
  - Show repository statistics
- **Media Support**:
  - Embedded video player
  - Image galleries
  - Interactive demos

## Administrator Dashboard
- **Dashboard Access**:
  - Secure admin login
  - Special dashboard view for content management
- **Content Management Features**:
  - Create new projects
  - Read/view existing projects
  - Update project information
  - Delete projects
- **Project Fields for Management**:
  - Title
  - Description
  - Category (Epic, Feature, Mini)
  - Background image upload
  - Tags
  - Links to detailed page
  - Optional GitHub repository link
  - Optional embedded video URL
- **Staging System**:
  - Preview projects before publishing
  - Stage content directly to landing page
  - Manage order/arrangement of projects

## Technical Architecture
- **Static Site Generation**:
  - GitHub Pages for hosting
  - Simple folder structure for easy management
- **Asset Management**:
  - Organized image directory
  - Consistent naming conventions
  - Optimized file sizes for performance
- **GitHub Integration**:
  - Repository-based project management
  - Code preview capability
  - README display

## Feature Requirements Detail

### Landing Page
- **Header**: Site title with gradient effect and subtitle
- **Project Grid**: Bento layout with various card sizes
- **Project Cards**: 
  - Background images with overlay
  - Title, description, tags
  - Project statistics
  - "View Project" link
- **Footer**: Copyright information and links

### Project Detail Pages
- **Interactive Demo Area**: 
  - Playable/interactive experience at the top
  - Loads from GitHub repository code if linked
- **Video Section**: 
  - Embedded video player (if video URL provided)
  - Appears below demo, above description
- **Description Section**:
  - Detailed project information
  - Technologies used
  - Development process
  - Key features
- **GitHub Integration**:
  - Code preview
  - Repository statistics
  - README display

### Admin Dashboard
- **Authentication**:
  - Secure login system
  - Admin-only access
- **Project Management**:
  - Create new projects
  - View all existing projects
  - Edit project details
  - Delete projects
  - Reorder projects on the landing page
- **Content Fields**:
  - Project title
  - Description (short and detailed)
  - Category selection (Epic, Feature, Mini)
  - Tags input
  - Background image upload
  - GitHub repository URL (optional)
  - Video embed URL (optional)
  - Additional images upload
- **Preview Functionality**:
  - Preview how project will appear on landing page
  - Preview project detail page
  - Stage changes before publishing

## Implementation Guidelines

### File Structure
```
repository/
├── index.html                # Landing page
├── admin/
│   └── dashboard.html        # Admin dashboard
├── images/
│   ├── bg-project1.jpg
│   ├── bg-project2.jpg
│   └── ...
├── projects/
│   ├── project1/
│   │   └── index.html
│   ├── project2/
│   │   └── index.html
│   └── ...
├── css/
│   ├── main.css
│   ├── admin.css
│   └── ...
├── js/
│   ├── main.js
│   ├── admin.js
│   └── ...
└── README.md
```

### Technology Stack
- HTML5, CSS3, JavaScript
- GitHub Pages for hosting
- LocalStorage or GitHub API for content management
- Embedded iframes for demos and videos

## Future Enhancements (Optional)
- User analytics integration
- Tag-based filtering system
- Dark/light mode toggle
- Multi-language support
- Social media sharing integration

---

This document serves as a comprehensive guide for implementing the Project Gallery portfolio site and its admin dashboard. All requirements should be implemented with a focus on accessibility, performance, and user experience.
