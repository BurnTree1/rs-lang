import React, { useEffect } from "react";
import _ from "lodash";
import shortid from "shortid";
import { useSelector } from "react-redux";
import styles from "../Savannah/Savannah.module.scss";
import { WordsType, WordType } from "../Savannah/types";
import WrongAnswerList from "../Savannah/WrongAnswerList";
import { userWords } from "../../api";
import { authIsAuthorized } from "../../store/reducers/authorizationSlice";

type Props = {
  wrongAnswers: WordsType;
  rightAnswers: WordsType;
  submit?(): void;
};

const EndGameModal: React.FC<Props> = ({ wrongAnswers, rightAnswers, submit }) => {
  const isAuth = useSelector(authIsAuthorized);
  const submitHandler = () => {
    if (submit) {
      submit();
    }
  };

  const sendResult = (word: WordType, name: string) => {
    const optional = _.get(word, ["userWord", "optional"], {});
    if (!optional.isDeleted) {
      const field = (optional[name] || 0) + 1;
      const param = { date: new Date().toDateString(), ...optional, [name]: field };
      // eslint-disable-next-line no-underscore-dangle
      userWords.makeUserWord(word.id || word._id, param);
    }
  };

  useEffect(() => {
    if(isAuth) {
      rightAnswers.forEach((word) => sendResult(word, "correct"));
      wrongAnswers.forEach((word) => sendResult(word, "wrong"));
    }
  }, []);

  return (
    <div className={styles.endModalContainer}>
      <div className={styles.endModalContent}>
        {wrongAnswers.length ? <p>Неплохо, но есть над чем поработать</p> : <p>Поздравляем, отличный результат!</p>}
        <div className={styles.endModalResultContainer}>
          <div className={styles.endModalWordsContainer}>
            {wrongAnswers.length ? (
              <>
                <span style={{ color: "#E10050" }}>ОШИБОК: {wrongAnswers.length}</span>
                {wrongAnswers.map((word) => (
                  <WrongAnswerList word={word} key={shortid()}/>
                ))}
              </>
            ) : null}
            {rightAnswers.length ? (
              <>
                <span
                  style={{
                    color: "#4CAF50",
                    paddingRight: 285
                  }}
                >
                  ЗНАЮ: {rightAnswers.length}
                </span>
                {rightAnswers.map((word) => (
                  <WrongAnswerList word={word} key={shortid()}/>
                ))}
              </>
            ) : null}
          </div>
        </div>
        <button type="button" className={styles.endModalButton} onClick={submitHandler}>
          Продолжить тренировку
        </button>
      </div>
    </div>
  );
};
export default EndGameModal;
