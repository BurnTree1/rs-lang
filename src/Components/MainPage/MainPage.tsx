import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import { NavBar } from "../NavBar/NavBar";
import { Header } from "../Header/Header";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      marginLeft: '-40px',
      paddingTop: '65px',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),

    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: '65px',
    },
  })
);

export function MainPage(props: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={classes.root}>
      <Header handleDrawerToggle={handleDrawerToggle} menuOpen={menuOpen}/>
      <NavBar open={open} handleClick={handleClick} handleDrawerToggle={handleDrawerToggle} menuOpen={menuOpen}/>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: menuOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
}
