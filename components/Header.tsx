import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

function Header() {
  const headerItem = [
    { name: "Home", id: 1 },
    { name: "Tv Shows", id: 2 },
    { name: "Movie", id: 3 },
    { name: "New & Popular", id: 4 },
    { name: "My List", id: 5 },
  ];
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="object-contain cursor-pointer"
        />
        <ul className="hidden space-x-4 md:flex">
          {headerItem.map((Item) => (
            <li
              key={Item.id}
              className="text-sm cursor-pointer font-light text-[#e5e5e5] transition duration-[400] hover:text-[#b3b3b3]"
            >
              {Item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden sm:inline w-6 h-6 " />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="rounded cursor-pointer"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
