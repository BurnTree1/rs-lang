import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import { blue } from '@material-ui/core/colors'; // @ts-ignore
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import styles from './StartScreen.module.scss';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

export const StartScreen = () => {
  const { url } = useRouteMatch();
  const history = useHistory();

  const startGameHandler = () => {
    history.push(`${url}/settings`);
  };
  return (
    <section className={styles.startScreen}>
      <div className={styles.startScreen__inner}>
        <div className={styles.startScreen__logo} />
        <h2 className={styles.startScreen__title}>MEMORY GAME</h2>
        <div className={styles.startScreen__description}>
          <p className={styles.startScreen__text}>
            Тренировка Memory game развивает память. 
          Чем меньше попыток ты сделаешь, тем больше бонуса получаешь.
          </p>
          <div className={styles.startScreen__filter} />
        </div>
        <div className={styles.startScreen__controls}>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary" onClick={startGameHandler}>
              Начать
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </section>
  );
}