import React from "react";
import { head, last } from "lodash";
import { Link, useParams } from "react-router-dom";
import { bookBuilder, bookSections } from "../../../helpers";

export default () => {
  const { sectionId } = useParams();
  const sectionInt = parseInt(sectionId, 10);

  // @ts-ignore
  const leftLink = head(bookSections).id !== sectionInt ?
    <Link to={bookBuilder(sectionInt - 1)}>
      (left)
    </Link> : null;

  // @ts-ignore
  const rightLink = last(bookSections).id !== sectionInt ?
    <Link to={bookBuilder(sectionInt + 1)}>
      (right)
    </Link> : null;

  return <div>
    {leftLink}
    Handler
    {rightLink}
  </div>;
};
