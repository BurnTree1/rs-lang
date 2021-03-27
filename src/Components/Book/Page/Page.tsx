import React, { useEffect, useMemo, useState } from "react";
import map from "lodash/map";
import { useParams, Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { wordsApi } from "../../../api";
import Card from "./CardItem";
import { bookBuilder, COUNT_SECTION_PAGES } from "../../../helpers";

export default () => {
  const [words, setWords] = useState([]);
  const { sectionId } = useParams();
  const { pageId = "1" } = useParams();

  useEffect(() => {
    wordsApi.get(sectionId, parseInt(pageId, 10) - 1)
      .then(({ data }) => {
        setWords(data);
      });
  }, [sectionId, pageId]);

  const cards = useMemo(() => map(words, ({ id, word }) => <Card key={id} name={word}/>), [words]);

  return <div>
    Page
    {cards}
    {cards}
    <Pagination page={parseInt(pageId, 10)}
                count={COUNT_SECTION_PAGES}
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={bookBuilder(sectionId, item.page)}
                    {...item}
                  />
                )}
    />
  </div>;
}

