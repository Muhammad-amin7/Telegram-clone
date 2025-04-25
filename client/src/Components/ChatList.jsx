// src/components/ChatList.jsx
import React from 'react';
import ChatItem from './ChatItem';

export default function ChatList({ chats, activeChatId, onChatSelect }) {
    return (
        <ul className="pt-1">
            {chats.map((chat) => (
                <ChatItem
                    key={chat.id}
                    chat={chat}
                    isActive={chat.id === activeChatId}
                    onSelect={onChatSelect}
                />
            ))}
        </ul>
    );
}