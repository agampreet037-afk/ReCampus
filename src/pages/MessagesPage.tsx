import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Send,
  User,
  ShieldCheck,
  MapPin,
  Tag,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const MessagesPage: React.FC = () => {
  const {
    conversations,
    messages,
    sendMessage,
    selectedConversationId,
    navigate,
    products,
  } = useApp();

  const [activeConvId, setActiveConvId] = useState<string>(
    selectedConversationId || conversations[0]?.id || ''
  );
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedConversationId) {
      setActiveConvId(selectedConversationId);
    }
  }, [selectedConversationId]);

  const activeConversation = conversations.find((c) => c.id === activeConvId);
  const conversationMessages = (activeConvId && messages[activeConvId]) || [];

  // Associated product if available
  const associatedProduct = activeConversation?.productId
    ? products.find((p) => p.id === activeConversation.productId)
    : undefined;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConvId) return;
    sendMessage(activeConvId, inputText.trim());
    setInputText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Campus Messages
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Coordinate handoffs, bargain directly, and verify item conditions with student sellers.
        </p>
      </div>

      {/* Main Messaging Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px] max-h-[720px]">
        {/* Left Column: Conversations List (5 cols on md) */}
        <div className="md:col-span-4 border-r border-slate-200/90 flex flex-col h-full bg-slate-50/50">
          <div className="p-4 border-b border-slate-200/90 bg-white">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Active Inquiries ({conversations.length})
            </h2>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
            {conversations.map((conv) => {
              const isActive = conv.id === activeConvId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`p-3.5 sm:p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                    isActive ? 'bg-emerald-50/80 border-l-4 border-emerald-700' : 'hover:bg-slate-100/70'
                  }`}
                >
                  <img
                    src={conv.participantAvatar}
                    alt={conv.participantName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {conv.participantName}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {conv.lastTimestamp}
                      </span>
                    </div>

                    {conv.productTitle && (
                      <p className="text-[11px] font-semibold text-emerald-800 truncate mt-0.5">
                        Re: {conv.productTitle}
                      </p>
                    )}

                    <p className="text-xs text-slate-500 truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Chat Window (8 cols on md) */}
        <div className="md:col-span-8 flex flex-col h-full bg-white">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={activeConversation.participantAvatar}
                    alt={activeConversation.participantName}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">
                      {activeConversation.participantName}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate">
                      {activeConversation.participantCollege}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() =>
                      navigate('seller-profile', { sellerId: activeConversation.participantId })
                    }
                    className="text-xs font-medium text-emerald-800 hover:underline px-2.5 py-1 rounded-lg hover:bg-emerald-50"
                  >
                    View Profile
                  </button>
                </div>
              </div>

              {/* Item Spotlight Pin (if discussing a product) */}
              {associatedProduct && (
                <div className="px-6 py-2.5 bg-emerald-50/50 border-b border-emerald-100/80 flex items-center justify-between text-xs shrink-0">
                  <div className="flex items-center gap-2 truncate">
                    <Tag className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="text-slate-600 truncate">
                      Discussing: <strong className="text-slate-900">{associatedProduct.title}</strong>{' '}
                      (₹{associatedProduct.price})
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      navigate('product-detail', { productId: associatedProduct.id })
                    }
                    className="text-[11px] font-semibold text-emerald-800 hover:underline shrink-0 flex items-center gap-1"
                  >
                    <span>View Listing</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Messages Stream */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/40">
                {conversationMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.isFromMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                        msg.isFromMe
                          ? 'bg-emerald-800 text-white rounded-br-xs'
                          : 'bg-white text-slate-900 border border-slate-200/80 rounded-bl-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar */}
              <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white shrink-0">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message or suggest a campus meeting spot..."
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className={`p-2.5 rounded-xl text-white transition-all shadow-xs ${
                      inputText.trim()
                        ? 'bg-emerald-800 hover:bg-emerald-900 cursor-pointer'
                        : 'bg-slate-300 cursor-not-allowed'
                    }`}
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5 px-1">
                  *Simulated chat with student seller. Sellers auto-respond with demo confirmation.
                </p>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
              <p className="text-xs">Select a conversation to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
