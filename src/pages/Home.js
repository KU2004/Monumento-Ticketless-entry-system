import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "../App.css";
import "./Home.css";
import HiGuest from "../components/HiGuest";
import Chatbot from "./chatbot";
import Poster from "../Assets/Poster.jpeg"; // Import the imagezz


function Home({ openLogin }) {
  const { language, setLanguage } = useLanguage(); // Use context for language
  useEffect(() => {
    if (!language) {
      setLanguage("en"); // Set default language to English
    }
  }, [language, setLanguage]);
  const [showDistrictModal, setShowDistrictModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("Select District");
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false); // State to toggle login popup
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [user, setUser] = useState(null); // State to store logged-in user

  const translations = {
    en: { 
      selectDistrict: "Select District",
      searchPlaceholder: "Search for Monument...",
      seeAll: "See All",
      login: "Login",
      logout: "Logout",
      searchDistrict: "Search for District",
      close: "X",
      recommendedPopularSites: "Recommended Popular Sites",
      recommendedMonuments: "Recommended Monuments",
      recommendedForts: "Recommended Forts",
      recommendedSanctuaries: "Recommended Sanctuaries",
      recommendedTemples: "Recommended Temples",
      recommendedPalaces: "Recommended Palaces",
      recommendedCaves: "Recommended Caves",
      recommendedMuseums: "Recommended Museums",
      gatewayOfIndia: "Gateway of India",
      elephantaCaves: "Elephanta Caves",
      siddhivinayakTemple: "Siddhivinayak Temple",
      chhatrapatiShivajiMuseum: "Chhatrapati Shivaji Maharaj Museum",
      mumbai: "Mumbai",
      gharapuriMumbai: "Gharapuri, Mumbai",
      dadarMumbai: "Dadar, Mumbai",
      RajgadFort: "Rajgad Fort",
      Raigad: "Raigad",
      SinhagadFort: "Sinhagad Fort",
      Satara: "Satara",
      ShivneriFort: "Shivneri Fort",
      PratapgadFort: "Pratapgad Fort",
      LohagadFort: "Lohagad Fort",
      RaigadFort: "Raigad Fort",
      SindhudurgFort: "Sindhudurg Fort",
      MurudJanjiraFort: "Murud Janjira Fort",
      VijaydurgFort: "Vijaydurg Fort",
      TornaFort: "Torna Fort",
    },
    es: { 
      selectDistrict: "Seleccionar Distrito",
      searchPlaceholder: "Buscar Monumento...",
      seeAll: "Ver Todo",
      login: "Iniciar Sesión",
      logout: "Cerrar Sesión",
      searchDistrict: "Buscar Distrito",
      close: "Cerrar",
      recommendedPopularSites: "Sitios Populares Recomendados",
      recommendedMonuments: "Monumentos Recomendados",
      recommendedForts: "Fuertes Recomendados",
      recommendedSanctuaries: "Santuarios Recomendados",
      recommendedTemples: "Templos Recomendados",
      recommendedPalaces: "Palacios Recomendados",
      recommendedCaves: "Cuevas Recomendadas",
      recommendedMuseums: "Museos Recomendados",
      gatewayOfIndia: "Puerta de la India",
      elephantaCaves: "Cuevas de Elefanta",
      siddhivinayakTemple: "Templo Siddhivinayak",
      chhatrapatiShivajiMuseum: "Museo Chhatrapati Shivaji Maharaj",
      mumbai: "Bombay",
      gharapuriMumbai: "Gharapuri, Bombay",
      dadarMumbai: "Dadar, Bombay",
    },
    fr: { 
      selectDistrict: "Sélectionner un District",
      searchPlaceholder: "Rechercher un Monument...",
      seeAll: "Voir Tout",
      login: "Connexion",
      logout: "Déconnexion",
      searchDistrict: "Rechercher un District",
      close: "Fermer",
      recommendedPopularSites: "Sites Populaires Recommandés",
      recommendedMonuments: "Monuments Recommandés",
      recommendedForts: "Forts Recommandés",
      recommendedSanctuaries: "Sanctuaires Recommandés",
      recommendedTemples: "Temples Recommandés",
      recommendedPalaces: "Palais Recommandés",
      recommendedCaves: "Grottes Recommandées",
      recommendedMuseums: "Musées Recommandés",
    },
    de: { 
      selectDistrict: "Bezirk auswählen",
      searchPlaceholder: "Nach Denkmal suchen...",
      seeAll: "Alle Anzeigen",
      login: "Anmelden",
      logout: "Abmelden",
      searchDistrict: "Bezirk suchen",
      close: "Schließen",
      recommendedPopularSites: "Empfohlene Beliebte Orte",
      recommendedMonuments: "Empfohlene Denkmäler",
      recommendedForts: "Empfohlene Festungen",
      recommendedSanctuaries: "Empfohlene Heiligtümer",
      recommendedTemples: "Empfohlene Tempel",
      recommendedPalaces: "Empfohlene Paläste",
      recommendedCaves: "Empfohlene Höhlen",
      recommendedMuseums: "Empfohlene Museen",
    },
    hi: { 
      selectDistrict: "जिला चुनें",
      searchPlaceholder: "स्मारक खोजें...",
      seeAll: "सभी देखें",
      login: "लॉग इन करें",
      logout: "लॉग आउट करें",
      searchDistrict: "जिला खोजें",
      close: "X",
      recommendedPopularSites: "अनुशंसित लोकप्रिय स्थल",
      recommendedMonuments: "अनुशंसित स्मारक",
      recommendedForts: "अनुशंसित किले",
      recommendedSanctuaries: "अनुशंसित अभयारण्य",
      recommendedTemples: "अनुशंसित मंदिर",
      recommendedPalaces: "अनुशंसित महल",
      recommendedCaves: "अनुशंसित गुफाएँ",
      recommendedMuseums: "अनुशंसित संग्रहालय",
      monuments: "स्मारक",
      forts: "किले",
      sanctuaries: "अभयारण्य",
      temples: "पवित्र स्थल",
      palaces: "महल",
      caves: "गुफाएँ",
      museums: "संग्रहालय",
      mosque: "मस्जिद",
      maps: "नक्शे",
      offers: "ऑफर",
      giftcards: "गिफ्ट कार्ड",
      holiSites: "पवित्र स्थल", // Corrected translation for "Holi Sites"
    },
  };

  const getTranslation = (key) => {
    return translations[language]?.[key] || translations["en"][key];
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data
    }
  }, []);

  useEffect(() => {
    if (showChatbot) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth; // Calculate scrollbar width
      document.body.style.overflow = "hidden"; // Disable scroll
      document.body.style.paddingRight = `${scrollbarWidth}px`; // Add padding to compensate for scrollbar
    } else {
      document.body.style.overflow = "auto"; // Re-enable scroll
      document.body.style.paddingRight = "0px"; // Remove padding
    }
  }, [showChatbot]);

  // Add translations for place names and locations
