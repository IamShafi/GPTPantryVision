import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <section className="w-full flex justify-center items-center flex-col">
      <h1 className="head_text">
        Organize Your Pantry <br className="max-md:hidden" />
        <span className="orange_gradient ">Effortlessly</span>
      </h1>
      <h2 className="desc">
        Classify pantry items and discover recipes easily. Keep your kitchen
        organized and make meal planning simple.
      </h2>
      <Link href="/wish-list">
        <button
          type="button"
          className="wishlist_btn mt-[20px] px-[18px] py-[18px]"
        >
          Join Wishlist
        </button>
      </Link>

      
    </section>
  );
};

export default HomePage;
