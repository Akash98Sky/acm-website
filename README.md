# Personal Portfolio for Professor Abhoy Chand Mondal

This is a personal portfolio website for Professor Abhoy Chand Mondal, showcasing his academic profile, research interests, publications, and contact information. The project is built with Next.js and designed to be deployed on Firebase App Hosting.

## Tech Stack

This project is built with a modern, component-based architecture using the following technologies:

- **[Next.js](https://nextjs.org/)**: A React framework for building server-rendered applications.
- **[React](https://react.dev/)**: A JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that compiles to plain JavaScript.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[ShadCN UI](https://ui.shadcn.com/)**: A collection of beautifully designed, accessible, and customizable UI components.
- **[Genkit](https://firebase.google.com/docs/genkit)**: An open-source framework from Google for building AI-powered features.
- **[Firebase App Hosting](https://firebase.google.com/docs/app-hosting)**: A fully-managed, secure hosting service for web apps.

## Getting Started

To run the project locally, follow these steps:

1.  **Install Dependencies:**
    Make sure you have Node.js and npm installed. Then, install the project dependencies.

    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    Start the Next.js development server.

    ```bash
    npm run dev
    ```

3.  **Open in Browser:**
    Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## Project Structure

- `src/app/`: Contains the main pages and layouts of the application, following the Next.js App Router structure.
- `src/components/`: Reusable React components, including UI components from ShadCN.
- `src/data/`: JSON files containing the portfolio data (resume, publications, etc.).
- `src/ai/`: Genkit flows for AI-powered features.
- `public/`: Static assets like images.

## Deployment

This application is pre-configured for easy deployment with [Firebase App Hosting](https://firebase.google.com/docs/app-hosting). You can connect your GitHub repository to a Firebase project to set up continuous deployment.
