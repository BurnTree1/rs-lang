import React, { FC } from "react";
import map from "lodash/map";
import { Link } from "react-router-dom";
import { bookBuilder, bookSections } from "../../helpers";

export default () => (<div>
    {map(bookSections, ({ name, id }) => <SectionItem key={id} id={id} name={name}/>)}
  </div>)

const SectionItem: FC<{id: number, name: string}> = ({ id, name }) => (
  <Link to={bookBuilder(id)}>
    <div>{name}</div>
  </Link>
);
