
import { Menu } from "lucide-react";

const HamburgerButton = ({ onClick }) => {
  return (
    <button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
};

export default HamburgerButton;
