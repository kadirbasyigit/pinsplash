import { createApi } from 'unsplash-js';
const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

export interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  description: string | null;
  user: {
    name: string;
    username: string;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
  };
  width: number;
  height: number;
  likes: number;
  created_at: string;
}

export interface SearchPhotosResponse {
  results: UnsplashPhoto[];
  total: number;
  total_pages: number;
}

export const searchPhotos = async (
  query: string,
  page: number = 1,
  perPage: number = 30
): Promise<SearchPhotosResponse> => {
  try {
    const response = await unsplash.search.getPhotos({
      query,
      page,
      perPage,
      orientation: 'portrait',
    });

    if (response.errors) {
      throw new Error(response.errors.join(', '));
    }

    return response.response as SearchPhotosResponse;
  } catch (error) {
    console.error('Error searching photos:', error);
    throw new Error('Failed to search photos');
  }
};

export const getRandomPhotos = async (
  count: number = 30,
  collectionIds?: string[]
): Promise<UnsplashPhoto[]> => {
  try {
    const response = await unsplash.photos.getRandom({
      count,
      collectionIds,
    });

    if (response.errors) {
      throw new Error(response.errors.join(', '));
    }

    return Array.isArray(response.response)
      ? (response.response as UnsplashPhoto[])
      : [response.response as UnsplashPhoto];
  } catch (error) {
    console.error('Error fetching random photos:', error);
    throw new Error('Failed to fetch random photos');
  }
};

export default unsplash;
