import React from 'react';
import classnames from 'classnames';

type PrimaryButtonProps = {
  text: string,
  action: Function,
  className?: string,
}

export default function PrimaryButton(props: PrimaryButtonProps) {
  const { className, text, action } = props;

  const primaryButtonClassNames = classnames('PrimaryButton', className);

  return (
    <button
      className={primaryButtonClassNames}
      // @ts-ignore
      onClick={action}
      type="button"
    >
      {text}
    </button>
  );
}
