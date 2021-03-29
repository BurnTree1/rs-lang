import React from "react";
import SettingsView from "../../../Views/SettingsView/SettingsView";

interface IProps {
  setSettings(): void;
  setGameView(): void;
}

export const Settings = (props: IProps) => {
  const setSettings = (event: any) => {
    console.log('setSettings', event);
    props.setSettings();
  };
  const setGameView = (event: any) => {
    console.log('setGameView', event);
    props.setGameView();
  };
  return (
    <div style={{ position: 'relative' }}>
      <SettingsView setSettings={setSettings} setGameStatus={setGameView} />
    </div>
  );
};