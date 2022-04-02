import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import PrimaryButton from '../components/atoms/PrimaryButton';

/**
 * Contains the required props for a button to work
 */
type ButtonForTest = {
  text: string,
  action: Function
}

const buttons = generateButtons();

/**
 * Generates and return a list of button prop values
 * @return ButtonForTest[] A list of buttons
 */
function generateButtons(): ButtonForTest[] {
  const buttonsList = [];
  for (let numberOfButtons: number = 0; numberOfButtons < 10; numberOfButtons += 1) {
    const text = `Click me ${numberOfButtons} !`;
    buttonsList.push({
      text,
      action: jest.fn(),
    });
  }
  return buttonsList;
}

describe('Primary Button', () => {
  it('Display the good text', () => {
    const randomButtonIndex = Math.floor(Math.random() * (buttons.length - 1));
    const { action, text } = buttons[randomButtonIndex];
    const unexpectedButton = buttons[randomButtonIndex + 1] || buttons[randomButtonIndex - 1];

    render(<PrimaryButton action={action} text={text} />);

    // @ts-ignore
    expect(screen.queryByText(text)).toBeInTheDocument;
    expect(screen.queryByText(unexpectedButton.text)).not.toBeInTheDocument;
  });

  it('Should trigger the good action', () => {
    const randomButtonIndex = Math.floor(Math.random() * (buttons.length - 1));
    const { action, text } = buttons[randomButtonIndex];
    const { queryByText } = render(<PrimaryButton action={action} text={text} />);
    const primaryButton: HTMLElement = queryByText(text);
    fireEvent.click(primaryButton);

    expect(action).toHaveBeenCalledTimes(1);
    expect(action).not.toHaveBeenCalledTimes(2);
  });
});