const placeTranslations = {
  en: {
    "Gateway of India": "Gateway of India",
    "Elephanta Caves": "Elephanta Caves",
    "Siddhivinayak Temple": "Siddhivinayak Temple",
    "Chhatrapati Shivaji Maharaj Museum": "Chhatrapati Shivaji Maharaj Museum",
    Mumbai: "Mumbai",
    "Gharapuri, Mumbai": "Gharapuri, Mumbai",
    "Dadar, Mumbai": "Dadar, Mumbai",
    "Rajgad Fort": "Rajgad Fort",
    "Raigad": "Raigad",
    "Sinhagad Fort": "Sinhagad Fort",
    "Satara": "Satara",
    "Shivneri Fort": "Shivneri Fort",
    "Pune": "Pune",
    "Dummy Site 1": "Dummy Site 1",
    "Dummy Site 2": "Dummy Site 2",
    "Bibi Ka Maqbara": "Bibi Ka Maqbara",
    "Chhatrapati Shivaji Terminus (CST)": "Chhatrapati Shivaji Terminus (CST)",
    "Flora Fountain": "Flora Fountain",
    "Aga Khan Palace": "Aga Khan Palace",
    "Rajabai Clock Tower": "Rajabai Clock Tower",
    "Hutatma Chowk": "Hutatma Chowk",
    "Statue of Shivaji Maharaj": "Statue of Shivaji Maharaj",
    // Add more translations as needed
  },
  hi: {
    "Gateway of India": "गेटवे ऑफ इंडिया",
    "Elephanta Caves": "एलिफेंटा गुफाएँ",
    "Siddhivinayak Temple": "सिद्धिविनायक मंदिर",
    "Chhatrapati Shivaji Maharaj Museum": "छत्रपति शिवाजी महाराज संग्रहालय",
    Mumbai: "मुंबई",
    "Gharapuri, Mumbai": "घारापुरी, मुंबई",
    "Dadar, Mumbai": "दादर, मुंबई",
    "Rajgad Fort": "राजगड किला",
    "Raigad": "रायगढ़",
    "Sinhagad Fort": "सिंहगढ़ किला",
    "Pratapgad Fort": "प्रतापगढ़ किला",
    "Lohagad Fort": "लोहागढ़ किला",
    "Raigad Fort": "रायगढ़ किला",
    "Sindhudurg Fort": "सिंधुदुर्ग किला",
    "Satara": "सातारा",
    "Shivneri Fort": "शिवनेरी किला",
    "Pune": "पुणे",
    "Dummy Site 1": "डमी साइट 1",
    "Dummy Site 2": "डमी साइट 2",
    "Bibi Ka Maqbara": "बीबी का मकबरा",
    "Chhatrapati Shivaji Terminus (CST)": "छत्रपति शिवाजी टर्मिनस (सीएसटी)",
    "Flora Fountain": "फ्लोरा फाउंटेन",
    "Aga Khan Palace": "आगा खान पैलेस",
    "Rajabai Clock Tower": "राजाबाई क्लॉक टॉवर",
    "Hutatma Chowk": "हुतात्मा चौक",
    "Statue of Shivaji Maharaj": "छत्रपति शिवाजी महाराज की मूर्ति",
    // Add more translations as needed
  },
  es: {
    "Gateway of India": "Puerta de la India",
    "Elephanta Caves": "Cuevas de Elefanta",
    "Siddhivinayak Temple": "Templo Siddhivinayak",
    "Chhatrapati Shivaji Maharaj Museum": "Museo Chhatrapati Shivaji Maharaj",
    Mumbai: "Bombay",
    "Gharapuri, Mumbai": "Gharapuri, Bombay",
    "Dadar, Mumbai": "Dadar, Bombay",
    "Rajgad Fort": "Rajgad Fort",
    "Raigad": "Raigad",
    "Sinhagad Fort": "Sinhagad Fort",
    "Satara": "Satara",
    "Shivneri Fort": "Shivneri Fort",
    "Pune": "Pune",
    "Dummy Site 1": "Sitio Ficticio 1",
    "Dummy Site 2": "Sitio Ficticio 2",
    "Bibi Ka Maqbara": "Bibi Ka Maqbara",
    "Chhatrapati Shivaji Terminus (CST)": "Chhatrapati Shivaji Terminus (CST)",
    "Flora Fountain": "Fuente Flora",
    "Aga Khan Palace": "Palacio Aga Khan",
    "Rajabai Clock Tower": "Torre del Reloj Rajabai",
    "Hutatma Chowk": "Plaza Hutatma",
    "Statue of Shivaji Maharaj": "Estatua de Shivaji Maharaj",
    // Add more translations as needed
  },
  fr: {
    "Gateway of India": "Gateway of India",
    "Elephanta Caves": "Elephanta Caves",
    "Siddhivinayak Temple": "Siddhivinayak Temple",
    "Chhatrapati Shivaji Maharaj Museum": "Chhatrapati Shivaji Maharaj Museum",
    Mumbai: "Mumbai",
    "Gharapuri, Mumbai": "Gharapuri, Mumbai",
    "Dadar, Mumbai": "Dadar, Mumbai",
    "Rajgad Fort": "Rajgad Fort",
    "Raigad": "Raigad",
    "Sinhagad Fort": "Sinhagad Fort",
    "Satara": "Satara",
    "Shivneri Fort": "Shivneri Fort",
    "Pune": "Pune",
    "Dummy Site 1": "Site Factice 1",
    "Dummy Site 2": "Site Factice 2",
    "Bibi Ka Maqbara": "Bibi Ka Maqbara",
    "Chhatrapati Shivaji Terminus (CST)": "Chhatrapati Shivaji Terminus (CST)",
    "Flora Fountain": "Fontaine Flora",
    "Aga Khan Palace": "Palais Aga Khan",
    "Rajabai Clock Tower": "Tour de l'Horloge Rajabai",
    "Hutatma Chowk": "Place Hutatma",
    "Statue of Shivaji Maharaj": "Statue de Shivaji Maharaj",
    // Add more translations as needed
  },
  de: {
    "Gateway of India": "Gateway of India",
    "Elephanta Caves": "Elephanta Caves",
    "Siddhivinayak Temple": "Siddhivinayak Temple",
    "Chhatrapati Shivaji Maharaj Museum": "Chhatrapati Shivaji Maharaj Museum",
    Mumbai: "Mumbai",
    "Gharapuri, Mumbai": "Gharapuri, Mumbai",
    "Dadar, Mumbai": "Dadar, Mumbai",
    "Rajgad Fort": "Rajgad Fort",
    "Raigad": "Raigad",
    "Sinhagad Fort": "Sinhagad Fort",
    "Satara": "Satara",
    "Shivneri Fort": "Shivneri Fort",
    "Pune": "Pune",
    "Dummy Site 1": "Dummy-Standort 1",
    "Dummy Site 2": "Dummy-Standort 2",
    "Bibi Ka Maqbara": "Bibi Ka Maqbara",
    "Chhatrapati Shivaji Terminus (CST)": "Chhatrapati Shivaji Terminus (CST)",
    "Flora Fountain": "Flora-Brunnen",
    "Aga Khan Palace": "Aga-Khan-Palast",
    "Rajabai Clock Tower": "Rajabai-Uhrturm",
    "Hutatma Chowk": "Hutatma-Platz",
    "Statue of Shivaji Maharaj": "Statue von Shivaji Maharaj",
    // Add more translations as needed
  },
};

