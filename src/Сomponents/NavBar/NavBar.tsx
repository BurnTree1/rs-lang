import React, { FC, useState } from "react";
import { useSelector , useDispatch } from 'react-redux';
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import BookIcon from '@material-ui/icons/Book';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NavLink } from "react-router-dom";
import './NavBar.css'
import { urlBuilder, urlPrefix } from "../../helpers";
import { authImageSelector } from '../../store/reducers/authorizationSlice';
import { clearWords } from "../../store/reducers/memoryGameSlice";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      boxShadow: '0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)',
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    }
  })
);

type PropsType = {
  open: boolean
  menuOpen: boolean
  handleClick: ()=> void
  handleDrawerToggle: ()=> void
}
export const NavBar: FC<PropsType> = (props) => {
  const { open, menuOpen, handleClick, handleDrawerToggle } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [dictionaryOpen, setDictionaryOpen] = useState<boolean>(true)
  const handleDictionaryClick = () => {
    setDictionaryOpen(!dictionaryOpen)
  }
  const imageUrl = useSelector(authImageSelector)

  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={menuOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === "ltr" ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
          </IconButton>
        </div>
        <Divider/>
        <List>
          <NavLink exact to='/' activeClassName='active'>
            <ListItem button>
              <ListItemIcon>
              <HomeIcon style={{ color: 'black' }}/>
              </ListItemIcon>
              <ListItemText primary="Главная"/>
            </ListItem>
          </NavLink>
          <NavLink to='/book' activeClassName='active'>
            <ListItem button>
              <ListItemIcon>
              <LibraryBooksIcon style={{ color: 'black' }}/>
              </ListItemIcon>
              <ListItemText primary="Учебник"/>
            </ListItem>
          </NavLink>
            <ListItem button onClick={handleDictionaryClick}>
              <ListItemIcon>
              <BookIcon style={{ color: 'black' }}/>
              </ListItemIcon>
              <ListItemText primary="Словарь"/>
              {dictionaryOpen ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse className='nested' in={dictionaryOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink to={urlBuilder(urlPrefix.studied, '1')} activeClassName='active'>
                <ListItem button>
                  <ListItemIcon>
                    <></>
                  </ListItemIcon>
                  <ListItemText primary="Изучаемые"/>
                </ListItem>
              </NavLink>
              <NavLink to={urlBuilder(urlPrefix.difficult, '1')} activeClassName='active'>
                <ListItem button>
                  <ListItemIcon>
                    <></>
                  </ListItemIcon>
                  <ListItemText primary="Сложные"/>
                </ListItem>
              </NavLink>
              <NavLink to={urlBuilder(urlPrefix.deleted, '1')} activeClassName='active'>
                <ListItem button>
                  <ListItemIcon>
                    <></>
                  </ListItemIcon>
                  <ListItemText primary="Удаленные"/>
                </ListItem>
              </NavLink>
            </List>
          </Collapse>
          <Divider/>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
            <VideogameAssetIcon style={{ color: 'black' }}/>
            </ListItemIcon>
            <ListItemText primary="Мини-игры"/>
            {open ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>
          <Collapse className='nested' in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink to='/savannah' activeClassName='active'>
                <ListItem button>
                  <ListItemIcon>
                    <></>
                  </ListItemIcon>
                  <ListItemText primary="Саванна"/>
                </ListItem>
              </NavLink>
              <NavLink to='/audio' activeClassName='active'>
                <ListItem button>
                  <ListItemIcon>
                    <></>
                  </ListItemIcon>
                  <ListItemText primary="Аудиовызов"/>
                </ListItem>
              </NavLink>
              <NavLink to='/sprint' activeClassName='active'>
                <ListItem button>
                  <ListItemIcon>
                    <></>
                  </ListItemIcon>
                  <ListItemText primary="Спринт"/>
                </ListItem>
              </NavLink>
              <NavLink to='/my-game' activeClassName='active'>
                <ListItem button>
                  <ListItemIcon>
                    <></>
                  </ListItemIcon>
                  <ListItemText onClick={() => {dispatch(clearWords())}} primary="Memory Game"/>
                </ListItem>
              </NavLink>
            </List>
          </Collapse>
          <Divider/>
          <NavLink to='/statistics' activeClassName='active'>
            <ListItem button>
              <ListItemIcon>
              <EqualizerIcon style={{ color: 'black' }}/>
              </ListItemIcon>
              <ListItemText primary="Статистика"/>
            </ListItem>
          </NavLink>
          <NavLink to='/' activeClassName='active'>
            <ListItem button>
              <ListItemIcon>
              <ExitToAppIcon style={{ color: 'black' }}/>
              </ListItemIcon>
              <ListItemText primary="Выход"/>
            </ListItem>
          </NavLink>
          <ListItem>
            <img src={imageUrl} alt="avatar"/>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};
