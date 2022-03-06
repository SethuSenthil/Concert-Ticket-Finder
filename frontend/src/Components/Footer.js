import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Footer() {
    return (
        <AppBar position="static" color="primary">
          <Container width="100%">
            <Toolbar>
              <Typography variant="body1" color="inherit">
                &copy; 2022 Concert Ticket Finder
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}