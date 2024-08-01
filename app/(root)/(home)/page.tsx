'use client'
import React, {useState, useEffect} from "react";
import Link from "next/link";
import PantryForm from "@/app/components/PantryForm";
import PantryList from "@/app/components/PantryList";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { Container, Typography, Box } from "@mui/material";

interface PantryItem {
  id: string;
  name: string;
}

const HomePage = () => {
  const [items, setItems] = useState<PantryItem[]>([]);

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'pantryItems'));
    const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
    setItems(itemsList);
  };

  useEffect(() => {
    fetchItems();
  }, []);
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

      <div className="my-10 max-w-full flex justify-center items-center">
        <Box
          sx={{
            my: 10,
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PantryForm fetchItems={fetchItems} />
          <PantryList items={items} fetchItems={fetchItems} />
        </Box>
      </div>
    </section>
  );
};

export default HomePage;
