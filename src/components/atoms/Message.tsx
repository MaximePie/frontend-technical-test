import React from 'react';
import classnames from 'classnames';
import { Message as MessageType } from '../../types/message';

type MessageProps = {
  message: MessageType
  contactUsername: string
  isSentByUser: boolean
}

export default function Message({ message, contactUsername, isSentByUser }: MessageProps) {
  const {
    body,
    timestamp,
  } = message;

  const messageClassnames = classnames(
    'Message',
    { 'Message__from-logged-user': isSentByUser },
  );

  return (
    <div className={messageClassnames}>
      {!isSentByUser && <span className="Message__contact">{contactUsername}</span>}
      <div className="Message__body-container">
        <p className="Message__body">
          {body}
        </p>
      </div>
    </div>
  );
}
