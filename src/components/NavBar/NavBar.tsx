import { NavLink, useLocation } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useAppDispatch } from '../../app/hook.ts';
import { openModal } from '../../store/ModalSlice.ts';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  return (
    <Box sx={{mb: 5}}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color='inherit'
            component={NavLink}
            to='/'
            sx={{ flexGrow: 1, textDecoration: 'none' }}
          >
            Finance Tracker
          </Typography>
            <Box>
              <Button color="inherit" component={NavLink} to="/categories">Categories</Button>
              <Button color='inherit' onClick={() => dispatch(openModal())} >Add</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;