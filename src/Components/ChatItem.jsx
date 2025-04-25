// src/components/ChatItem.jsx
import React from 'react';

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

export default function ChatItem({ chat, isActive, onSelect }) {
    const backgroundClass = isActive ? 'bg-tg-active-bg' : 'hover:bg-tg-hover-bg';
    const previewColorClass = isActive ? 'text-white' : 'text-gray-400';

    return (
        <li
            className={`flex items-center space-x-3 p-2 ${backgroundClass} cursor-pointer mx-1 rounded-lg`}
            onClick={() => onSelect(chat.id)}
        >
            <div className="flex-shrink-0">
                <Avatar type={chat.avatarType} value={chat.avatarValue} color={chat.avatarColor} />
            </div>
            <div className="flex-grow min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                    <span className="font-semibold text-white truncate">{chat.name}</span>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                    <p className={`text-sm ${previewColorClass} truncate pr-1`}>
                        {chat.message}
                    </p>
                    {chat.unreadCount > 0 && (
                        <span className="ml-auto flex-shrink-0 text-xs bg-tg-accent text-white rounded-full px-1.5 py-0.5 font-medium">
                            {chat.unreadCount}
                        </span>
                    )}
                </div>
            </div>
        </li>
    );
}
