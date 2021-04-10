import React, { useEffect, useMemo, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { get, map } from "lodash";
import { useDispatch } from "react-redux";
import { PAGE_HARD, urlPrefix, WORD_PER_PAGE } from "../../../../helpers";
import { userAggregateWords } from "../../../../api";
import Card from "../../Common/WordItem/WordItem";
import SectionHandler from "../../Common/SectionHandler";
import Pagination from "../../Common/PaginationComponent";
import { setType } from "../../../../store/reducers/book";
import { GamesSection } from "../../Page/GamesSection/GamesSection";
import { Footer } from "../../../Footer/Footer";
import { rebaseWordId } from "../../../../helpers/words.helper";
import styles from '../../Page/Page.module.scss'
import book_style from "../../Book.module.scss";

export const Difficult = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { sectionId, pageId = "1" } = useParams();

  const sectionIdInt = parseInt(sectionId, 10);
  const pageIdInt = parseInt(pageId, 10);

  const [words, setWords] = useState([]);
  const [pagesCount, setPagesCount] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setType(PAGE_HARD));
  }, []);

  const fetchWords = () => {
    setIsLoaded(false);
    userAggregateWords.getForHard(sectionIdInt - 1, pageIdInt - 1)
      .then(({ data }) => {
        setWords(data[0].paginatedResults);
        const totalCount = get(data, [0, "totalCount", 0, "count"], 1)
        setPagesCount(Math.ceil(totalCount / WORD_PER_PAGE));
        setIsLoaded(true);
      })
      .catch(() => setIsLoaded(true));
  }

  useEffect(() => {
    fetchWords()
  }, [sectionIdInt, pageIdInt]);

  const cards = useMemo(() =>
      map(words, word => {
        const newWord = rebaseWordId(word);
        // @ts-ignore
        return <Card key={newWord.id} {...newWord} refresh={fetchWords}/>;
      })
    , [words, isLoaded]
  );

  const pagination = useMemo(() =>
      <Pagination prefix={urlPrefix.difficult}
                  sectionId={sectionId}
                  pageId={pageId}
                  count={pagesCount}/>,
    [pagesCount, sectionId, pageId]);

  return (
    <div className={styles.page}>
      <SectionHandler prefix={urlPrefix.difficult}/>
      <GamesSection words={words} additionalFetching={false} disabled/>
      {pagination}
      <div className={book_style.words_container}>
        {isLoaded ? cards : <CircularProgress className={book_style.spinner} size={80}/>}
      </div>
      {isLoaded && pagination}
      <Footer/>
    </div>
  );
};
