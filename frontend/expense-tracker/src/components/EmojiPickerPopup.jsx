import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { LuImage, LuX } from 'react-icons/lu'

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='flex flex-col items-start gap-4 mb-8'>
            <div
                className='flex items-center gap-4 cursor-pointer group'
                onClick={() => setIsOpen(true)}
            >
                <div className='w-14 h-14 flex items-center justify-center text-3xl bg-white/5 text-violet-400 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-all'>
                    {icon ? (
                        <span className='flex items-center justify-center'>{icon}</span>
                    ) : (
                        <LuImage size={24} className='text-slate-500' />
                    )}

                </div>
                <div>
                    <p className='text-sm font-bold text-white uppercase tracking-wider'>
                        {icon ? "Change Icon" : "Pick Icon"}</p>
                    <p className='text-[10px] text-slate-500 font-medium mt-0.5'>Customize your transaction</p>
                </div>
            </div>
            {isOpen && (
                <div className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'>
                    <div className='relative bg-[#0a0a0a] p-6 rounded-3xl border border-white/10 shadow-2xl'>
                        <div className='flex items-center justify-between mb-4'>
                            <h4 className='text-white font-bold'>Select Icon</h4>
                            <button
                                className='w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer'
                                onClick={() => setIsOpen(false)}
                            >
                                <LuX className='text-white' />
                            </button>
                        </div>
                        <EmojiPicker
                            theme="dark"
                            onEmojiClick={(emoji) => {
                                onSelect(emoji?.emoji || "")
                                setIsOpen(false)
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopup