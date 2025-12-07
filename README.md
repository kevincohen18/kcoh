# KCOH Software Inc. - Company Website

A professional, modern website for KCOH Software Inc., showcasing freelance software development services specializing in web applications, mobile apps, and custom software solutions.

## Features

- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations and transitions
- **Smooth Scrolling**: Enhanced navigation with smooth scroll behavior
- **Interactive Elements**: Mobile-friendly navigation menu, animated sections, and interactive contact form
- **SEO Optimized**: Semantic HTML structure with proper meta tags
- **Performance**: Lightweight and fast-loading with optimized assets

## Sections

1. **Hero Section**: Eye-catching introduction with call-to-action buttons
2. **Services**: Comprehensive overview of software development services
3. **Portfolio**: Showcase of featured projects and technologies
4. **About**: Company information and statistics
5. **Contact**: Contact form and information
6. **Footer**: Quick links and company information

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript**: Vanilla JavaScript for interactivity
- **Google Fonts**: Inter font family for typography

## Getting Started

### Prerequisites

No special prerequisites needed! This is a static website that can be opened directly in a browser.

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! The website is ready to use.

### Local Development

For local development with live reload, you can use:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Customization

### Colors

Edit the CSS variables in `styles.css` to customize the color scheme:

```css
:root {
    --primary-color: #6366f1;
    --primary-dark: #4f46e5;
    --secondary-color: #8b5cf6;
    /* ... more variables */
}
```

### Content

- Update company information in `index.html`
- Modify service descriptions and portfolio items
- Update contact information and form handling

### Contact Form

The contact form currently logs to the console. To make it functional:

1. Set up a backend service (Node.js, PHP, Python, etc.)
2. Update the form submission handler in `script.js`
3. Add proper error handling and user feedback

Example backend integration:

```javascript
fetch('/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    // Handle success
})
.catch(error => {
    // Handle error
});
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## File Structure

```
.
├── index.html      # Main HTML file
├── styles.css      # All CSS styles
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Future Enhancements

- Add backend integration for contact form
- Implement a blog section
- Add a project gallery with filtering
- Integrate analytics
- Add dark mode toggle
- Implement lazy loading for images
- Add testimonials section
- Create a case studies section

## License

© 2024 KCOH Software Inc. All rights reserved.

## Contact

For questions or support, please contact:
- Email: contact@kcoh.ca
- Website: https://kcoh.ca

---

Built with ❤️ by KCOH Software Inc.

