import React from 'react'
import logo from "../assets/Logo.jpg";
import Image from "next/image";

const Navbar = () => {
  return (
    <div
      className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <Image src={logo} alt="sumz_logo" className="w-28 object-contain" />
        <div className="flex flex-row items-center gap-6">
          <button type="button" className="black_btn">
            GPT Vision
          </button>
          <button type="button" className="black_btn max-sm:hidden md:flex">
            AI Suggestion
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
