import type { UnsplashPhoto } from '../../services/unsplash';
import { ImageCard } from './ImageCard';

interface MasonryGridProps {
  photos: UnsplashPhoto[];
  loading?: boolean;
}

export function MasonryGrid({ photos, loading }: MasonryGridProps) {

  if (loading && photos.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="bg-background-secondary animate-pulse rounded-lg"
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
        {photos.map((photo) => (
          <ImageCard
            key={photo.id}
            photo={photo}
          />
        ))}
      </div>

      {/* Tablet: 2 columns */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-2 gap-4">
          {photos.map((photo, index) => (
            <div key={photo.id} className={index % 2 === 0 ? 'mt-0' : 'mt-8'}>
              <ImageCard
                photo={photo}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: 3 columns masonry */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div 
              key={photo.id} 
              className={
                index % 3 === 0 ? 'mt-0' : 
                index % 3 === 1 ? 'mt-12' : 
                'mt-6'
              }
            >
              <ImageCard
                photo={photo}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Loading indicator for more photos */}
      {loading && photos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`loading-${index}`}
              className="bg-background-secondary animate-pulse rounded-lg"
              style={{ height: Math.random() * 200 + 200 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}