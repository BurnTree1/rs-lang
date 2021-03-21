import React from "react";
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
import { Link } from "react-router-dom";
import home from "../../assets/image/home.svg";
import book from "../../assets/image/book.svg";
import dictionary from "../../assets/image/dictionary.svg";
import statistic from "../../assets/image/statistic.svg";
import settings from "../../assets/image/setings.svg";
import './NavBar.css'

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
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    }
  })
);

export const NavBar = (props: any) => {
  const { open, menuOpen, handleClick, handleDrawerToggle } = props;
  const classes = useStyles();
  const theme = useTheme();

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
          <Link to='/'>
            <ListItem button>
              <ListItemIcon>
                <img src={home} alt="home"/>
              </ListItemIcon>
              <ListItemText primary="Главная"/>
            </ListItem>
          </Link>
          <Link to='/book'>
            <ListItem button>
              <ListItemIcon>
                <img src={book} alt="book"/>
              </ListItemIcon>
              <ListItemText primary="Учебник"/>
            </ListItem>
          </Link>
          <Link to='/dictionary'>
            <ListItem button>
              <ListItemIcon>
                <img src={dictionary} alt="dictionary"/>
              </ListItemIcon>
              <ListItemText primary="Словарь"/>
            </ListItem>
          </Link>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <></>
            </ListItemIcon>
            <ListItemText primary="Мини-игры"/>
            {open ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>
          <Collapse className='nested' in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to='/savannah'>
                <ListItem button>
                  <ListItemIcon>
                    <></>
                  </ListItemIcon>
                  <ListItemText primary="Саванна"/>
                </ListItem>
              </Link>
              <Link to='/audio'>
                <ListItem button>
                  <ListItemIcon>
                    <></>
                  </ListItemIcon>
                  <ListItemText primary="Аудиовызов"/>
                </ListItem>
              </Link>
              <Link to='/sprint'>
                <ListItem button>
                  <ListItemIcon>
                    <></>
                  </ListItemIcon>
                  <ListItemText primary="Спринт"/>
                </ListItem>
              </Link>
              <Link to='/my-game'>
                <ListItem button>
                  <ListItemIcon>
                    <></>
                  </ListItemIcon>
                  <ListItemText primary="Моя игра"/>
                </ListItem>
              </Link>
            </List>
          </Collapse>
          <Divider/>
          <Link to='/statistics'>
            <ListItem button>
              <ListItemIcon>
                <img src={statistic} alt="statistics"/>
              </ListItemIcon>
              <ListItemText primary="Статистика"/>
            </ListItem>
          </Link>
          <Link to='/settings'>
            <ListItem button>
              <ListItemIcon>
                <img src={settings} alt="settings"/>
              </ListItemIcon>
              <ListItemText primary="Настройки"/>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
};
