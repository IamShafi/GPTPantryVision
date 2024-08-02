"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import loader from "../../assets/loader.svg";

const GptSuggestion = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<string[]>([]);

  const fetchRecipeSuggestions = async () => {
    setIsFetching(true);
    setError(null);
    try {
      const pantryItems = JSON.parse(localStorage.getItem("pantryItems") || "[]").map(
        (item: any) => item.name
      );
      const response = await axios.post("/api/getRecipeSuggestions", { items: pantryItems });
      setRecipes(response.data.recipes);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching recipes.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="my-10 max-w-full flex justify-center items-center">
      {isFetching ? (
        <Image src={loader} alt="loader" className="w-20 h-20 object-contain" />
      ) : error ? (
        <p className="font-inter font-bold text-black text-center">
          Well, that wasn't supposed to happen...
          <br />
          <span className="font-satoshi font-normal text-gray-700">{error}</span>
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          <h2 className="head_text font-satoshi font-bold text-gray-600 text-xl">
            AI <span className="orange_gradient">Recipe Suggestion</span>
          </h2>
          <button type="button" className="black_btn" onClick={fetchRecipeSuggestions}>
            Generate Recipe Suggestion
          </button>
          <article className="flex flex-col text-gray-700">
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <div key={index} className="mb-4">
                  <p>{recipe}</p>
                </div>
              ))
            ) : (
              <p>No recipe suggestions available.</p>
            )}
          </article>
        </div>
      )}
    </div>
  );
};

export default GptSuggestion;
