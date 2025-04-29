import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';
import ChatPart from './ChatPart';
import { useFindChat } from '../hooks/useFindChat';
import LeftUserSearch from './LeftUserSearch';
import { useSearchUserName } from '../hooks/useSearchUserName';
import ChatSearchList from './ChatSearchList';

export default function LeftSideBar({ sampleChatData = [] }) {
  const [activeChatId, setActiveChatId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState(false)

  const { sendID, data } = useFindChat();
  const { sendUserName, users, loading: searchLoading } = useSearchUserName();

  const handleChatSelect = (chatId) => {
    setActiveChatId(chatId);
  };

  useEffect(() => {
    if (activeChatId) {
      sendID(activeChatId);
    }
  }, [activeChatId, refreshTrigger, sendID]);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      sendUserName(searchQuery.trim()); // send pure string!
    }
  }, [searchQuery]);


  // Decide whether to show search results or default chat data
  const displayChats = searchQuery.trim() ? users : sampleChatData;

  console.log(displayChats);
  

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <aside className="w-full md:w-[370px] flex flex-col bg-tg-secondary-bg bg-neutral-800 backdrop-blur-sm">
        <LeftUserSearch onSearch={setSearchQuery} setActiveSearch={setActiveSearch}/>
        {
          activeSearch ? <ChatSearchList chats={displayChats} activeChatId={activeChatId} onChatSelect={handleChatSelect} loading={searchLoading} />
         : <ChatList chats={displayChats} activeChatId={activeChatId} onChatSelect={handleChatSelect} loading={searchLoading} />
        }
      </aside>

      {/* Right Chat Area */}
      <ChatPart
        data={data}
        ChatId={(sampleChatData || []).find(item => item._id === activeChatId)}
        setRefreshTrigger={setRefreshTrigger}
      />
    </div>
  );
}
