import React from 'react';
import ChatSearchItem from './ChatSearchItem';
import { useSearchClicked } from '../hooks/useSearchClicked';

export default function ChatSearchList({ chats = [], activeChatId, onChatSelect, loading }) {

    const {sendUserClicked} = useSearchClicked()
  
    if (loading) {
      return <div className="p-4 text-center text-gray-400">Searching...</div>;
    }
  
    if (!chats.length) {
      return <div className="p-4 text-center text-gray-400">No users found.</div>;
    }
  
    return (
      <ul className="pt-1 px-2">
        {chats.map((chat) => (
          <ChatSearchItem
            key={chat._id}
            chat={chat}
            isActive={chat._id === activeChatId}
            onSelect={onChatSelect}
            onAddFriend={sendUserClicked} 
          />
        ))}
      </ul>
    );
  }
  
