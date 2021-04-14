import React, { ReactNode, useCallback, useEffect, FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { NavBar } from "../NavBar/NavBar";
import { Header } from "../Header/Header";
import "./AppWrapper.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      minHeight: '1px',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end"
    },
    content: {
      flexGrow: 1,
      marginLeft: "-40px",
      paddingTop: "65px",
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      [theme.breakpoints.down(1280)]: {
        marginLeft: '0',
      },
      [theme.breakpoints.down(960)]: {
        paddingTop: '50px',
      },
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: "65px",
      [theme.breakpoints.down(1280)]: {
        marginLeft: '0',
    filter: 'blur(5px)',
    pointerEvents: 'none',
      },
    },
  })
);

type PropsType = {
  children: ReactNode
}
export const AppWrapper: FC<PropsType> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(true);
  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1280) {
      setMenuOpen(false);
    }
  }, []);

  const handleClick = useCallback(() => {
    setOpen(!open);
  }, [open]);
  const handleDrawerToggle = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  return (
    <div className={classes.root}>
      <Header handleDrawerToggle={handleDrawerToggle} menuOpen={menuOpen}/>
      <NavBar open={open} handleClick={handleClick} handleDrawerToggle={handleDrawerToggle} menuOpen={menuOpen}/>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: menuOpen,
        })}
      >
        <div className={classes.drawerHeader}/>
        {props.children}
      </main>
    </div>
  );
};
