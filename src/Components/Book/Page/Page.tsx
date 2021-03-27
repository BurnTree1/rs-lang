import React, { useEffect, useMemo, useState } from "react";
import map from "lodash/map";
import { useParams, Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";
import Card from "./CardItem";
import SectionHandler from "./SectionHandler";
import { bookBuilder, COUNT_SECTION_PAGES } from "../../../helpers";
import { wordsApi } from "../../../api";

export default () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [words, setWords] = useState([]);
  const { sectionId } = useParams();
  const { pageId = "1" } = useParams();

  useEffect(() => {
    setIsLoaded(false);
    wordsApi.get(parseInt(sectionId, 10) - 1, parseInt(pageId, 10) - 1)
      .then(({ data }) => {
        setWords(data);
        setIsLoaded(true);
      })
      .catch(() => setIsLoaded(true));
  }, [sectionId, pageId]);

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
    />, [pageId])

  return <div>
    <SectionHandler/>
    <h3>Page</h3>
    {pagination}
    {cards}
    {pagination}
  </div>;
}

