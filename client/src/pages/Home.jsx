import React from 'react'

export default function Home() {
    // --- Sample Data ---
    const sampleChatData = [
        { id: 11, name: 'Telegram', message: 'Web A Digest: Many new features...', time: '14:02', unreadCount: 1, avatarType: 'initials', avatarValue: 'T' },
        { id: 22, name: 'Frontend Group', message: "Let's discuss the new UI comp...", time: '08:15', unreadCount: 0, avatarType: 'initials', avatarValue: 'FE', avatarColor: 'bg-blue-500' },
        { id: 33, name: 'Alice', message: 'See you tomorrow!', time: 'Yesterday', unreadCount: 0, avatarType: 'initials', avatarValue: 'A', avatarColor: 'bg-pink-500' },
        { id: 44, name: 'Project X', message: 'Meeting notes attached', time: 'Mon', unreadCount: 3, avatarType: 'initials', avatarValue: 'PX', avatarColor: 'bg-green-500' },
    ];
  return (
    <div>Home</div>
  )
}
