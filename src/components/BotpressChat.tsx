import React, { useEffect } from "react";

interface BotpressChatProps {
  botId?: string;
  hostUrl?: string;
  messagingUrl?: string;
  clientId?: string;
  themeColor?: string;
}

const BotpressChat: React.FC<BotpressChatProps> = ({
  botId = "5dL7csup",
  hostUrl = "https://cdn.botpress.cloud/webchat/v2",
  messagingUrl = "https://messaging.botpress.cloud",
  clientId = "5dL7csup",
  themeColor = "#3d9d6c",
}) => {
  useEffect(() => {
    // Load Botpress scripts dynamically
    const loadBotpressScripts = async () => {
      try {
        // Load inject script
        const injectScript = document.createElement("script");
        injectScript.src = "https://cdn.botpress.cloud/webchat/v2/inject.js";
        injectScript.async = true;
        document.head.appendChild(injectScript);

        // Load config script
        const configScript = document.createElement("script");
        configScript.src = "https://cdn.botpress.cloud/webchat/v2/config.js";
        configScript.async = true;
        document.head.appendChild(configScript);

        // Wait for scripts to load and initialize
        configScript.onload = () => {
          setTimeout(() => {
            if (window.botpressWebChat) {
              window.botpressWebChat.init({
                botId,
                hostUrl,
                messagingUrl,
                clientId,
                enableConversationDeletion: true,
                showPoweredBy: false,
                theme: "prism",
                themeColor,
                allowedOrigins: [],
              });
              console.log("Botpress chat initialized successfully");
            } else {
              console.warn("Botpress WebChat not available");
            }
          }, 1000);
        };
      } catch (error) {
        console.error("Error loading Botpress scripts:", error);
      }
    };

    loadBotpressScripts();

    // Cleanup function
    return () => {
      // Remove scripts on component unmount
      const scripts = document.querySelectorAll('script[src*="botpress"]');
      scripts.forEach((script) => script.remove());
    };
  }, [botId, hostUrl, messagingUrl, clientId, themeColor]);

  return null; // This component doesn't render anything visible
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    botpressWebChat?: {
      init: (config: any) => void;
    };
  }
}

export default BotpressChat;
