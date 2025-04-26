import React from 'react'
import ChatInput from '../Components/ChatInput';

const ChatPlaceholderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);


export default function ChatPart() {
  return (
                <main className="flex-grow bg-tg-bg flex flex-col items-center justify-center p-4 overflow-hidden relative">
                <ChatInput id={activeChat?.id} />
                {activeChat ? (
                    <div className="text-center text-white">
                        <h2 className="text-2xl font-semibold mb-2">{activeChat.name}</h2>
                        <p className="text-gray-400">ID: {activeChat.id}</p>
                        <p className="mt-4 text-sm text-gray-500">(Chat content area would go here)</p>
                    </div>
                ) : (
                    <div className="text-center text-gray-400">
                        <ChatPlaceholderIcon />
                        <p className="mt-2">Select a chat to start messaging</p>
                        <p className="text-sm mt-1">Or use the search bar to find people, groups, or channels.</p>
                        <p className="text-sm mt-4 text-tg-accent">Built with React & Tailwind CSS</p>
                    </div>
                )}
            </main>

  )
}
