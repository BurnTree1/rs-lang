import React, { FC } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { urlBuilder } from "../../../helpers";

type PaginationType = {
  prefix: string,
  sectionId: string,
  pageId: string,
  count: number
}

const PaginationComponent: FC<PaginationType> = ({ prefix, sectionId, pageId, count }) =>
  (<Pagination page={parseInt(pageId, 10)}
               count={count}
               renderItem={(item) => (
                 <PaginationItem
                   component={Link}
                   to={urlBuilder(prefix, sectionId, item.page)}
                   {...item}
                 />
               )}/>);

export default PaginationComponent;
