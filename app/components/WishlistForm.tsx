import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { TextField, Button, Box } from "@mui/material";

interface WishlistFormProps {
  fetchEmails: () => void;
}

const WishlistForm: React.FC<WishlistFormProps> = ({ fetchEmails }) => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await addDoc(collection(db, "wishliist"), { email });
      setEmail("");
      fetchEmails();
    }
  };
  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, mt: 4 , color: "black"}}
      >
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default WishlistForm;
