import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { get, map } from "lodash";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { PAGE_STUDIED, urlPrefix, WORD_PER_PAGE } from "../../../../helpers";
import { userAggregateWords } from "../../../../api";
import SectionHandler from "../../Common/SectionHandler";
import Pagination from "../../Common/PaginationComponent";
import Card from "../../Common/WordItem/WordItem";
import { setType } from "../../../../store/reducers/book";
import { StudiedStatistics } from "./StudiedStatistics";
import { Footer } from "../../../Footer/Footer";
import { rebaseWordId } from "../../../../helpers/words.helper";
import styles from '../../Page/Page.module.scss'
import book_style from "../../Book.module.scss";
import { authIsAuthorized } from "../../../../store/reducers/authorizationSlice";
import Auth from "../../../Auth/Auth";

export const Studied = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { sectionId, pageId = "1" } = useParams();

  const sectionIdInt = parseInt(sectionId, 10);
  const pageIdInt = parseInt(pageId, 10);

  const [words, setWords] = useState([])
  const [pagesCount, setPagesCount] = useState(1)

  const dispatch = useDispatch();
  const isAuth = useSelector(authIsAuthorized)

  useEffect(() => {
    dispatch(setType(PAGE_STUDIED))
  }, [])

  const fetchWords = () => {
    setIsLoaded(false);
    userAggregateWords.getForStudied(sectionIdInt - 1, pageIdInt - 1)
      .then(({ data }) => {
        setWords(data[0].paginatedResults)
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
          const newWord = rebaseWordId(word)
          // @ts-ignore
          return <Card key={newWord.id} {...newWord} refresh={fetchWords}/>
        })
    , [words, isLoaded]
  );

  const pagination = useMemo(() =>
      <Pagination prefix={urlPrefix.studied}
                  sectionId={sectionId}
                  pageId={pageId}
                  count={pagesCount}/>,
    [pagesCount, sectionId, pageId]);

  if(!isAuth)
    return <Auth/>

  return (
    <div className={styles.page}>
      <SectionHandler prefix={urlPrefix.studied}/>
      <StudiedStatistics words={words}/>
      {pagination}
      <div className={book_style.words_container}>
        {isLoaded ? cards : <CircularProgress className={book_style.spinner} size={80}/>}
      </div>
      {isLoaded && pagination}
      <Footer/>
    </div>
  );
};
