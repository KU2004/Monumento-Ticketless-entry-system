import React, { useState } from "react";
import "./chatbot.css";
import botAvatar from "../Assets/bot-avatar.png";
import twitterIcon from "../Assets/icon.jpeg";
import instagramIcon from "../Assets/icon.jpeg";
import youtubeIcon from "../Assets/icon.jpeg";
import facebookIcon from "../Assets/icon.jpeg";
import whatsappIcon from "../Assets/icon.jpeg";

const Chatbot = ({ onClose }) => {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      greeting: "Hello! I'm Saarthi, your SmartBot 🤖",
      experience: "Get ready for a Queueless Experience! 🎟️",
      startChat: "🚀 START CHAT",
      followMe: "FOLLOW ME:",
    },
    es: {
      greeting: "¡Hola! Soy Saarthi, tu SmartBot 🤖",
      experience: "¡Prepárate para una experiencia sin colas! 🎟️",
      startChat: "🚀 INICIAR CHAT",
      followMe: "SÍGUEME:",
    },
    fr: {
      greeting: "Bonjour! Je suis Saarthi, votre SmartBot 🤖",
      experience: "Préparez-vous pour une expérience sans file d'attente! 🎟️",
      startChat: "🚀 DÉMARRER LE CHAT",
      followMe: "SUIVEZ-MOI:",
    },
    de: {
      greeting: "Hallo! Ich bin Saarthi, dein SmartBot 🤖",
      experience: "Mach dich bereit für ein warteschlangenfreies Erlebnis! 🎟️",
      startChat: "🚀 CHAT STARTEN",
      followMe: "FOLGE MIR:",
    },
    it: {
      greeting: "Ciao! Sono Saarthi, il tuo SmartBot 🤖",
      experience: "Preparati per un'esperienza senza code! 🎟️",
      startChat: "🚀 AVVIA CHAT",
      followMe: "SEGUIMI:",
    },
    hi: {
      greeting: "नमस्ते! मैं सारथी, आपका स्मार्टबॉट 🤖",
      experience: "कृपया कतार रहित अनुभव के लिए तैयार हो जाइए! 🎟️",
      startChat: "🚀 चैट शुरू करें",
      followMe: "मुझे फॉलो करें:",
    },
    mr: {
      greeting: "नमस्कार! मी सारथी, तुमचा स्मार्टबॉट 🤖",
      experience: "कृपया रांगेशिवाय अनुभवासाठी तयार व्हा! 🎟️",
      startChat: "🚀 चॅट सुरू करा",
      followMe: "मला फॉलो करा:",
    },
    ta: {
      greeting: "வணக்கம்! நான் சார்தி, உங்கள் ஸ்மார்ட்பாட் 🤖",
      experience: "வரிசையற்ற அனுபவத்திற்கு தயாராகுங்கள்! 🎟️",
      startChat: "🚀 அரட்டை தொடங்குங்கள்",
      followMe: "என்னை பின்தொடருங்கள்:",
    },
    te: {
      greeting: "నమస్తే! నేను సారథి, మీ స్మార్ట్‌బాట్ 🤖",
      experience: "వరుసలేని అనుభవానికి సిద్ధంగా ఉండండి! 🎟️",
      startChat: "🚀 చాట్ ప్రారంభించండి",
      followMe: "నన్ను అనుసరించండి:",
    },
    kn: {
      greeting: "ನಮಸ್ಕಾರ! ನಾನು ಸಾರ್ಥಿ, ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್‌ಬಾಟ್ 🤖",
      experience: "ಸಾಲಿಲ್ಲದ ಅನುಭವಕ್ಕೆ ಸಿದ್ಧರಾಗಿ! 🎟️",
      startChat: "🚀 ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ",
      followMe: "ನನ್ನನ್ನು ಅನುಸರಿಸಿ:",
    },
    ml: {
      greeting: "നമസ്കാരം! ഞാൻ സാർഥി, നിങ്ങളുടെ സ്മാർട്ട്‌ബോട്ട് 🤖",
      experience: "നിരയില്ലാത്ത അനുഭവത്തിനായി തയ്യാറാകൂ! 🎟️",
      startChat: "🚀 ചാറ്റ് ആരംഭിക്കുക",
      followMe: "എന്നെ പിന്തുടരുക:",
    },
    gu: {
      greeting: "નમસ્તે! હું સારથી, તમારો સ્માર્ટબોટ 🤖",
      experience: "રહિત અનુભવ માટે તૈયાર થાઓ! 🎟️",
      startChat: "🚀 ચેટ શરૂ કરો",
      followMe: "મને અનુસરો:",
    },
    bn: {
      greeting: "নমস্কার! আমি সারথি, আপনার স্মার্টবট 🤖",
      experience: "সারিবিহীন অভিজ্ঞতার জন্য প্রস্তুত হন! 🎟️",
      startChat: "🚀 চ্যাট শুরু করুন",
      followMe: "আমাকে অনুসরণ করুন:",
    },
  };

  const getTranslation = (key) => {
    return translations[language]?.[key] || translations["en"][key];
  };

  return (
    <div className="overlay">
      <div className="chatContainer">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="closeButton"
          aria-label="Close Chatbot"
        >
          ✖
        </button>

        {/* Language Selector */}
        <div className="languageSelector">
          🌍
          <select
            aria-label="Select Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="it">Italiano</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
            <option value="ta">தமிழ்</option>
            <option value="te">తెలుగు</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="ml">മലയാളം</option>
            <option value="gu">ગુજરાતી</option>
            <option value="bn">বাংলা</option>
          </select>
        </div>

        {/* Chatbot Header */}
        <div className="chatHeader">
          <img src={botAvatar} alt="Chatbot Avatar" className="botAvatar" />
          <div className="botDescription">
            <p>{getTranslation("greeting")}</p>
            <p>{getTranslation("experience")}</p>
          </div>
        </div>

        {/* Start Chat Button */}
        <div className="buttonContainer">
          <button className="startChatButton">
            {getTranslation("startChat")}
          </button>
        </div>

        {/* Social Media Footer */}
        <div className="socialMediaFooter">
          <p>{getTranslation("followMe")}</p>
          <div className="socialIcons">
            {[twitterIcon, instagramIcon, youtubeIcon, facebookIcon, whatsappIcon].map(
              (icon, idx) => (
                <a href="#" key={idx}>
                  <img src={icon} alt="Social Icon" />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
