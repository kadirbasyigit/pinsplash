import { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { MasonryGrid } from './components/ui/MasonryGrid';
import { usePhotoSearch } from './hooks/usePhotoSearch';

function App() {
  const { photos, loading, error, search, loadRandomPhotos } = usePhotoSearch();

  useEffect(() => {
    loadRandomPhotos();
  }, [loadRandomPhotos]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      search(query);
    } else {
      loadRandomPhotos();
    }
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <Header onSearch={handleSearch} />
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-background-error-subtle border border-border-error-subtle rounded-lg p-4 mb-6">
            <p className="text-form-text-error font-medium">Error loading photos</p>
            <p className="text-form-text-error text-sm mt-1">{error}</p>
          </div>
        )}
        <MasonryGrid photos={photos} loading={loading} />
      </main>
    </div>
  );
}

export default App;
