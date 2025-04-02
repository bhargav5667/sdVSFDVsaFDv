"use client";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          MyWebsite
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className="hover:text-blue-500 transition-all"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Theme Toggle & Mobile Menu Button */}
        <div className="flex gap-4 items-center">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-gray-100 dark:bg-gray-800 flex flex-col items-center p-4 gap-4"
          >
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="hover:text-blue-500 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
