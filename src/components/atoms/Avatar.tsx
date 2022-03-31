import React from 'react';

interface AvatarProps {
  username: string
}

export default function Avatar({ username }: AvatarProps) {
  return (
    <div className="Avatar">
      <div className="Avatar__container">
        <span className="Avatar__content">
          {avatarFromUsername()}
        </span>
      </div>
    </div>
  );

  /**
   * Returns the first letter of the username
   * to display it instead of the avatar image
   * The character is set to uppercase
   */
  function avatarFromUsername() {
    return username.charAt(0).toUpperCase();
  }
}
