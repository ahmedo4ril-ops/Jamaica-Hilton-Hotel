# Jamaica Hilton Hotel

## Project description

Jamaica Hilton Hotel is a responsive React booking website for a boutique coastal hotel. The application includes a welcoming home page, an about section, room listings, and a contact form with validation. It demonstrates reusable components, state management, event handling, and navigation using React Router.

## Technologies used

- React JS
- Vite
- React Router DOM
- HTML, CSS, JavaScript

## Installation

1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Run:
   ```bash
   npm install
   ```

## Run the application

```bash
npm run dev
```

Then open the local URL displayed in the terminal, usually http://localhost:5173.

## Deploy to Vercel

1. Push the project to a GitHub, GitLab, or Bitbucket repository.
2. In Vercel, choose **Add New Project** and import that repository.
3. Keep the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Choose **Deploy**. No environment variables are required.

The included `vercel.json` sends app routes to `index.html`, so React Router pages such as `/rooms`, `/about`, and `/contact` also work when opened directly or refreshed.

## Features

- Responsive multi-page layout
- Interactive booking form with room selection and stay total estimate
- Reusable room cards using mapped data
- Contact form with validation and feedback
- Local storage support for saved booking preferences

## Project structure

- `src/App.jsx` – main application layout and pages
- `src/App.css` – styling and responsive design
- `src/index.css` – base styling reset
- `public` – static assets
