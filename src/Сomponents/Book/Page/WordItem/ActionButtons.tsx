import React, { FC } from "react";
import { IconButton } from "@material-ui/core";
import { BlockOutlined, ErrorOutlined } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { userWords } from "../../../../api";
import { setWord, deleteWord } from "../../../../store/reducers/book";

const ActionButtons: FC<{ id: string, isHard: boolean }> = ({ id, isHard }) => {
  const { sectionId, pageId = "1" } = useParams();
  const dispatch = useDispatch();

  const makeHard = () => {
    const param = { isHard: true }
    userWords.makeUserWord(id, param)
      .then(({ status }) => {
        if (status === 200)
          dispatch(setWord({ sectionId, pageId, id, param }));
      });
  };

  const makeDeleted = () => {
    const param = { isDeleted: true }
    userWords.makeUserWord(id, param)
      .then(({ status }) => {
        if (status === 200)
          dispatch(deleteWord({ sectionId, pageId, id }));
      });
  };

  return (
    <div>
      {isHard ? <b> (hard)</b> : null}
      <IconButton onClick={makeHard}>
        <ErrorOutlined/>
      </IconButton>
      <IconButton onClick={makeDeleted}>
        <BlockOutlined/>
      </IconButton>
    </div>
  );
};

export default ActionButtons;
