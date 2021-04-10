import React, { FC, useState } from "react";
import { Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import {
  Book,
  ChevronLeft,
  ChevronRight,
  Equalizer,
  ExitToApp,
  ExpandLess,
  ExpandMore,
  Home,
  LibraryBooks,
  SportsEsports,
  Lock
} from "@material-ui/icons";
import { useSelector , useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import user from '../../assets/image/user.png'
import { setHasDifficulty } from '../../store/reducers/sprintSlice';
import { setHasAudioDifficulty } from '../../store/reducers/audioSlice';
import { authImageSelector, authIsAuthorized, logOut } from "../../store/reducers/authorizationSlice";
import "./NavBar.css";
import { PAGE_AUTH, urlBuilder, urlPrefix } from "../../helpers";
import { clearWords } from "../../store/reducers/memoryGameSlice";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      boxShadow: "0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)"
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end"
    }
  })
);

type PropsType = {
  open: boolean
  menuOpen: boolean
  handleClick: () => void
  handleDrawerToggle: () => void
}
export const NavBar: FC<PropsType> = (props) => {
  const { open, menuOpen, handleClick, handleDrawerToggle } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [dictionaryOpen, setDictionaryOpen] = useState<boolean>(true);
  const handleDictionaryClick = () => {
    setDictionaryOpen(!dictionaryOpen)
  }
  const imageUrl = useSelector(authImageSelector)
  const isAuth = useSelector(authIsAuthorized)

  const dispatch = useDispatch();
  const onLogOut = () => {
    dispatch(logOut());
  };

  const noAuthActive = (match: any, location: any) => (location.pathname !== PAGE_AUTH && match)

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
            {theme.direction === "ltr" ? <ChevronLeft/> : <ChevronRight/>}
          </IconButton>
        </div>
        <Divider/>
        <List>
          <NavLink exact to='/' activeClassName='active'>
            <ListItem button>
              <ListItemIcon>
                <Home style={{ color: "black" }}/>
              </ListItemIcon>
              <ListItemText primary="Главная"/>
            </ListItem>
          </NavLink>
          <NavLink to='/book' activeClassName='active'>
            <ListItem button>
              <ListItemIcon>
                <LibraryBooks style={{ color: "black" }}/>
              </ListItemIcon>
              <ListItemText primary="Учебник"/>
            </ListItem>
          </NavLink>
          <ListItem button onClick={handleDictionaryClick}>
            <ListItemIcon>
              <Book style={{ color: "black" }}/>
            </ListItemIcon>
            <ListItemText primary="Словарь"/>
            {dictionaryOpen ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>
          <Collapse className='nested' in={dictionaryOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink to={urlBuilder(urlPrefix.studied, "1")} activeClassName='active' isActive={noAuthActive}>
                <ListItem button>
                  <ListItemIcon>
                    <></>
                  </ListItemIcon>
                  <ListItemText primary="Изучаемые"/>
                  {!isAuth && <Lock/>}
                </ListItem>
              </NavLink>
              <NavLink to={urlBuilder(urlPrefix.difficult, "1")} activeClassName='active' isActive={noAuthActive}>
                <ListItem button>
                  <ListItemIcon>
                    <></>
                  </ListItemIcon>
                  <ListItemText primary="Сложные"/>
                  {!isAuth && <Lock/>}
                </ListItem>
              </NavLink>
              <NavLink to={urlBuilder(urlPrefix.deleted, "1")} activeClassName='active' isActive={noAuthActive}>
                <ListItem button>
                  <ListItemIcon>
                    <></>
                  </ListItemIcon>
                  <ListItemText primary="Удаленные"/>
                  {!isAuth && <Lock/>}
                </ListItem>
              </NavLink>
            </List>
          </Collapse>
          <Divider/>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <SportsEsports style={{ color: "black" }}/>
            </ListItemIcon>
            <ListItemText primary="Мини-игры"/>
            {open ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>
          <Collapse className='nested' in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink to='/savannah' activeClassName='active' onClick={()=>dispatch(setHasDifficulty(true))}>
                <ListItem button>
                  <ListItemIcon>
                    <></>
                  </ListItemIcon>
                  <ListItemText primary="Саванна"/>
                </ListItem>
              </NavLink>
              <NavLink to='/audio' activeClassName='active' onClick={()=>dispatch(setHasDifficulty(true))}>
                <ListItem button>
                  <ListItemIcon>
                    <></>
                  </ListItemIcon>
                  <ListItemText primary="Аудиовызов"/>
                </ListItem>
              </NavLink>
              <NavLink to='/sprint' activeClassName='active' onClick={()=>dispatch(setHasDifficulty(true))}>
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
                  <ListItemText onClick={() => {
                    dispatch(clearWords());
                  }} primary="Memory Game"/>
                </ListItem>
              </NavLink>
            </List>
          </Collapse>
          <Divider/>
          <NavLink to="/statistics" activeClassName='active' isActive={noAuthActive}>
            <ListItem button>
              <ListItemIcon>
                <Equalizer style={{ color: "black" }}/>
              </ListItemIcon>
              <ListItemText primary="Статистика"/>
              {!isAuth && <Lock/>}
            </ListItem>
          </NavLink>
          {isAuth && <NavLink to='/' activeClassName='active__logout'>
            <ListItem button>
              <ListItemIcon>
                <ExitToApp style={{ color: "black" }}/>
              </ListItemIcon>
              <ListItemText primary="Выход" onClick={onLogOut} />
            </ListItem>
          </NavLink>}
          <ListItem className='avatar'>
            { isAuth && imageUrl ? <img src={imageUrl} alt="avatar"/> : <img src={user} alt="avatar"/>}
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};
