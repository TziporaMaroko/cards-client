import React, { useEffect, useState } from "react";
import { getCards, updateCard, deleteCard, addCard } from './service/cardsApiRequest.js';
import Card from "./components/Card/Card.jsx";
import PlusCard from "./components/PlusCard/PlusCard.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import './App.css';

const App = () => {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch cards on component mount
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setCards(await getCards()); 
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      }
    };
    fetchCards();
  }, []);

  // Update card
  const handleUpdateCard = async (id, updatedData) => {
    try {
      await updateCard(id, updatedData);
      setCards(prevCards =>
        prevCards.map(card => (card.id === id ? { ...card, ...updatedData } : card))
      );
    } catch (error) {
      console.error('Failed to update card:', error);
    }
  };

  // Delete card
  const handleDeleteCard = async (id) => {
    try {
      await deleteCard(id);
      setCards(cards.filter(card => card.id !== id));
    } catch (error) {
      console.error('Failed to delete card:', error);
    }
  };

  // Add card
  const handleCardAdded = async (newCard) => {
    try {
      const addedCard = await addCard(newCard);
      setCards([...cards, addedCard]);
    } catch (error) {
      console.error('Failed to add card:', error);
    }
  };

  // Filter cards based on search query
  const filteredCards = cards.filter(card => 
    card.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="cards-container">
        {filteredCards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            color={card.color}
            text={card.text}
            onUpdate={handleUpdateCard}
            onDelete={() => handleDeleteCard(card.id)}
          />
        ))}
        <PlusCard onCardAdded={handleCardAdded} />
      </div>
    </div>
  );
};

export default App;
