import React, { FC, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Switch, FormControlLabel } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { settingsMap } from "../../../../helpers";

const Settings: FC = () => {
  const [open, setOpen] = useState(false);

  const [translate, setTranslate] = useState(false);
  const [meaning, setMeaning] = useState(false);
  const [hard, setHard] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const onClose = () => {
    setOpen(false)
  };
  const onOpen = () => {
    setOpen(true)
  };

  const sendSettings = () => {

  }

  return (<div>
      <IconButton onClick={onOpen}>
        <SettingsIcon/>
      </IconButton>
      <Dialog open={open} onClose={onClose} maxWidth="xs">
        <DialogTitle>Настройки</DialogTitle>
        <DialogContent>
          <FormControlLabel
            key={settingsMap.translate.id}
            control={<Switch checked={translate} onChange={(e, checked) => setTranslate(checked)} color="primary"/>}
            label={settingsMap.translate.text}
          />
          <FormControlLabel
            key={settingsMap.meaningTranslate.id}
            control={<Switch checked={meaning} onChange={(e, checked) => setMeaning(checked)} color="primary"/>}
            label={settingsMap.meaningTranslate.text}
          />
          <FormControlLabel
            key={settingsMap.hardButton.id}
            control={<Switch checked={hard} onChange={(e, checked) => setHard(checked)} color="primary"/>}
            label={settingsMap.hardButton.text}
          />
          <FormControlLabel
            key={settingsMap.deleteButton.id}
            control={<Switch checked={deleting} onChange={(e, checked) => setDeleting(checked)} color="primary"/>}
            label={settingsMap.deleteButton.text}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={sendSettings} variant="contained" color="primary">Ок</Button>
          <Button onClick={onClose} variant="contained">Отмена</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Settings;
