import React, { FC } from "react";
import { List, ListItem } from "@material-ui/core";
import { Done } from "@material-ui/icons";
import styles from "./Team.module.scss";
import { TeamType, team } from "../../../helpers";

export const Team = () => (
  <div className={styles.team}>
    <h2 className={styles.title}>Наша команда</h2>
    <div className={styles.team__inner}>
      {team.map(member => <TeamItem key={member.role} {...member}/>)}
    </div>
  </div>
);

const TeamItem: FC<TeamType> = ({ link, role, image, dev }) => (
  <div className={styles.team__item}>
    <a className={styles.photo} href={link}>
      <img src={image} alt="avatar" className={styles.photo__img}/>
    </a>
    <div className={styles.text}>{role}</div>
    <List>
      {dev.map(about => <ListItem key={about}><Done/>{about}</ListItem>)}
    </List>
  </div>);
