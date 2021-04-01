import React from "react";
import SettingsView from "../../../../Views/SettingsView/SettingsView";
import { IGameSettings } from "../../my-game.models";

interface IProps {
  setSettings(event: IGameSettings): void;
  setGameView(): void;
}

export const Settings = (props: IProps) => {
  const setSettings = (event: any) => {
    console.log('setSettings', event);
    props.setSettings(event);
  };
  const setGameView = () => {
    props.setGameView();
  };
  return (
    <div style={{ position: 'relative' }}>
      <SettingsView setSettings={setSettings} setGameStatus={setGameView} />
    </div>
  );
};