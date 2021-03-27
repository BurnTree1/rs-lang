import React, { FC } from "react";
import map from "lodash/map";
import { Link } from "react-router-dom";
import { bookBuilder, bookSections } from "../../helpers";

export default () => (<div>
    {map(bookSections, (value, key) => <SectionItem num={key} name={value}/>)}
  </div>)

const SectionItem: FC<any> = ({ num, name }) => (
  <Link to={bookBuilder(num)}>
    <div>{name}</div>
  </Link>
);
