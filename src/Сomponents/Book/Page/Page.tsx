import React, { FC, useEffect, useMemo, useState } from "react";
import { get, map } from "lodash";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Common/WordItem/WordItem";
import SectionHandler from "../Common/SectionHandler";
import { userAggregateWords, fetchWords } from "../../../api";
import { initPage, setType } from "../../../store/reducers/book";
import { RootState } from "../../../store/store.models";
import { COUNT_SECTION_PAGES, PAGE_BOOK, urlPrefix } from "../../../helpers";
import Pagination from "../Common/PaginationComponent";
import { GamesSection } from "./GamesSection/GamesSection";
import styles from "./Page.module.scss";
import { Footer } from "../../Footer/Footer";
import { authIsAuthorized } from "../../../store/reducers/authorizationSlice";

const Page: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { sectionId, pageId = "1" } = useParams();

  const sectionIdInt = parseInt(sectionId, 10);
  const pageIdInt = parseInt(pageId, 10);
  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => get(state.book, [sectionId, pageId]));
  const isAuth = useSelector(authIsAuthorized);

  useEffect(() => {
    dispatch(setType(PAGE_BOOK));
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    console.log(`is ${isAuth}`);
    const getWords = isAuth ? userAggregateWords.getForBook : fetchWords.get;
    getWords(sectionIdInt - 1, pageIdInt - 1)
      .then(({ data }) => {
        // @ts-ignore
        dispatch(initPage({ sectionId, pageId, words: data }));
        setIsLoaded(true);
      })
      .catch(() => setIsLoaded(true));
  }, [isAuth, sectionId, pageId]);

  const cards = useMemo(() =>
      isLoaded ?
        // @ts-ignore
        map(words, word => <Card key={word.id} {...word}/>)
        : <CircularProgress/>
    , [words, isLoaded]
  );
  const pagination = useMemo(() =>
      <Pagination prefix={urlPrefix.book}
                  sectionId={sectionId}
                  pageId={pageId}
                  count={COUNT_SECTION_PAGES}/>,
    [sectionId, pageId]);

  return <div className={styles.page}>
    <SectionHandler prefix={urlPrefix.book}/>
    <GamesSection words={words} additionalFetching={true}/>
    {pagination}
    {cards}
    {pagination}
    <Footer/>
  </div>;
};

export default Page;

