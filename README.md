# JAWADKO - Tech Repair Website

**Live:** https://jawadko.store  

A stunning, modern website for JAWADKO tech repair services featuring a captivating blue, yellow, and red neon theme.

## Features

- **Bilingual Support**: Full Arabic and English versions with language switcher
- **RTL Support**: Proper right-to-left layout for Arabic version
- **Admin Panel**: Complete admin dashboard to view and export form submissions
- **Form Management**: Contact form with backend database storage
- **Data Export**: Export submissions to CSV format
- **Responsive Design**: Fully responsive and mobile-friendly
- **Neon Theme**: Eye-catching blue, yellow, and red neon color scheme
- **Smooth Animations**: Beautiful scroll animations and transitions
- **Interactive Elements**: Hover effects, counters, and form interactions
- **Modern UI/UX**: Clean, professional design with excellent user experience
- **Floating WhatsApp**: Sticky WhatsApp button for instant contact

## Sections

1. **Hero Section**: Attention-grabbing landing with animated text and floating icons
2. **Services Section**: 6 main service cards with detailed features
3. **About Section**: Company information and key benefits
4. **Contact Section**: Contact information and functional contact form
5. **Footer**: Branding and copyright information

## Services Highlighted

- Mobile Phone Repair
- Laptop Repair
- Software Programming
- Device Unlocking
- Electronics Repair
- Data Recovery

## Customization

### Update Contact Information

Edit the contact section in `index.html` (around line 285-310):

```html
<p>+1 (555) 123-4567</p>  <!-- Your phone number -->
<p>repair@techmaster.com</p>  <!-- Your email -->
<p>123 Tech Street, Digital City</p>  <!-- Your address -->
```

### Update Business Name

The website is branded as "JAWADKO" - this can be changed by searching and replacing in `index.html`.

### Update Statistics

Edit the counter values in `index.html` (around line 64-74):

```html
<h3 class="counter" data-target="1000">0</h3>  <!-- Change 1000 to your value -->
```

### Change Colors

Edit the CSS variables in `styles.css` (around line 10-20):

```css
--neon-blue: #00d9ff;
--neon-yellow: #ffeb3b;
--neon-red: #ff006e;
```

### Add Social Media Links

Update the social links in `index.html` (around line 328):

```html
<a href="#" class="social-link">  <!-- Replace # with your social media URL -->
```

## How to Use

### Website:
1. Open `index.html` for English version or `index-ar.html` for Arabic version
2. Click the language button in the navigation to switch between languages
3. Contact form submissions are saved to database

### Admin Panel:
1. Access `admin-login.php` in your browser
2. Configure admin credentials locally (see `ADMIN-SETUP.md`) — do not commit real passwords
3. View all form submissions, search, and export to CSV

### Deployment:
- For PHP hosting: Upload all files via FTP (requires PHP 7.4+)
- For static hosting (GitHub Pages, etc.): Only HTML/CSS/JS will work (no admin panel)
- **Recommended:** Use PHP hosting for full functionality

## File Structure

```
JAWADCO/
├── index.html              # English version HTML
├── index-ar.html           # Arabic version HTML (RTL)
├── styles.css              # Main styling and animations
├── styles-ar.css           # Arabic-specific RTL styles
├── script.js               # Interactive functionality
├── admin-login.php         # Admin login page
├── admin-dashboard.php     # Admin dashboard
├── config.php              # Configuration & database
├── submit-form.php         # Form submission handler
├── export.php              # CSV export functionality
├── data/                   # Database directory
├── .htaccess               # Security settings
├── ADMIN-SETUP.md          # Admin setup instructions
└── README.md               # This file
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Features to Implement (Optional)

- Backend form submission (PHP, Node.js, etc.)
- Image gallery for completed repairs
- Testimonials section
- Blog section
- Appointment booking system
- Live chat integration

## Technologies Used

- HTML5
- CSS3 (with CSS Variables, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons

## Performance Tips

- The site uses Font Awesome CDN - consider downloading locally for better performance
- All animations are CSS-based for optimal performance
- Lazy loading can be added for images if needed

## Support

For customization help or issues, feel free to reach out!

---

Built with passion for technology
