import React from 'react';
import moment, { Moment } from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Routes from '../../utils/routes';

library.add(faArrowLeft);

interface ConversationHeaderProps {
  usernames: string,
  lastMessageDate: string,
}

export default function ConversationHeader(props: ConversationHeaderProps) {
  const { usernames, lastMessageDate } = props;

  return (
    <div className="ConversationHeader">
      <span className="ConversationHeader__left-side">
        <Link href={`/${Routes.CONVERSATIONS}`}>
          <FontAwesomeIcon className="ConversationHeader__back-button" icon="arrow-left" />
        </Link>
        <span className="ConversationHeader__usernames">
          {usernames}
        </span>
      </span>
      <span className="ConversationHeader__lastMessageTime">
        Last message:
        {` ${formatedLastMessageDate()}`}
      </span>
    </div>
  );

  /**
   * Create a readable Last Message date with moment and return it
   */
  function formatedLastMessageDate() {
    const convertedLastMessageDate: Moment = moment.unix(parseInt(lastMessageDate, 10));
    const formatedDate: string = isToday() ? 'today' : convertedLastMessageDate.format('MMM D');
    const formatedTime: string = convertedLastMessageDate.format('hh:mm a');

    return `${formatedDate} at ${formatedTime}`;

    /**
     * Returns true if the lastMessageDate is today, else false
     */
    function isToday() {
      return moment().isSame(convertedLastMessageDate, 'd');
    }
  }
}
