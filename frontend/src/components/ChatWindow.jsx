import { useState, useEffect, useRef } from "react";

const ChatWindow = ({ onClose, onSend, response, prompt, setPrompt }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); // Ref to scroll to the bottom

  // Predefined financial advisor prompt
  const financialAdvisorPrompt = `
    You are a financial advisor, and you should only provide advice on financial topics such as:
    1. Basic terms related to finance (stocks, FD, RD, etc.)
    2. How to invest in stocks and the basics of stock trading.
    3. Information about Fixed Deposits (FD) and Recurring Deposits (RD).
    4. Tips on maximizing profit and safe investment strategies.
    5. Output should less than 50 words.

    If the user asks anything beyond these topics, do not help. 
    Only respond with financial advice based on the topics listed above.
  `;

  // Send message and update message array
  const handleSend = () => {
    if (prompt.trim()) {
      // Add the user's message
      const newMessages = [...messages, { sender: "user", content: prompt }];
      setMessages(newMessages);
      onSend(financialAdvisorPrompt + "\n" + prompt); // Send the prompt to the parent to get the AI response

      // Clear the prompt input after sending
      setPrompt("");
    }
  };

  // Handle AI response and add it to the message array
  useEffect(() => {
    if (response) {
      // Check if the response is about financial topics
      const isFinancialResponse = checkFinancialResponse(response);

      // Add the AI's response when it's financial
      if (isFinancialResponse) {
        setMessages(prevMessages => [...prevMessages, { sender: "ai", content: response }]);
      } else {
        // If it's not about finance, show an error message
        setMessages(prevMessages => [
          ...prevMessages,
          {
            sender: "ai",
            content: "I can only provide financial advice. Please ask me something about finance.",
          },
        ]);
      }
    }
  }, [response]);

  // Function to check if the response contains financial content
  const checkFinancialResponse = response => {
    const financialKeywords = [
      "stocks",
      "investment",
      "finance",
      "FD",
      "RD",
      "trading",
      "profits",
      "dividends",
      "portfolio",
    ];
    return financialKeywords.some(keyword => response.toLowerCase().includes(keyword));
  };

  // Auto-scroll to the bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleClose = () => {
    onClose();
    setMessages([]); // Clear messages when the chat window is closed
  };

  return (
    <div className="fixed bottom-16 right-4 w-96 h-120 bg-white border rounded-lg shadow-lg flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold">Chat</h2>
        <button onClick={handleClose} className="text-red-500 font-bold">
          ✕
        </button>
      </div>
      <div
        className="p-4 h-64 overflow-y-auto flex flex-col-reverse space-y-4"
        style={{ overflowY: "auto" }}
      >
        <div className="space-y-4">
          {/* Display messages */}
          {messages.length === 0 && (
            <div className="max-w-xs p-3 rounded-lg self-start bg-gray-100 text-gray-700">
              {/* <p>{financialAdvisorPrompt}</p> */}
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-xs p-3 rounded-lg ${
                message.sender === "user"
                  ? "self-end bg-blue-500 text-white rounded-br-none"
                  : "self-start bg-gray-200 text-gray-700 rounded-bl-none"
              }`}
            >
              <p>{message.content}</p>
            </div>
          ))}
          {/* Empty div for auto-scroll */}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t flex flex-col">
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          className="w-full p-2 border rounded-lg h-24 mb-2"
          rows="3"
          placeholder="Write your prompt..."
        ></textarea>
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
