// src/components/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import ChatList from '../Components/ChatList';
import ChatInput from '../Components/ChatInput';

// --- Icons ---
const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);
const ChatPlaceholderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

// --- Sample Data ---
const sampleChatData = [
    { id: 1, name: 'Telegram', message: 'Web A Digest: Many new features...', time: '14:02', unreadCount: 1, avatarType: 'initials', avatarValue: 'T' },
    { id: 2, name: 'Frontend Group', message: "Let's discuss the new UI comp...", time: '08:15', unreadCount: 0, avatarType: 'initials', avatarValue: 'FE', avatarColor: 'bg-blue-500' },
    { id: 3, name: 'Alice', message: 'See you tomorrow!', time: 'Yesterday', unreadCount: 0, avatarType: 'initials', avatarValue: 'A', avatarColor: 'bg-pink-500' },
    { id: 4, name: 'Project X', message: 'Meeting notes attached', time: 'Mon', unreadCount: 3, avatarType: 'initials', avatarValue: 'PX', avatarColor: 'bg-green-500' },
];

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeChatId, setActiveChatId] = useState(null);
    const [chats] = useState(sampleChatData);

    const menuButtonRef = useRef(null);
    const menuRef = useRef(null);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const handleChatSelect = (chatId) => {
        console.log("Selected chat ID:", chatId);
        setActiveChatId(chatId);
    };

    const activeChat = chats.find(chat => chat.id === activeChatId);
    console.log(activeChat);

    return (
        <div className="flex h-screen bg-neutral-800">

            {/* Left Sidebar */}
            <aside className="w-full md:w-[320px] flex flex-col bg-tg-secondary-bg flex-shrink-0 border-r border-gray-700">
                <div className="p-2 flex items-center space-x-2 flex-shrink-0">
                    <button
                        ref={menuButtonRef}
                        onClick={toggleMenu}
                        className="p-2 rounded-full bg-tg-secondary-bg text-gray-300 hover:text-white hover:bg-tg-hover-bg focus:outline-none focus:ring-1 focus:ring-tg-accent"
                        aria-label="Open menu"
                        aria-expanded={isMenuOpen}
                        aria-controls="sidebar-menu-content"
                    >
                        <HamburgerIcon />
                    </button>
                    <input type="text" placeholder="Search" className="w-full bg-[rgb(55,55,55)] rounded-full px-4 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-tg-accent" />
                </div>
                {isMenuOpen && (
                    <div
                        ref={menuRef}
                        id="sidebar-menu-content"
                        className="absolute top-14 left-2 w-60 bg-neutral-800 rounded-lg shadow-xl p-2 z-20 border border-gray-700"
                    >
                        <Link to="/new-group" className="block px-3 py-2 rounded hover:bg-tg-hover-bg text-sm text-white">New Group</Link>
                        <Link to="/contacts" className="block px-3 py-2 rounded hover:bg-tg-hover-bg text-sm text-white">Contacts</Link>
                        <Link to="/calls" className="block px-3 py-2 rounded hover:bg-tg-hover-bg text-sm text-white">Calls</Link>
                        <Link to="/settings" className="block px-3 py-2 rounded hover:bg-tg-hover-bg text-sm text-white">Settings</Link>
                        <Link to="/night-mode" className="block px-3 py-2 rounded bg-neutral-400 hover:bg-tg-hover-bg text-sm text-tg-accent">Night Mode</Link>
                        <hr className="border-gray-400 my-1" />
                        <Link to="/features" className="block px-3 py-2 rounded hover:bg-tg-hover-bg text-sm text-white">Telegram Features</Link>
                    </div>
                )}

                <div className="flex-grow overflow-y-auto overflow-x-hidden">
                    <ChatList
                        chats={chats}
                        activeChatId={activeChatId}
                        onChatSelect={handleChatSelect}
                    />
                </div>
            </aside>

            {/* Right Chat Area */}
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

        </div>
    );
}
