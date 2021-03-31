import React, { FC, useEffect, useMemo, useState } from "react";
import { get, map, head } from "lodash";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Card from "./WordItem/WordItem";
import SectionHandler from "../Common/SectionHandler";
import { userAggregateWords } from "../../../api";
import { initPage } from "../../../store/reducers/book";
import { RootState } from "../../../store/store.models";
import { COUNT_SECTION_PAGES, urlPrefix } from "../../../helpers";
import Pagination from "../Common/PaginationComponent";
import { GamesSection } from "./GamesSection/GamesSection";

const Page: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { sectionId, pageId = "1" } = useParams();

  const sectionIdInt = parseInt(sectionId, 10);
  const pageIdInt = parseInt(pageId, 10);
  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => get(state.book, [sectionId, pageId]));
  useEffect(() => {
    if (!words) {
      setIsLoaded(false);
      userAggregateWords.getForBook(sectionIdInt - 1, pageIdInt - 1)
        .then(({ data }) => {
          // @ts-ignore
          dispatch(initPage({ sectionId, pageId, words: head(data).paginatedResults }));
          setIsLoaded(true);
        })
        .catch(() => setIsLoaded(true));
    }
  }, [words]);

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

  return <div>
    <SectionHandler prefix={urlPrefix.book}/>
    <h3>Page</h3>
    {pagination}
    <GamesSection/>
    {cards}
    {pagination}
  </div>;
};

export default Page;

