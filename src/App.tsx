import { ChevronDown, Search } from 'lucide-react';
import { Button } from './components/ui/button';

function App() {
  return (
    <div>
      <h1>
        Welcome to My App <Search className="inline w-5 h-5" />
      </h1>
      <Button
        className="bg-background-brand-primary hover:bg-background-brand-primary-emphasize"
        size="lg"
      >
        Download
        <ChevronDown className="inline w-4 h-4" />
      </Button>
    </div>
  );
}

export default App;
