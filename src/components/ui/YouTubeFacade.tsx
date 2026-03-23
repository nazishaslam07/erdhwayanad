import { useState, useCallback } from "react";

const YouTubeFacade = ({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) => {
  const [loaded, setLoaded] = useState(false);
  const handlePlay = useCallback(() => setLoaded(true), []);

  if (loaded) {
    return (
      <iframe
        className="w-full aspect-[2/3] md:aspect-video rounded-lg"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ border: 0 }}
      />
    );
  }

  return (
    <button
      onClick={handlePlay}
      className="relative w-full aspect-[2/3] md:aspect-video rounded-lg overflow-hidden group cursor-pointer bg-foreground/10"
      aria-label={`Play video: ${title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary-foreground/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <svg className="w-6 h-6 md:w-8 md:h-8 text-foreground ml-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default YouTubeFacade;

