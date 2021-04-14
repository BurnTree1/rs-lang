import React, { FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@material-ui/core";
import item1 from "../../../../assets/image/game-item1.svg";
import item2 from "../../../../assets/image/game-item2.svg";
import item3 from "../../../../assets/image/game-item3.svg";
import item4 from "../../../../assets/image/game-item4.svg";
import styles from "./GamesSection.module.scss";
import { fetchWithAdditional, setHasDifficulty, setSprintWords } from "../../../../store/reducers/sprintSlice";
import { fetchAudioWithAdditional, setAudioWords, setHasAudioDifficulty } from "../../../../store/reducers/audioSlice";
import { setMemoryGameWords } from "../../../../store/reducers/memoryGameSlice";
import Settings from "../Setting/Settings";
import { bookSections, PAGE_BOOK } from "../../../../helpers";
import { authIsAuthorized } from "../../../../store/reducers/authorizationSlice";
import { useRandomPage } from "../../../../helpers/hooks";
import { pageType } from "../../../../store/reducers/book";

const gamesLink = [
  {
    id: 1,
    name: "Саванна",
    image: item1,
    link: "/savannah"
  },
  {
    id: 2,
    name: "Спринт",
    image: item2,
    link: "/sprint"
  },
  {
    id: 3,
    name: "Аудиовызов",
    image: item3,
    link: "/audio"
  },
  {
    id: 4,
    name: "Memory Game",
    image: item4,
    link: "/my-game"
  }
];

type PropsType = {
  words: object
  additionalFetching?: boolean,
  disabled?: boolean
}

export const GamesSection: FC<PropsType> = ({ words = {}, additionalFetching }) => {
  const { sectionId } = useParams();
  const randomPage = useRandomPage();
  const [level, image] = [bookSections[sectionId - 1].name, bookSections[sectionId - 1].image];
  const isAuth = useSelector(authIsAuthorized);
  const type = useSelector(pageType);
  const dispatch = useDispatch();

  useEffect(() => {
    if (words && Object.keys(words).length < 4) {
      if (additionalFetching) {
        dispatch(fetchWithAdditional(sectionId, randomPage, words));
        dispatch(fetchAudioWithAdditional(sectionId, randomPage, words));
      }
      dispatch(setHasDifficulty(false));
      dispatch(setHasAudioDifficulty(false));
    }
  }, [words]);
  const onWordsSet = () => {
    setTimeout(() => {
      if (Object.keys(words).length >= 4 || !additionalFetching) {
        dispatch(setSprintWords(words));
        dispatch(setAudioWords(words));
        dispatch(setMemoryGameWords(words));
      }
    }, 0);
  };
  return (
    <div className={styles.games}>
      <div className={styles.games__content}>
        <div className={styles.level}>
          <span>{level} Уровень</span>
          <img src={image} alt="planets" className={styles.games__icon}/>
        </div>
        <h2 className={styles.title}>Попробуй эту страницу с игрой:</h2>
        <div className={styles.games__inner}>
          {gamesLink.map((item) =>
            <GameRow key={item.id} info={item} preLinkLogic={onWordsSet} disabled={Object.keys(words).length === 0}/>
          )}
          <div className={styles.settings}>
            {(isAuth && type === PAGE_BOOK) && <Settings/>}
          </div>
        </div>
      </div>
    </div>
  );
};

const GameRow: FC<any> = ({ info, preLinkLogic, disabled }) =>
  <div className={styles.games__item}>
    <img src={info.image} alt="my game" className={styles.item__img}/>
    {disabled ? <Tooltip title="Нет слов для игр"><span>{info.name}</ span></Tooltip>
      : <Link onClick={preLinkLogic} to={info.link}>{info.name}</Link>}
  </div>;
