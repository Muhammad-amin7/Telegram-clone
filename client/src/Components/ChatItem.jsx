import React, { useMemo, useState } from 'react';

// Ranglar ro'yxati
const COLORS = [
    'bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500',
    'bg-pink-500', 'bg-purple-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'
];

// Random rang tanlash
const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[randomIndex];
};

// Avatar komponenti
const Avatar = ({ imgSrc, firstName = '', lastName = '' }) => {
    const randomColor = useMemo(() => getRandomColor(), []);
    const [imgError, setImgError] = useState(false);

    const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();

    if (imgSrc && !imgError) {
        return (
            <img
                src={imgSrc}
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover bg-gray-700"
                loading="lazy"
                onError={() => setImgError(true)}
            />
        );
    }

    return (
        <div className={`w-12 h-12 rounded-full ${randomColor} flex items-center justify-center text-xl font-semibold text-white`}>
            {initials || '??'}
        </div>
    );
};

// ChatItem komponenti
const ChatItem = ({ chat, isActive, onSelect }) => {
    const backgroundClass = isActive ? 'bg-tg-active-bg' : 'hover:bg-tg-hover-bg';
    const previewColorClass = isActive ? 'text-white' : 'text-gray-400';
    const activeClass = isActive ? 'bg-[#8774e1]' : '';

    return (
        <li
            className={`flex items-center space-x-3 p-2 ${backgroundClass} ${activeClass} cursor-pointer mx-1 rounded-lg`}
            onClick={() => onSelect(chat._id)}
        >
            <div className="flex-shrink-0">
                <Avatar
                    imgSrc={chat.img}
                    firstName={chat.firstName}
                    lastName={chat.lastName}
                />
            </div>
            <div className="flex-grow min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                    <span className="font-semibold text-white truncate">
                        {chat.lastName} {chat.firstName}
                    </span>
                    <span className="text-xs text-white flex-shrink-0 ml-2">{chat.time}</span>
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
};

export default ChatItem;