import logo from '../../assets/logo.png';
import { SearchBar } from '../ui/SearchBar';

export function Header() {
  return (
    <header className="container flex items-center gap-4 py-4">
      <img src={logo} alt="Pinsplash Logo" className="w-auto h-7" />
      <SearchBar />
    </header>
  );
}
