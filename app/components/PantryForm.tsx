'use client'

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../../firebaseConfig";

interface PantryFormProps {
  fetchItems: () => void;
}

const PantryForm: React.FC<PantryFormProps> = ({ fetchItems }) => {
  const [itemName, setItemName] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim()) {
      await addDoc(collection(db, 'pantryItems'), { name: itemName });
      setItemName('');
      fetchItems(); 
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mt: 4 }}>
      <TextField
        label="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Item
      </Button>
    </Box>
  );
};

export default PantryForm;
