// src/components/ChatList.jsx
import React from 'react';
import ChatItem from './ChatItem';

export default function ChatList({ chats, activeChatId, onChatSelect }) {
    return (
        <ul className="pt-1 px-2">
            {chats.map((chat) => (
                <ChatItem
                    key={chat._id}
                    chat={chat}
                    isActive={chat._id === activeChatId}
                    onSelect={onChatSelect}
                />
            ))}
        </ul>
    );
}