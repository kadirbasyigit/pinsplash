import logo from '../../assets/logo.png';
import { SearchBar } from '../ui/SearchBar';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  return (
    <header className="container flex items-center gap-4 py-4">
      <img src={logo} alt="Pinsplash Logo" className="w-auto h-7" />
      <SearchBar onSearch={onSearch} />
    </header>
  );
}
