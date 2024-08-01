import React from "react";
import logo from "../assets/Logo.jpg";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <Link href="/">
          <Image src={logo} alt="sumz_logo" className="w-28 object-contain" />
        </Link>
        <div className="flex flex-row items-center gap-6">
          <Link href="/gpt-vision">
            <button type="button" className="black_btn">
              GPT Vision
            </button>
          </Link>
          <Link href="/ai-suggestion">
            <button type="button" className="black_btn max-sm:hidden md:flex">
              AI Suggestion
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
