import React, { useEffect, useState } from "react";
import Card from "./components/Card/Card.jsx";
import PlusCard from "./components/PlusCard/PlusCard.jsx";
import './App.css';
import http from './service/http.js';

const App = () => {
  const [cards, setCards] = useState([]);

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

  // Handle card deletion
  const deleteCard = async (id) => {
    try {
      await http.delete(`/cards/${id}`); 
      setCards(cards.filter((card) => card.id !== id)); 
    } catch (error) {
      console.error('Failed to delete card:', error); 
    }
  };

  const handleCardAdded = (newCard) => {
    setCards([...cards, newCard]); // Add the new card to the state
  };

  return (
    <div className="cards-container">
      {cards.map((card) => (
        <Card
          id={card.id}
          color={card.color}
          text={card.text}
          onDelete={() => deleteCard(card.id)}
        />
      ))}
      <PlusCard onCardAdded={handleCardAdded}/>
    </div>
  );
};

export default App;
