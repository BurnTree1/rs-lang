import React, { useEffect, useMemo, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { get, map } from "lodash";
import { urlPrefix, WORD_PER_PAGE } from "../../../../helpers";
import { userAggregateWords } from "../../../../api";
import Card from "../../Common/WordItem/WordItem";
import SectionHandler from "../../Common/SectionHandler";
import Pagination from "../../Common/PaginationComponent";

export const Difficult = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { sectionId, pageId = "1" } = useParams();

  const sectionIdInt = parseInt(sectionId, 10);
  const pageIdInt = parseInt(pageId, 10);

  const [words, setWords] = useState([]);
  const [pagesCount, setPagesCount] = useState(1);

  useEffect(() => {
    setIsLoaded(false);
    userAggregateWords.getForHard(sectionIdInt - 1, pageIdInt - 1)
      .then(({ data }) => {
        setWords(data[0].paginatedResults);
        const totalCount = get(data, [0, "totalCount", 0, "count"], 1)
        setPagesCount(Math.ceil(totalCount / WORD_PER_PAGE));
        setIsLoaded(true);
      })
      .catch(() => setIsLoaded(true));
  }, [sectionIdInt, pageIdInt]);

  const cards = useMemo(() =>
      isLoaded ?
        // @ts-ignore
        map(words, word => <Card key={word.id} {...word}/>)
        : <CircularProgress/>
    , [words, isLoaded]
  );

  const pagination = useMemo(() =>
    <Pagination prefix={urlPrefix.difficult}
                sectionId={sectionId}
                pageId={pageId}
                count={pagesCount}/>,
    [pagesCount, sectionId, pageId]);

  return (
    <div>
      <SectionHandler prefix={urlPrefix.difficult}/>
      <h3>Stud</h3>
      {pagination}
      {cards}
      {pagination}
    </div>
  );
};
