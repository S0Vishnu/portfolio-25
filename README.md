# Portfolio 2025

A modern, responsive portfolio website showcasing creative works including web projects, designs, art, 3D renders, and comics. Built with React, TypeScript, and Vite.

## Features

- 🎨 **Multi-category Portfolio**: Showcase projects across web development, design, art, 3D renders, and comics
- 📱 **Responsive Design**: Optimized for all device sizes
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and optimized production builds
- 🎭 **Smooth Animations**: Powered by Framer Motion and GSAP
- 🖱️ **Custom Cursor**: Interactive custom cursor experience
- 📖 **Comic Reader**: Dynamic comic loading with chapter navigation
- 🖼️ **Gallery View**: Image gallery with modal preview and keyboard navigation
- ♿ **Accessible**: Built with accessibility best practices

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **CSS3** - Styling with CSS custom properties

## Project Structure

```
src/
├── assets/          # Images, SVGs, and static assets
│   ├── comics/      # Comic pages organized by series
│   ├── images/      # Project images and artwork
│   └── svg/         # SVG icons and graphics
├── components/      # React components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Cursor.tsx
│   ├── ErrorBoundary.tsx
│   ├── Footer.tsx
│   ├── Gallery.tsx
│   ├── Landing.tsx
│   ├── Projects.tsx
│   └── ...
├── constants/       # App constants and configuration
├── data/            # Data files
│   ├── projectData.ts
│   └── timelineData.ts
├── pages/           # Page components
│   ├── Home.tsx
│   ├── Works.tsx
│   └── Works/
│       ├── Chapter.tsx
│       ├── Project.tsx
│       └── NotFound.tsx
├── styles/          # CSS stylesheets
├── utils/           # Utility functions
│   └── comicsLoader.ts
└── types.d.ts       # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-25.git
cd portfolio-25
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```bash
# Copy the example file
cp .env.example .env

# Edit .env and set your contact email
VITE_CONTACT_EMAIL=your-email@example.com
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory, ready to be deployed to any static hosting service.

## Deployment

This project can be deployed to:

- **Vercel** (recommended) - Already configured with `vercel.json`
- **Netlify**
- **GitHub Pages**
- Any static hosting service

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect the Vite configuration
4. Deploy!

## Adding New Projects

Projects are defined in `src/data/projectData.ts`. To add a new project:

1. Add your project image to `src/assets/images/projects/`
2. Import the image in `projectData.ts`
3. Add a new project object to the `projects` array

Example:
```typescript
{
  id: 'my-project',
  title: 'My Project',
  content: 'Project description',
  category: 'web-project',
  beta: false,
  thumbnail: myProjectImage,
  status: 'published',
  featured: true,
  link: 'https://example.com'
}
```

## Adding Comics

Comics are automatically loaded from `src/assets/comics/`. The folder structure should be:

```
assets/comics/
└── {comic-name}/
    ├── 00.webp          # Thumbnail
    ├── description.txt  # Optional description
    └── Chapter 1/
        ├── 01.webp
        ├── 02.webp
        └── ...
```

The comics loader will automatically:
- Detect all comics from the folder structure
- Generate thumbnails from `00.webp` files
- Organize chapters from subfolders
- Sort pages numerically

## Environment Variables

- `VITE_CONTACT_EMAIL` - Contact email address (default: vishnus.connect@gmail.com)

## Features in Detail

### Error Handling
- React Error Boundaries for graceful error handling
- Custom 404 page for missing routes
- Error states with user-friendly messages

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Focus management in modals
- Semantic HTML structure

### Performance
- Code splitting with React.lazy (can be added)
- Image lazy loading
- Memoized computations
- Optimized animations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Contact

For inquiries, please contact: vishnus.connect@gmail.com

---

Built with ❤️ using React, TypeScript, and Vite
