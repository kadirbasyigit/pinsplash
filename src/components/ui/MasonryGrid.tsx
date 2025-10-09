import type { UnsplashPhoto } from '../../services/unsplash';
import { ImageCard } from './ImageCard';

interface MasonryGridProps {
  photos: UnsplashPhoto[];
  loading?: boolean;
}

export function MasonryGrid({ photos, loading }: MasonryGridProps) {
  if (loading && photos.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="bg-background-secondary rounded-lg"
            style={{ height: Math.random() * 200 + 200 }}
          />
        ))}
      </div>
    );
  }

  if (!photos.length) {
    return (
      <div className="text-center py-12">
        <p className="text-tertiary text-lg">No photos found</p>
        <p className="text-form-text-placeholder text-sm mt-2">
          Try searching for something else
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile: Single column */}
      <div className="md:hidden space-y-4">
        {photos.map(photo => (
          <ImageCard key={photo.id} photo={photo} />
        ))}
      </div>

      {/* Masonry layout for tablet and desktop */}
      <div className="hidden md:block columns-2 lg:columns-3 gap-2">
        {photos.map(photo => (
          <div key={photo.id} className="mb-2 break-inside-avoid">
            <ImageCard photo={photo} />
          </div>
        ))}
      </div>

      {/* Loading indicator for more photos */}
      {loading && photos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`loading-${index}`}
              className="bg-background-secondary rounded-lg"
              style={{ height: Math.random() * 200 + 200 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
