"use client"
import React, { useState } from "react";  
import axios from "axios";
import Image from "next/image";
import loader from "../../assets/loader.svg";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig"

interface PantryItem {
  id: string;
  name: string;
}

const GptSuggestion = () => {  
  const [isFetching, setIsFetching] = useState(false);  
  const [error, setError] = useState<string | null>(null);  
  const [recipes, setRecipes] = useState<string[]>([]);  
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);  
  const OPENROUTER_API_KEY = "YOUR_OPENROUTER_API_KEY";   
  const YOUR_SITE_URL = "YOUR_SITE_URL";  
  const YOUR_SITE_NAME = "YOUR_SITE_NAME";  


  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'pantryItems'));
    const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
    setPantryItems(itemsList);
  };

  const fetchRecipeSuggestions = async () => {  
    setIsFetching(true);  
    fetchItems();
    setError(null);  
    try {  
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {  
        method: "POST",  
        headers: {  
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,  
          "Content-Type": "application/json"  
        },  
        body: JSON.stringify({  
          "model": "meta-llama/llama-3.1-8b-instruct:free",  
          "messages": [  
            {"role": "user", "content": `Suggest a recipe I can make using the following ingredients: ${pantryItems.join(", ")}`},  
          ],  
        })  
      });  
      const data = await response.json();  
      setRecipes([data.choices[0].message.content]);  
    } catch (err: any) {  
      setError(err.message || "An error occurred while fetching recipes.");  
    } finally {  
      setIsFetching(false);  
    }  
  };  

  const handlePantryItemsChange = (items: string[]) => {  
    setPantryItems(items);  
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
          {/* <PantryList items={items} onChange={handlePantryItemsChange} />   */}
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