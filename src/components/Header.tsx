"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <Box
      sx={{ width: '100vw', height: '100vh' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
        <Image src="/logo_pintu.png" alt="Pintu Logo" width={100} height={50} />
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {['Fitur', 'Trading', 'Edukasi', 'Lainnya', 'Bahasa'].map((text) => (
          <ListItem component="button" key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        style={{
          backgroundColor: '#ffffff',
          color: '#000000',
          boxShadow: 'none',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <Toolbar sx={{ padding: '0 2rem' }}>
          <Box display="flex" flexGrow={1} alignItems="center">
            <Image
              src="/logo_pintu.png"
              alt="Pintu Logo"
              width={100}
              height={50}
              style={{ marginRight: '30px' }}
            />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {['Fitur', 'Trading', 'Edukasi', 'Lainnya'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} passHref>
                <Button
                  color="inherit"
                  style={{
                    marginRight: '20px',
                    fontWeight: 500,
                    fontSize: '1rem',
                    color: '#000000',
                    textTransform: 'capitalize',
                  }}
                >
                  {item}
                </Button>
              </Link>
            ))}
            <Button
              variant="outlined"
              style={{
                borderColor: '#000000',
                color: '#000000',
                fontWeight: 500,
                textTransform: 'capitalize',
                marginRight: '20px',
              }}
            >
              Download App
            </Button>
          </Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
    </>
  );
}