// Helper function to get translated text
const getPlaceTranslation = (key) => {
  return placeTranslations[language]?.[key] || placeTranslations["en"]?.[key] || key;
};

// Update districts array to dynamically translate based on the selected language
const districts = [
  ...["Mumbai", "Pune", "Nagpur", "Nashik", "Kolhapur", "Aurangabad", "Thane"].map(getPlaceTranslation),
];

  const scrollRefs = {
    popular: useRef(null),  // <--- Add this line!
    monuments: useRef(null),
    forts: useRef(null),
    sanctuaries: useRef(null),
    temples: useRef(null),
    palaces: useRef(null),
    caves: useRef(null),
    museums: useRef(null),
  };

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    setShowDistrictModal(false);
    setSearchText(""); // Clear search text when a district is selected
    console.log("Selected District:", district); // Debugging
  };

  const scroll = (ref, direction) => {
    if (scrollRefs[ref] && scrollRefs[ref].current) {
      scrollRefs[ref].current.scrollBy({ left: direction * 300, behavior: "smooth" });
    }
  };

  // Update dataCategories to use translations
const dataCategories = [
  {
    title: getTranslation("recommendedPopularSites"),
    ref: "popular",
    data: [
      { name: getPlaceTranslation("Gateway of India"), location: getPlaceTranslation("Mumbai"), img: require("../Assets/image 1.png"), link: "/gateway-of-india" },
      { name: getPlaceTranslation("Elephanta Caves"), location: getPlaceTranslation("Gharapuri, Mumbai"), img: require("../Assets/image 2.png"), link: "/ElephantaCaves" },
      { name: getPlaceTranslation("Siddhivinayak Temple"), location: getPlaceTranslation("Dadar, Mumbai"), img: require("../Assets/image 3.png") },
      { name: getPlaceTranslation("Chhatrapati Shivaji Maharaj Museum"), location: getPlaceTranslation("Mumbai"), img: require("../Assets/image 4.png") },
      { name: getPlaceTranslation("Dummy Site 1"), location: getPlaceTranslation("Test City"), img: require("../Assets/image 4.png") },
      { name: getPlaceTranslation("Dummy Site 2"), location: getPlaceTranslation("Test City"), img: require("../Assets/image 4.png") },
    
    ]},
    { title: getTranslation("recommendedMonuments"), ref: "monuments", data: [
      { name: getPlaceTranslation("Gateway of India"), location: getPlaceTranslation("Mumbai"), img: require("../Assets/image 1.png"), link: "/gateway-of-india" },
      { name: getPlaceTranslation("Bibi Ka Maqbara"), location: getPlaceTranslation("Aurangabad"), img: require("../Assets/image 2.png") },
      { name: getPlaceTranslation("Chhatrapati Shivaji Terminus (CST)"), location: "CSMT, " + getPlaceTranslation("Mumbai"), img: require("../Assets/image 3.png") },
      { name: getPlaceTranslation("Flora Fountain"), location: getPlaceTranslation("Mumbai"), img: require("../Assets/image 4.png") },
      { name: getPlaceTranslation("Aga Khan Palace"), location: getPlaceTranslation("Pune"), img: require("../Assets/image 4.png") },
      { name: getPlaceTranslation("Flora Fountain"), location: getPlaceTranslation("Mumbai"), img: require("../Assets/image 4.png") },
      { name: getPlaceTranslation("Rajabai Clock Tower"), location: getPlaceTranslation("Mumbai"), img: require("../Assets/image 4.png") },
      { name: getPlaceTranslation("Hutatma Chowk"), location: getPlaceTranslation("Mumbai"), img: require("../Assets/image 4.png") },
      { name: getPlaceTranslation("Statue of Shivaji Maharaj"), location: getPlaceTranslation("Mumbai"), img: require("../Assets/image 4.png") },
    ]},
    { title: getTranslation("recommendedForts"), ref: "forts", data: [
      { name: getPlaceTranslation("Rajgad Fort"), location: getPlaceTranslation("Raigad"), img: require("../Assets/image 1.png") },
      { name: getPlaceTranslation("Sinhagad Fort"), location: getPlaceTranslation("Satara"), img: require("../Assets/image 2.png") },
      { name: getPlaceTranslation("Shivneri Fort"), location: getPlaceTranslation("Pune"), img: require("../Assets/image 3.png") },
      { name: getPlaceTranslation("Pratapgad Fort"), location: getPlaceTranslation("Satara"), img: require("../Assets/image 2.png") },
      { name: getPlaceTranslation("Lohagad Fort"), location: getPlaceTranslation("Pune"), img: require("../Assets/image 4.png") },
      { name: getPlaceTranslation("Raigad Fort"), location: getPlaceTranslation("Raigad"), img: require("../Assets/image 1.png") },
      { name: getPlaceTranslation("Sindhudurg Fort"), location: getPlaceTranslation("Sindhudurg"), img: require("../Assets/image 2.png") },
      { name: getPlaceTranslation("Murud Janjira Fort"), location: getPlaceTranslation("Raigad"), img: require("../Assets/image 2.png") },
      { name: getPlaceTranslation("Vijaydurg Fort"), location: getPlaceTranslation("Sindhudurg"), img: require("../Assets/image 3.png") },
      { name: getPlaceTranslation("Torna Fort"), location: getPlaceTranslation("Pune"), img: require("../Assets/image 4.png") },
    ]},
    { title: getTranslation("recommendedSanctuaries"), ref: "sanctuaries", data: [
      { name: getPlaceTranslation("Kanha National Park"), location: getPlaceTranslation("Madhya Pradesh"), img: require("../Assets/image 1.png") },
      { name: getPlaceTranslation("Jim Corbett National Park"), location: getPlaceTranslation("Uttarakhand"), img: require("../Assets/image 2.png") },
      { name: getPlaceTranslation("Elephanta Caves"), location: getPlaceTranslation("Gharapuri, Mumbai"), img: require("../Assets/image 2.png") },
      { name: getPlaceTranslation("Siddhivinayak Temple"), location: getPlaceTranslation("Dadar, Mumbai"), img: require("../Assets/image 3.png") },
      { name: getPlaceTranslation("Chhatrapati Shivaji Maharaj Museum"), location: getPlaceTranslation("Mumbai"), img: require("../Assets/image 4.png") },
    ]},
    { title: getTranslation("recommendedTemples"), ref: "temples", data: [
      { name: getPlaceTranslation("Kashi Vishwanath"), location: getPlaceTranslation("Varanasi"), img: require("../Assets/image 1.png") },
      { name: getPlaceTranslation("Meenakshi Temple"), location: getPlaceTranslation("Madurai"), img: require("../Assets/image 2.png") },
      { name: getPlaceTranslation("Elephanta Caves"), location: getPlaceTranslation("Gharapuri, Mumbai"), img: require("../Assets/image 2.png") },
      { name: getPlaceTranslation("Siddhivinayak Temple"), location: getPlaceTranslation("Dadar, Mumbai"), img: require("../Assets/image 3.png") },
      { name: getPlaceTranslation("Chhatrapati Shivaji Maharaj Museum"), location: getPlaceTranslation("Mumbai"), img: require("../Assets/image 4.png") },
    ]},
    { title: getTranslation("recommendedPalaces"), ref: "palaces", data: [
      { name: getPlaceTranslation("City Palace"), location: getPlaceTranslation("Jaipur"), img: require("../Assets/image 1.png") },
      { name: getPlaceTranslation("Mysore Palace"), location: getPlaceTranslation("Mysore"), img: require("../Assets/image 2.png") },
      { name: getPlaceTranslation("Elephanta Caves"), location: getPlaceTranslation("Gharapuri, Mumbai"), img: require("../Assets/image 2.png") },
      { name: getPlaceTranslation("Siddhivinayak Temple"), location: getPlaceTranslation("Dadar, Mumbai"), img: require("../Assets/image 3.png") },
      { name: getPlaceTranslation("Chhatrapati Shivaji Maharaj Museum"), location: getPlaceTranslation("Mumbai"), img: require("../Assets/image 4.png") },
    ]},
    { title: getTranslation("recommendedCaves"), ref: "caves", data: [
      { name: getPlaceTranslation("Ajanta Caves"), location: getPlaceTranslation("Aurangabad"), img: require("../Assets/image 1.png") },
      { name: getPlaceTranslation("Ellora Caves"), location: getPlaceTranslation("Aurangabad"), img: require("../Assets/image 2.png") },
      { name: getPlaceTranslation("Elephanta Caves"), location: getPlaceTranslation("Gharapuri, Mumbai"), img: require("../Assets/image 2.png") },
      { name: getPlaceTranslation("Siddhivinayak Temple"), location: getPlaceTranslation("Dadar, Mumbai"), img: require("../Assets/image 3.png") },
      { name: getPlaceTranslation("Chhatrapati Shivaji Maharaj Museum"), location: getPlaceTranslation("Mumbai"), img: require("../Assets/image 4.png") },
    ]},
    { title: getTranslation("recommendedMuseums"), ref: "museums", data: [
      { name: getPlaceTranslation("National Museum"), location: getPlaceTranslation("Delhi"), img: require("../Assets/image 1.png") },
      { name: getPlaceTranslation("Prince of Wales Museum"), location: getPlaceTranslation("Mumbai"), img: require("../Assets/image 2.png") },
      { name: getPlaceTranslation("Elephanta Caves"), location: getPlaceTranslation("Gharapuri, Mumbai"), img: require("../Assets/image 2.png") },
      { name: getPlaceTranslation("Siddhivinayak Temple"), location: getPlaceTranslation("Dadar, Mumbai"), img: require("../Assets/image 3.png") },
      { name: getPlaceTranslation("Chhatrapati Shivaji Maharaj Museum"), location: getPlaceTranslation("Mumbai"), img: require("../Assets/image 4.png") },
    ]},
  ];

  // Filter data based on search input and selected district
  const filteredDataCategories = dataCategories
    .map(category => ({
      ...category,
      data: category.data.filter(item =>
        (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.location.toLowerCase().includes(searchText.toLowerCase())) &&
        (selectedDistrict === "Select District" || item.location.includes(selectedDistrict))
      ),
    }))
    .filter(category => category.data.length > 0);

  console.log("Filtered Data:", filteredDataCategories); // Debugging
  console.log("showLoginPopup:", showLoginPopup); // Debugging

  return (
    <div>
      {/* Header */}
      <header className="header">
        <Link to="/">
          <img className="logo" src={require("../Assets/Monumento.png")} alt={getTranslation("logo")} />
        </Link>

        <div className="Searchbar">
          <img className="searchIcon" src={require("../Assets/search.png")} alt={getTranslation("searchPlaceholder")} />
          <input
            className="searchBar"
            type="text"
            placeholder={getTranslation("searchPlaceholder")}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="header-right">
          <button
            className="select-district-btn"
            onClick={() => setShowDistrictModal(true)}
            style={{
              marginRight: "60px", // Adjusted margin to align with the language selector
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {getTranslation("selectDistrict")}
          </button>

          <div className="languageSelector1">
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
              <option value="hi">हिन्दी</option>
            </select>
          </div>

          {/* Conditionally render user name or Login/Logout button */}
          {user ? (
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <button
                className="user-name-btn"
                style={{
                  marginLeft: "10px",
                  padding: "10px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "50%", // Make it circular
                  cursor: "pointer",
                  width: "40px", // Set width for circular shape
                  height: "40px", // Set height for circular shape
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "16px", // Adjust font size
                  fontWeight: "bold", // Make text bold
                }}
                onClick={() => setShowGuestPopup(!showGuestPopup)} // Toggle dropdown
              >
                {user.name.split(" ").map((n) => n[0]).join("")} {/* Display initials */}
              </button>
              {showGuestPopup && (
                <div
                  style={{
                    position: "absolute",
                    top: "50px",
                    right: "0",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    padding: "10px",
                    zIndex: 1000,
                  }}
                >
                  <p style={{ margin: "0", fontWeight: "bold" }}>{user.name}</p>
                  <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>{user.email}</p>
                  <button
                    className="logout-btn"
                    onClick={() => {
                      localStorage.removeItem("user");
                      localStorage.removeItem("token");
                      window.location.reload(); // Refresh page to update UI
                    }}
                    style={{
                      marginTop: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    {language === "hi" ? "लॉग आउट करें" : getTranslation("logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="login-btn"
              onClick={() => {
                console.log("Login button clicked");
                openLogin();
              }}
              style={{
                marginLeft: "10px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
            >
              {getTranslation("login")}
            </button>
          )}
        </div>
      </header>

      {/* Navbar */}
      {language === "hi" && (
        <nav className="navbar">
          <div className="nav-left">
            <Link to="/monuments" className="nav-item">{getTranslation("monuments")}</Link>
            <Link to="/forts" className="nav-item">{getTranslation("forts")}</Link>
            <Link to="/sanctuaries" className="nav-item">{getTranslation("sanctuaries")}</Link>
            <Link to="/temples" className="nav-item">{getTranslation("holiSites")}</Link>
            <Link to="/palaces" className="nav-item">{getTranslation("palaces")}</Link>
            <Link to="/caves" className="nav-item">{getTranslation("caves")}</Link>
            <Link to="/museums" className="nav-item">{getTranslation("museums")}</Link>
            <Link to="/mosque" className="nav-item">{getTranslation("mosque")}</Link>
          </div>
      
          <div className="nav-right">
            <Link to="/maps" className="nav-item">{getTranslation("maps")}</Link>
            <Link to="/offers" className="nav-item">{getTranslation("offers")}</Link>
            <Link to="/giftcards" className="nav-item">{getTranslation("giftcards")}</Link>
          </div>
        </nav>
      )}
      
      {/* English Navbar */}
      {language === "en" && (
        <nav className="navbar english-navbar">
          <div className="nav-left">
            <Link to="/monuments" className="nav-item">Monuments</Link>
            <Link to="/forts" className="nav-item">Forts</Link>
            <Link to="/sanctuaries" className="nav-item">Sanctuaries</Link>
            <Link to="/temples" className="nav-item">Temples</Link>
            <Link to="/palaces" className="nav-item">Palaces</Link>
            <Link to="/caves" className="nav-item">Caves</Link>
            <Link to="/museums" className="nav-item">Museums</Link>
            <Link to="/mosque" className="nav-item">Mosque</Link>
          </div>
      
          <div className="nav-right">
            <Link to="/maps" className="nav-item">Maps</Link>
            <Link to="/offers" className="nav-item">Offers</Link>
            <Link to="/giftcards" className="nav-item">Gift Cards</Link>
          </div>
        </nav>
      )}
      
      <div className="poster-container">
        <img src={Poster} alt="Poster" className="poster-image" />
      </div>

      {/* Sections with Carousels */}
      {filteredDataCategories.map(({ title, data, ref }) => (
        <div key={ref}>
          <div className="addBar">
            <h1>{title}</h1>
            {/* Conditionally render "See All" button only if no district is selected */}
            {!searchText.trim() && selectedDistrict === "Select District" && (
              <h3><button className="seeAll" onClick={() => console.log("See All clicked!")}>{getTranslation("seeAll")}</button></h3>
            )}
          </div>

          <div className="carousel-container">
            <button 
              className="carousel-btn left" 
              onClick={() => scroll(ref, -1)}
              aria-label="Previous Slide"
            >
              ❮
            </button>

            <button 
              className="carousel-btn right" 
              onClick={() => scroll(ref, 1)}
              aria-label="Next Slide"
            >
              ❯
            </button>

            <div className="carousel-wrapper" ref={scrollRefs[ref]}>
              {data.map((item, index) => (
                <div key={index} className="carousel-card">
                  <img src={item.img} alt={item.name} />
                  <div className="card-text">
                    <Link className="black" to={item.link || `/${ref}`}>
                      <strong>{getPlaceTranslation(item.name)}</strong><br />
                      <small>{getPlaceTranslation(item.location)}</small>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* District Modal Popup */}
      {showDistrictModal && (
        <div className="district-modal">
          <div className="district-popup">
            <input type="text" placeholder={getTranslation("searchDistrict")} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <div className="district-list">
              {districts.filter((d) => d.toLowerCase().includes(searchText.toLowerCase())).map((district, index) => (
                <div key={index} className="district-item" onClick={() => handleDistrictClick(district)}>{district}</div>
              ))}
            </div>
            <button className="close-btn" onClick={() => setShowDistrictModal(false)}>{getTranslation("close")}</button>
          </div>
        </div>
      )}

      {/* Chatbot Button */}
      <div style={{ position: "relative", display: "inline-block" }}>
  <button 
    className="chatbot-button" 
    onClick={() => setShowChatbot(!showChatbot)}
    style={{
      zIndex: 1000, 
      position: "fixed",
      bottom: "20px",
      right: "20px",
      backgroundColor: "#007bff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      fontSize: "24px",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      padding: 0, // Important!
    }}
  >
    <span
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      🤖
    </span>
  </button>

</div>

     {/* Chatbot Popup */}
     {showChatbot && (
        <>
          <div className="overlay" onClick={() => setShowChatbot(false)}></div> {/* Blur Layer */}
          <Chatbot onClose={() => setShowChatbot(false)} />
        </>
      )}


    </div>
  



     

     
    
  );
}

export default Home;