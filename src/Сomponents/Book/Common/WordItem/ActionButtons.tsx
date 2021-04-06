import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IconButton, Tooltip } from "@material-ui/core";
import { BlockOutlined, ErrorOutlined, Reply } from "@material-ui/icons";
import { userWords } from "../../../../api";
import { setWord, deleteWord, pageType } from "../../../../store/reducers/book";
import styles from "./WordItem.module.scss";
import { PAGE_DELETED, PAGE_HARD, PAGE_STUDIED } from "../../../../helpers";
import { isNeedHardButton, isNeedDeleteButton } from "../../../../store/reducers/settings";

const ActionButtons: FC<{ id: string, isHard: boolean, refresh?: () => void }> = ({ id, isHard, refresh }) => {
  const { sectionId, pageId = "1" } = useParams();
  const dispatch = useDispatch();
  const typePage = useSelector(pageType);
  const isShowHard = useSelector(isNeedHardButton);
  const isShowDelete = useSelector(isNeedDeleteButton);

  const setParamsWithCallback = (params: object, callback?: () => void) => {
    userWords.makeUserWord(id, params)
      .then(({ status }) => {
        if (status === 200 && callback)
          callback();
      });
  };

  const makeHard = () => {
    const params = { isHard: true };
    const callback = () => dispatch(setWord({ sectionId, pageId, id, params }));
    setParamsWithCallback(params, callback);
  };

  const makeDeleted = () => {
    const params = { isDeleted: true };
    const callback = () => dispatch(deleteWord({ sectionId, pageId, id }));
    setParamsWithCallback(params, callback);
  };

  const revertHard = () => {
    const params = { isStudied: true };
    setParamsWithCallback(params, refresh);
  };

  const revertDeleted = () => {
    const params = {};
    setParamsWithCallback(params, refresh);
  };

  const hardMark = <b className={styles.actions__difficult}>Сложное</b>;

  const hardButton = isShowHard ? <Tooltip key="hard" title="Пометить как 'сложное'">
    <IconButton onClick={makeHard} color="primary">
      <ErrorOutlined/>
    </IconButton>
  </Tooltip> : null;

  const deleteButton = isShowDelete ? <Tooltip key="delete" title="Удалить слово">
    <IconButton onClick={makeDeleted} color="secondary">
      <BlockOutlined/>
    </IconButton>
  </Tooltip> : null;

  switch (typePage) {
    case PAGE_HARD:
      return <div className={styles.actions}>
        <Tooltip title="Снять отметку 'сложное'">
          <IconButton onClick={revertHard}>
            <Reply/>
          </IconButton>
        </Tooltip>
      </div>;
    case PAGE_DELETED:
      return <div className={styles.actions}>
        <Tooltip title="Востанновить слово">
          <IconButton onClick={revertDeleted}>
            <Reply/>
          </IconButton>
        </Tooltip>
      </div>;
    case PAGE_STUDIED:
      return <></>;
    default:
      return <div className={styles.actions}>
        {isHard ? hardMark : hardButton}
        {deleteButton}
      </div>;
  }
};

export default ActionButtons;
