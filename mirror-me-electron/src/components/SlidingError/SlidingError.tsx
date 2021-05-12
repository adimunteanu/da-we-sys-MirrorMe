import React, { FunctionComponent, useEffect, useState } from 'react';
import './SlidingError.scss';

interface Props {
  hidden: boolean;
  text: string;
}

const SlidingError: FunctionComponent<Props> = (props: Props) => {
  const { hidden, text } = props;
  const [wasOpened, setWasOpened] = useState(false);

  useEffect(() => {
    if (!wasOpened && !hidden) {
      setWasOpened(true);
    }
  }, [hidden, wasOpened]);

  const errorClasses = () => {
    const baseClass = 'SlidingError';

    if (wasOpened) {
      return `${baseClass} ${baseClass}${!hidden ? '--visible' : '--hidden'}`;
    }

    return baseClass;
  };

  const textClasses = () => {
    const baseClass = 'SlidingError__Text';

    if (wasOpened) {
      return `${baseClass}${!hidden ? '--visible' : '--hidden'}`;
    }

    return baseClass;
  };

  return (
    <div className={errorClasses()}>
      <div className={textClasses()}>{text}</div>
    </div>
  );
};

export default SlidingError;
