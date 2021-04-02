import React, { FC, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Switch,
  FormControlLabel
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { useDispatch, useSelector } from "react-redux";
import { settingsMap } from "../../../../helpers";
import { settingsApi } from "../../../../api/settings";
import { currentSettings, setSettings } from "../../../../store/reducers/settings";

const Settings: FC = () => {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState({});
  const currentParams = useSelector(currentSettings);
  const dispatch = useDispatch();

  const onOpen = () => {
    settingsApi.get()
      .then(({ data: { optional } }) => {
        setParams({ ...currentParams, ...optional });
        setOpen(true);
      })
      .catch(() => setParams(currentParams));
  };

  const onClose = () => setOpen(false);

  const setParamsById = (id: string, value: boolean) => setParams({ ...params, [id]: value });

  const sendSettings = () =>
    settingsApi.set(params)
      .then(() => {
        dispatch(setSettings(params));
        onClose();
      });

  return (<div>
      <IconButton onClick={onOpen}>
        <SettingsIcon/>
      </IconButton>
      <Dialog open={open} onClose={onClose} maxWidth="xs">
        <DialogTitle>Настройки</DialogTitle>
        <DialogContent>
          {settingsMap.map(({ id, text }) =>
            // @ts-ignore
            <SettingLabel key={id} id={id} value={params[id]} text={text} setValue={setParamsById}/>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={sendSettings} variant="contained" color="primary">Ок</Button>
          <Button onClick={onClose} variant="contained">Отмена</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

type LabelType = {
  id: string,
  value: boolean,
  text: string,
  setValue: (id: string, e: boolean) => void
}

const SettingLabel: FC<LabelType> = ({ id, value, text, setValue }) => (
  <FormControlLabel
    control={<Switch checked={value} onChange={(e, checked) => setValue(id, checked)} color="primary"/>}
    label={text}
  />
);

export default Settings;
