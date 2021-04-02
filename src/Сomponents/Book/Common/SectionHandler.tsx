import React, { FC } from "react";
import { head, last } from "lodash";
import { Link, useParams } from "react-router-dom";
import { bookSections, urlBuilder } from "../../../helpers";

const SectionHandler: FC<{prefix: string}> = ({ prefix }) => {
  const { sectionId } = useParams();
  const sectionInt = parseInt(sectionId, 10);

  // @ts-ignore
  const leftLink = head(bookSections).id !== sectionInt ?
    <Link to={urlBuilder(prefix, sectionInt - 1)}>
      (left)
    </Link> : null;

  // @ts-ignore
  const rightLink = last(bookSections).id !== sectionInt ?
    <Link to={urlBuilder(prefix, sectionInt + 1)}>
      (right)
    </Link> : null;

  return <div>
    {leftLink}
    Handler
    {rightLink}
  </div>;
};

export default SectionHandler;
