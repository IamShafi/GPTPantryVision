import logo from "../assets/Logo.jpg";
import Link from "next/link";
import Image from "next/image";

import React from "react";

const Header = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <Image src={logo} alt="sumz_logo" className="w-28 object-contain" />
        <div className="flex flex-row items-center gap-6">
          <button type="button" className="black_btn">
            GPT Vision
          </button>
          <button type="button" className="black_btn max-sm:hidden md:flex">
            GitHub
          </button>
        </div>
      </nav>

      <h1 className="head_text">
        Organize Your Pantry <br className="max-md:hidden" />
        <span className="orange_gradient ">Effortlessly</span>
      </h1>
      <h2 className="desc">
        Classify pantry items and discover recipes easily. Keep your kitchen
        organized and make meal planning simple.
      </h2>
      <button type="button" className="wishlist_btn mt-[20px] px-[18px] py-[18px]">
        Join Wishlist
      </button>
    </header>
  );
};

export default Header;
