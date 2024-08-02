// src/components/PantryList.tsx
import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, TextField } from '@mui/material';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

interface PantryItem {
  id: string;
  name: string;
}

interface PantryListProps {
  items: PantryItem[];
  fetchItems: () => void;
}

const PantryList: React.FC<PantryListProps> = ({ items, fetchItems }) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editedItemName, setEditedItemName] = useState<string>('');

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'pantryItems', id));
    fetchItems();
    updateLocalStorage();
  };

  const handleEdit = (id: string, name: string) => {
    setEditingItemId(id);
    setEditedItemName(name);
  };

  const handleSave = async (id: string) => {
    const itemDoc = doc(db, 'pantryItems', id);
    await updateDoc(itemDoc, { name: editedItemName });
    setEditingItemId(null);
    setEditedItemName('');
    fetchItems();
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    const storedItems = localStorage.getItem('pantryItems');
    if (storedItems) {
      const items = JSON.parse(storedItems).filter((item: PantryItem) => item.id !== editingItemId);
      items.push({ id: editingItemId, name: editedItemName });
      localStorage.setItem('pantryItems', JSON.stringify(items));
    }
  };

  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #ccc', borderRadius: '5px', padding: '10px'}}>
          {editingItemId === item.id ? (
            <TextField
              value={editedItemName}
              onChange={(e) => setEditedItemName(e.target.value)}
            />
          ) : (
            <ListItemText primary={`${index + 1}) ${item.name}`} />
          )}
          <div>
            {editingItemId === item.id ? (
              <IconButton onClick={() => handleSave(item.id)}>
                <SaveIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => handleEdit(item.id, item.name)}>
                <EditIcon />
              </IconButton>
            )}
            <IconButton onClick={() => handleDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default PantryList;
