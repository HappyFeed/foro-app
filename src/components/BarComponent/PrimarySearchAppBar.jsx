import React, {  useState, useContext} from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Arrow from '@mui/icons-material/ArrowForward';
import Modal from '@mui/material/Modal';
import AppContext from "../../context/AppContext";

import { collection, getDocs } from 'firebase/firestore';
import {db }  from '../../config/firebase/firebase';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { auth } from '../../config/firebase/firebase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(8),
    width: '40%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,

  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PrimarySearchAppBar() {
  const state = useContext(AppContext);

  const [nameSearch, setNameSearch] = useState("");
  const [userArray, setUserArray] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isModalOpen = Boolean(openModal);


  const { logout } = useAuth();
  const history = useHistory();

  const [error, setError] = useState('');

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleModalClose = () => {
    setOpenModal(false);
  }

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleSearch = async() => {
    const datos = await getDocs(collection(db,'usuarios'))
    var flag = false
    datos.forEach((documento) => {
      if(documento.data().user.name === nameSearch){
        setUserArray([documento.data().user.name, documento.data().user.lastName, documento.data().user.email])
        handleModalOpen()
        flag = true;
        setNameSearch("")
      }
    })
    if(!flag){
      window.alert("Usuario no existente")
      setNameSearch("")
    }

  };

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login');
    } catch (error) {
      setError('Server Error')
    }
  }

  const handleEdit = () =>{
    try {
      history.push('/edit');
    } catch (error) {
      setError('Server Error')
    }
  }

  const renderModal = (
    <Modal
    open={isModalOpen}
    onClose={handleModalClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
          <Typography id="modal-modal-title" variant="h7" component="h1">
            Usuario: {userArray[0]}
          </Typography>
          <Typography id="modal-modal-description" variant="h7" component="h3" sx={{ mt: 2 }}>
            Apellido: {userArray[1]} <br></br>
            Email:{userArray[2]} <br></br>
          </Typography>
        </Box>
    </Modal>
  );

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleEdit}>Mi perfil</MenuItem>
      <MenuItem onClick={handleLogout}>Salir</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            FORO - APP
          </Typography>
          {renderModal}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange= {(event)=> setNameSearch(event.target.value)}
              id='searchName'
              placeholder="Buscar Usuario..."
              value={nameSearch}
            />
          </Search>
          <IconButton
              onClick={handleSearch}
              color="inherit"
            >
              <Arrow />
            </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <Typography id="modal-modal-title" variant="h7" component="h1">

            </Typography>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}