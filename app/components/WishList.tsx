import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Typography, Box } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';

interface WishlistListProps {
  emails: string[];
}

const WishlistList: React.FC<WishlistListProps> = ({ emails }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <List>
        {emails.map((email, index) => (
          <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
            <ListItemIcon>
              <EmailIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" color="textPrimary">
                  {`${index + 1}) ${email}`}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default WishlistList;
