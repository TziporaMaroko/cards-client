import React, { useEffect, useState } from "react";
import { getCards, updateCard, deleteCard, addCard } from './service/cardsApiRequest.js';
import Card from "./components/Card/Card.jsx";
import PlusCard from "./components/PlusCard/PlusCard.jsx";
import './App.css';

const App = () => {
  const [cards, setCards] = useState([]);

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

  return (
    <div className="cards-container">
      {cards.map(card => (
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
  );
};

export default App;
