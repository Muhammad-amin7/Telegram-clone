import React from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';

const Avatar = ({ type = 'initials', value, color = 'bg-blue-500' }) => {
  if (type === 'image' && value) {
    return (
      <img
        className="w-12 h-12 rounded-full object-cover bg-gray-700"
        src={value}
        alt="User Avatar"
        loading="lazy"
      />
    );
  }

  const initials = typeof value === 'string' ? value.substring(0, 2).toUpperCase() : '??';
  return (
    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-xl font-semibold text-white`}>
      {initials}
    </div>
  );
};

export default function ChatSearchItem({ chat, isActive, onSelect, onAddFriend }) {
  const backgroundClass = isActive ? 'bg-tg-active-bg' : 'hover:bg-tg-hover-bg';
  console.log(chat);
  console.log('Salom');
  
  
  return (
    <li
      className={`flex items-center justify-between space-x-3 p-2 ${backgroundClass} cursor-pointer mx-1 rounded-lg`}
    >
      <div className="flex items-center space-x-3" onClick={() => onSelect(chat._id)}>
        <div className="flex-shrink-0">
          <Avatar type={chat.avatarType} value={chat.firstName} color={chat.avatarColor} />
        </div>
        <div className="flex-grow min-w-0">
          <div className="font-semibold text-white truncate">{chat.firstName}</div>
        </div>
      </div>

      {/* Right side - Add Friend Button */}
      <button
        onClick={() => onAddFriend(chat._id)}
        className="text-tg-accent hover:text-white text-xl p-1"
      >
        <AiOutlineUserAdd />
      </button>
    </li>
  );
}
