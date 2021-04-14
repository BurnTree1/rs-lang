import { IconButton } from "@material-ui/core";
import { VolumeUp } from "@material-ui/icons";
import React from "react";
import './styles.scss';

export const VolumeControl = (props: { volumeIsOn: boolean, handler(): void }) => (
  <span className={`game-volume-control ${props.volumeIsOn ? '' : 'game-volume-control_mute'}`}>
    <IconButton color="primary" onClick={props.handler} component="span">
      <VolumeUp />
    </IconButton>
  </span>
);
