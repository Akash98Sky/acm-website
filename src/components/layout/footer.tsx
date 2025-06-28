import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="border-t py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>
          <Button asChild variant="link" className="text-sm text-muted-foreground hover:text-primary">
            <a href="https://akash98sky.github.io/" target="_blank" rel="noopener noreferrer">
              © 2025 Akash Mondal
            </a>
          </Button>
        </p>
      </div>
    </footer>
  );
}
