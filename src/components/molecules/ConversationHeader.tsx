import React from 'react';
import moment from 'moment';

interface ConversationHeaderProps {
  usernames: string,
  lastMessageDate: string,
}

export default function ConversationHeader(props: ConversationHeaderProps) {
  const { usernames, lastMessageDate } = props;

  return (
    <div className="ConversationHeader">
      <span className="ConversationHeader__usernames">
        {usernames}
      </span>
      <span>
        Last message
        {formatedLastMessageDate()}
      </span>
    </div>
  );

  /**
   * Create a readable Last Message date with moment and return it
   */
  function formatedLastMessageDate() {
    const formatedDate = isToday() ? 'today' : moment(lastMessageDate).day();

    return moment(formatedDate).format();

    /**
     * Returns true if the lastMessageDate is today, else false
     */
    function isToday() {
      const todayDate = moment().endOf('day');
      const yesterdayDate = moment().startOf('day');

      return todayDate < moment(lastMessageDate) && yesterdayDate > moment(lastMessageDate);
    }
  }
}
