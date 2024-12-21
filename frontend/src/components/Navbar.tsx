import Link from "next/link";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <header className="flex justify-center items-center shadow-sm border-b border-primary py-3">
      <nav className="container mx-auto flex justify-between">
        <div>
          <Logo />
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="btn text-primary hover:bg-primary hover:text-white">
            Login
          </Link>
          <Link
            href="/register"
            className="btn bg-primary text-white hover:bg-white hover:text-primary"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
