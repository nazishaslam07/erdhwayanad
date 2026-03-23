import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const routeLabels: Record<string, string> = {
  "/": "Home",
  "/philosophy": "Philosophy",
  "/life": "Life at erdh",
  "/express-interest": "Express Interest",
  "/stewards": "Stewards",
  "/land": "The Land",
};

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border"
    >
      <div className="max-w-[1200px] mx-auto px-6 py-2 flex items-center gap-1.5 font-body text-xs tracking-wide">
        <Link
          to="/"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Home
        </Link>
        {segments.map((segment, i) => {
          const path = "/" + segments.slice(0, i + 1).join("/");
          const label = routeLabels[path] || segment;
          const isLast = i === segments.length - 1;

          return (
            <span key={path} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
              {isLast ? (
                <span className="text-foreground font-medium">{label}</span>
              ) : (
                <Link
                  to={path}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
