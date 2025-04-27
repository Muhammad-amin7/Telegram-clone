import React from 'react'
import { useFindChat } from '../hooks/useFindChat'

export default function RightText() {
    const { sendID, data, loading, error } = useFindChat()

    return (
        <div className="flex flex-col w-full h-[100vh] bg-neutral-600">
            <div className="flex items-center relative m-10">
                <svg width="29" height="40" className="svg-appendix h-[20px] w-[10px] absolute left-[-7px] bottom-[-3px] ">
                    <g fill="none" fillRule="evenodd">
                        <path d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z" fill="#000" filter="url(#messageAppendix)"></path>
                        <path d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z" fill="#000" className="corner"></path>
                    </g>
                </svg>
                <span className='bg-black text-amber-50  rounded-bl-0 rounded-br-xl rounded-tr-xl rounded-tl-xl px-4 py-2 max-w-[700px]'>Sasasaasa  sdsdjsd sjdksdnksnfnjfdsf jdjjjjjjjjjjjjjjj jjjjjjjjjjjjjjjjjjjjjj jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj sjdksdnksnfnjfdsfjdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj sjdksdnksnfnjfdsfjdjjjjjjjjjjjjjjjjjjjjjjjjjjjj jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj sjdksdnksnfnjfdsfjdjjjjjjjjjjjjjjjjj jjjjjjjjjjjjjjjjjjjjjjj jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj</span>
            </div>
        </div>
    )
}