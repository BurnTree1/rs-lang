import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { get, map } from "lodash";
import { CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import SectionHandler from "../../Common/SectionHandler";
import { PAGE_DELETED, urlPrefix, WORD_PER_PAGE } from "../../../../helpers";
import { userAggregateWords } from "../../../../api";
import Card from "../../Common/WordItem/WordItem";
import Pagination from "../../Common/PaginationComponent";
import { GamesSection } from "../../Page/GamesSection/GamesSection";
import { setType } from "../../../../store/reducers/book";
import { Footer } from "../../../Footer/Footer";

export const Deleted = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const { sectionId, pageId = "1" } = useParams();

  const sectionIdInt = parseInt(sectionId, 10);
  const pageIdInt = parseInt(pageId, 10);

  const [words, setWords] = useState([]);
  const [pagesCount, setPagesCount] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setType(PAGE_DELETED))
  }, [])

  const fetchWords = () => {
    setIsLoaded(false);
    userAggregateWords.getForDeleted(sectionIdInt - 1, pageIdInt - 1)
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
      isLoaded ?
        // @ts-ignore
        map(words, word => <Card key={word.id} {...word} refresh={fetchWords}/>)
        : <CircularProgress/>
    , [words, isLoaded]
  );

  const pagination = useMemo(() =>
      <Pagination prefix={urlPrefix.deleted}
                  sectionId={sectionId}
                  pageId={pageId}
                  count={pagesCount}/>,
    [pagesCount, sectionId, pageId]);

  return (
    <div>
      <SectionHandler prefix={urlPrefix.deleted}/>
      <GamesSection words={words}/>
      {pagination}
      {cards}
      {pagination}
      <Footer/>
    </div>
  );
}
