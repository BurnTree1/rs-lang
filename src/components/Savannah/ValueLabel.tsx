import { Tooltip } from '@material-ui/core';
import React, { useState } from 'react';

type Props = {
  children: React.ReactElement;
  open: boolean;
  value: number;
};

const ValueLabel: React.FC<Props> = ({ children, open, value }) => {
  const [tooltips] = useState(['Начальный', 'Легкий', 'Средний', 'Сложный', 'Великий', 'Невероятный']);

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={tooltips[value]}>
      {children}
    </Tooltip>
  );
};

export default ValueLabel;
