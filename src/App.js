import React, { useEffect, useState } from "react";
import Card from "./components/Card/Card.jsx";
import PlusCard from "./components/PlusCard/PlusCard.jsx";
import './App.css';
import http from './service/http.js';

const App = () => {
  const [cards, setCards] = useState([]);

  // Fetch cards from API on mount
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await http.get('/cards'); 
        setCards(response.data); 
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      }
    };
    fetchCards();
  }, []);

  // Update a card (both locally and in API)
  const updateCard = async (id, updatedData) => {
    try {
      await http.put(`/cards/${id}`, updatedData);
      setCards((prevCards) =>
        prevCards.map((card) => (card.id === id ? { ...card, ...updatedData } : card))
      );
    } catch (error) {
      console.error('Failed to update card:', error);
    }
  };

  // Delete a card
  const deleteCard = async (id) => {
    try {
      await http.delete(`/cards/${id}`);
      setCards(cards.filter((card) => card.id !== id));
    } catch (error) {
      console.error('Failed to delete card:', error);
    }
  };

  // Handle adding a new card
  const handleCardAdded = (newCard) => {
    setCards([...cards, newCard]);
  };

  return (
    <div className="cards-container">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          color={card.color}
          text={card.text}
          onUpdate={updateCard}
          onDelete={() => deleteCard(card.id)}
        />
      ))}
      <PlusCard onCardAdded={handleCardAdded} />
    </div>
  );
};

export default App;
