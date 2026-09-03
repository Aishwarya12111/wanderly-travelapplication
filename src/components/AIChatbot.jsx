import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Loader2, RefreshCw } from 'lucide-react';
import { sendAIChatMessage } from '../services/geminiApi';
import './AIChatbot.css';

export default function AIChatbot({ destination, onTriggerItinerary }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: destination 
        ? `Bonjour! I am Wanderly AI, your personal travel companion for **${destination.name}**. Ask me about hidden dining spots, optimal visit timing, local customs, or travel tips!`
        : `Welcome! I am Wanderly AI, your personal luxury travel assistant. Ask me anything about world destinations, itineraries, or travel secrets!`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const starterQuestions = [
    "How many days should I spend here?",
    "What should I see?",
    "When is the best time to visit?",
    "What should I eat?",
    "Is this destination expensive?",
    "Plan a 5-day trip for me."
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    // Check if user clicked "Plan a X-day trip for me"
    if (textToSend.toLowerCase().includes('plan a') && textToSend.toLowerCase().includes('trip') && onTriggerItinerary) {
      onTriggerItinerary();
      setInput('');
      return;
    }

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const responseText = await sendAIChatMessage(userMsg.text, destination);
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: responseText
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: "I experienced a temporary connection glitch. Please try asking again!"
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <section className="ai-chatbot-section">
      <div className="ai-chatbot-header">
        <div className="ai-badge">
          <Sparkles size={16} className="text-accent" />
          <span>WANDERLY AI CONCIERGE</span>
        </div>
        <h3 className="ai-title">Your personal travel companion.</h3>
        <p className="ai-subtitle">
          Powered by Gemini AI — intelligent, tailored guidance for {destination ? destination.name : 'every trip'}.
        </p>
      </div>

      <div className="ai-chat-window">
        {/* Messages Container */}
        <div className="ai-messages-container">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`chat-bubble-row ${msg.role === 'user' ? 'user-row' : 'assistant-row'}`}
            >
              <div className="avatar-box">
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className="chat-bubble-content">
                <span className="bubble-author">
                  {msg.role === 'user' ? 'You' : 'Wanderly AI'}
                </span>
                <div className="bubble-text">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Loading Indicator */}
          {loading && (
            <div className="chat-bubble-row assistant-row">
              <div className="avatar-box">
                <Bot size={16} />
              </div>
              <div className="chat-bubble-content">
                <span className="bubble-author">Wanderly AI</span>
                <div className="bubble-text typing-indicator">
                  <Loader2 size={16} className="animate-spin text-accent" />
                  <span>Wanderly AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Starter Suggestion Chips */}
        <div className="starter-chips-wrapper">
          <span className="chips-label">Starter suggestions:</span>
          <div className="chips-scroll">
            {starterQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={loading}
                className="starter-chip"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleFormSubmit} className="ai-input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask Wanderly AI about ${destination ? destination.name : 'travel'}...`}
            className="ai-chat-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading || !input.trim()} 
            className="btn btn-primary ai-send-btn"
            aria-label="Send query"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </form>
      </div>
    </section>
  );
}
