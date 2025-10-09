import { useProgressiveImage } from '../../hooks/useProgressiveImage';
import type { UnsplashPhoto } from '../../services/unsplash';

interface ImageCardProps {
  photo: UnsplashPhoto;
  onImageLoad?: () => void;
}

export function ImageCard({ photo, onImageLoad }: ImageCardProps) {
  const altText =
    photo.alt_description || photo.description || `Photo by ${photo.user.name}`;

  const { src, isLoading, ref } = useProgressiveImage({
    thumb: photo.urls.thumb,
    small: photo.urls.small,
    regular: photo.urls.regular,
    alt: altText,
  });

  const handleImageLoad = () => {
    onImageLoad?.();
  };

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-lg bg-background-secondary transition-all`}
    >
      <div className="relative">
        <img
          src={src}
          alt={altText}
          className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 ${
            isLoading ? 'blur-sm' : 'blur-0'
          }`}
          loading="lazy"
          onLoad={handleImageLoad}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={photo.user.profile_image.small}
                alt={photo.user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-sm">{photo.user.name}</p>
                <p className="text-xs opacity-80">@{photo.user.username}</p>
              </div>
            </div>
            {(photo.description || photo.alt_description) && (
              <p className="text-sm opacity-90 line-clamp-2 max-w-xs">
                {photo.description || photo.alt_description}
              </p>
            )}
          </div>

          {/* Like count */}
          <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs font-medium">
            ❤️ {photo.likes}
          </div>
        </div>
      </div>
    </div>
  );
}
