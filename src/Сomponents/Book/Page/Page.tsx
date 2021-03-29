import React, { FC, useEffect, useMemo, useState } from "react";
import { get, map, head } from "lodash";
import { useParams, Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Card from "./WordItem/WordItem";
import SectionHandler from "./SectionHandler";
import { bookBuilder, COUNT_SECTION_PAGES } from "../../../helpers";
import { userAggregateWords } from "../../../api";
import { initPage } from "../../../store/reducers/book";
import { RootState } from "../../../store/store.models";

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
      userAggregateWords.get(sectionIdInt - 1, pageIdInt - 1)
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

  const pagination =
    useMemo(() => <Pagination page={parseInt(pageId, 10)}
                              count={COUNT_SECTION_PAGES}
                              renderItem={(item) => (
                                <PaginationItem
                                  component={Link}
                                  to={bookBuilder(sectionId, item.page)}
                                  {...item}
                                />
                              )}
    />, [pageId]);

  return <div>
    <SectionHandler/>
    <h3>Page</h3>
    {pagination}
    {cards}
    {pagination}
  </div>;
};

export default Page;

