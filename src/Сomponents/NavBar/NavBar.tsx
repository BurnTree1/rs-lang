import React, { FC, useState } from "react";
import { useSelector } from 'react-redux';
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
import { NavLink } from "react-router-dom";
import home from "../../assets/image/home.svg";
import book from "../../assets/image/book.svg";
import dictionary from "../../assets/image/dictionary.svg";
import statistic from "../../assets/image/statistic.svg";
import settings from "../../assets/image/setings.svg";
import './NavBar.css'
import { urlBuilder, urlPrefix } from "../../helpers";
import { authImageSelector } from '../../store/reducers/authorizationSlice';

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
                <img src={home} alt="home"/>
              </ListItemIcon>
              <ListItemText primary="Главная"/>
            </ListItem>
          </NavLink>
          <NavLink to='/book' activeClassName='active'>
            <ListItem button>
              <ListItemIcon>
                <img src={book} alt="book"/>
              </ListItemIcon>
              <ListItemText primary="Учебник"/>
            </ListItem>
          </NavLink>
            <ListItem button onClick={handleDictionaryClick}>
              <ListItemIcon>
                <img src={dictionary} alt="dictionary"/>
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
              <></>
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
                  <ListItemText primary="Моя игра"/>
                </ListItem>
              </NavLink>
            </List>
          </Collapse>
          <Divider/>
          <NavLink to='/statistics' activeClassName='active'>
            <ListItem button>
              <ListItemIcon>
                <img src={statistic} alt="statistics"/>
              </ListItemIcon>
              <ListItemText primary="Статистика"/>
            </ListItem>
          </NavLink>
          <NavLink to='/settings' activeClassName='active'>
            <ListItem button>
              <ListItemIcon>
                <img src={settings} alt="settings"/>
              </ListItemIcon>
              <ListItemText primary="Настройки"/>
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
