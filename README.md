# Nemerie Lesley Ann L. Acuña — Personal Portfolio

A responsive, high-performance static personal portfolio website for **Nemerie Lesley Ann L. Acuña**, Information Technology Student.

Built with pure static HTML5, CSS3, and JavaScript, designed for fast loading and seamless deployment on **Vercel**, GitHub Pages, or any static hosting platform.

---

## 🚀 Features

- **Dark / Light Theme Toggle:** Automatic detection with `localStorage` persistence.
- **Modern Starfield Parallax Effect:** Smooth background parallax effect.
- **Hero Section:** Animated aura, gradient typography, and floating portrait.
- **About Section:** IT background and contact quick-links.
- **Education Timeline:** Educational journey and qualifications.
- **Interactive Certificates Gallery:** Full-screen modal viewer powered by Alpine.js.
- **Projects Showcase & Carousel:** Multi-image project gallery with navigation controls and modal preview.
- **Resume Actions:** Direct resume download and embedded PDF viewer modal.
- **Contact Channels:** Quick access to Email, Phone, GitHub, and social media links.
- **100% Pure Static:** No build step, no compiler, no backend dependencies required.

---

## 📁 Project Structure

```
.
├── index.html            # Main HTML document
├── vercel.json           # Vercel configuration (caching & security headers)
├── robots.txt            # Search engine crawler instructions
├── favicon.ico           # Site favicon
├── css/
│   └── app.css           # Styling and dark/light mode rules
├── js/
│   └── app.js           # Theme toggle, starfield parallax & mobile nav
├── images/
│   ├── nems.jpg          # Profile avatar
│   ├── favicon.png / svg # Icons
│   ├── cert/             # Certification images
│   └── proj/             # Project screenshots & carousel images
└── resume/
    └── Acuna-Resume.pdf  # Resume document
```

---

## 💻 Local Preview

Because this is a pure static HTML site, you can view it directly without any setup:

### Option 1: Open Directly in Browser
Double-click `index.html` in your file explorer, or drag and drop it into any web browser.

### Option 2: Using Any Local Server
```bash
# Python:
python -m http.server 3000

# or Node (npx):
npx serve .
```

---

## 🌐 Deploy to Vercel

### Method 1: Deploy via GitHub (Recommended)

1. **Commit and Push:**
   ```bash
   git add .
   git commit -m "Pure static HTML portfolio for Vercel deployment"
   git push origin main
   ```

2. **Import into Vercel:**
   - Go to [Vercel](https://vercel.com/new).
   - Click **Add New...** -> **Project** and select your repository.
   - Leave **Framework Preset** as `Other`, **Root Directory** as `./`, and leave build command blank.
   - Click **Deploy**.

### Method 2: Deploy via Vercel CLI

```bash
vercel
```

---

## 🛠️ Built With

- **HTML5 & CSS3** (Custom properties & responsive layout)
- **Vanilla JavaScript** (Theme management & animations)
- **Alpine.js 3** (CDN modal & carousel interactivity)
- **Font Awesome 6.5.2** (CDN icon set)
- **Google Fonts** (Space Grotesk, Inter, Poppins)

---

## 📄 License

Personal portfolio of Nemerie Lesley Ann L. Acuña.
