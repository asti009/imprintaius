/**
 * Shiksha Toggle/Accordion Fix
 * Fixes Elementor toggle widgets on static pages
 */
(function() {
    'use strict';
    
    function initToggles() {
        // Get all toggle title elements
        var toggleTitles = document.querySelectorAll('.elementor-toggle .elementor-tab-title');
        
        toggleTitles.forEach(function(title) {
            // Remove existing listeners to prevent duplicates
            var newTitle = title.cloneNode(true);
            title.parentNode.replaceChild(newTitle, title);
            
            newTitle.addEventListener('click', function(e) {
                e.preventDefault();
                
                var tabId = this.getAttribute('data-tab');
                var toggleItem = this.closest('.elementor-toggle-item');
                var toggleContainer = this.closest('.elementor-toggle');
                var contentId = this.getAttribute('aria-controls');
                var content = document.getElementById(contentId);
                
                if (!content) {
                    // Try to find content by data-tab
                    content = toggleItem.querySelector('.elementor-tab-content[data-tab="' + tabId + '"]');
                }
                
                var isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                if (isExpanded) {
                    // Close this toggle
                    this.setAttribute('aria-expanded', 'false');
                    this.classList.remove('elementor-active');
                    toggleItem.classList.remove('elementor-active');
                    if (content) {
                        content.style.display = 'none';
                        content.classList.remove('elementor-active');
                    }
                } else {
                    // Open this toggle
                    this.setAttribute('aria-expanded', 'true');
                    this.classList.add('elementor-active');
                    toggleItem.classList.add('elementor-active');
                    if (content) {
                        content.style.display = 'block';
                        content.classList.add('elementor-active');
                    }
                }
            });
            
            // Also handle keyboard enter/space
            newTitle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        // Also handle click on the toggle title anchor
        var toggleAnchors = document.querySelectorAll('.elementor-toggle .elementor-toggle-title');
        toggleAnchors.forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                var title = this.closest('.elementor-tab-title');
                if (title) {
                    title.click();
                }
            });
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initToggles);
    } else {
        initToggles();
    }
    
    // Also try to initialize after a short delay (for dynamic content)
    setTimeout(initToggles, 500);
})();
