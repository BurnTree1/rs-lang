import React from "react";
import { IGameSettings } from "../../my-game.models";
import SettingsModal from "../SettingsModal/SettingsModal";

interface IProps {
  setSettings(event: IGameSettings): void;
  setGameView(): void;
}

export const Settings = (props: IProps) => {
  const setSettings = (event: any) => {
    props.setSettings(event);
  };
  const setGameView = () => {
    props.setGameView();
  };
  return (
    <div style={{ position: 'relative' }}>
      <SettingsModal setSettings={setSettings} setGameStatus={setGameView} />
    </div>
  );
};