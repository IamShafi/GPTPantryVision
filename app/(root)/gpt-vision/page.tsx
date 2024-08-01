import ChatgptSuggestion from "@/app/components/ChatgptSuggestion";
import React from "react";

const page = () => {
  return (
    <div>
      <button type="button" className="black_btn max-sm:hidden md:flex">
        Suggest Recipe with AI
      </button>
      <ChatgptSuggestion />
    </div>
  );
};

export default page;
