import React, { useState, useEffect } from 'react'
import { useSendChat } from '../hooks/useSendChat';
import { useFindChat } from '../hooks/useFindChat';
import { IoIosSend } from "react-icons/io";

export default function ChatInput({ id, setRefreshTrigger }) {

      const { sendChat, error } = useSendChat()
      const { sendID } = useFindChat()

      const [message, setMessage] = useState("");

      useEffect(() => {
            if (id) sendID(id)

      }, [id])

      const handleSend = async (e) => {
            e.preventDefault();
            const text = {
              text: message,
              time: new Date()
            };
          
            await sendChat(text, id); // make sure you await sending
          
            setRefreshTrigger(prev => !prev); // flip refreshTrigger to cause refetch
            setMessage("");
          };
          

      return (
            <section className='absolute bottom-[40px] left-50% w-[60%] z-20'>
                  <form autoComplete='off' onSubmit={handleSend} className="w-[100%] flex items-center justify-between gap-3.5">
                        <input
                              name='message'
                              type="text"
                              className='rounded-2xl px-5 py-2 w-[100%] outline-none text-amber-50 bg-neutral-800'
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className='bg-neutral-800 rounded-2xl text-white font-medium h-[35px] aspect-square p-2'>
                              <IoIosSend />
                        </button>
                  </form>
            </section>
      )
}
