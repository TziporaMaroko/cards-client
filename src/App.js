import React, { useEffect, useState } from "react";
import { getCards, updateCard, deleteCard, addCard } from './service/cardsApiRequest.js';
import { getPinnedCardIds, addPinnedCard, removePinnedCard, isCardPinned } from './service/pinnedCardsUtil';
import Card from "./components/Card/Card.jsx";
import PlusCard from "./components/PlusCard/PlusCard.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import './App.css';

const App = () => {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pinnedCardIds, setPinnedCardIds] = useState(getPinnedCardIds());

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

  // Toggle pinning
  const handlePinToggle = (cardId) => {
    if (isCardPinned(cardId)) {
      removePinnedCard(cardId);
      setPinnedCardIds(pinnedCardIds.filter(id => id !== cardId));
    } else {
      addPinnedCard(cardId);
      setPinnedCardIds([...pinnedCardIds, cardId]);
    }
  };

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

  // Filter and prioritize pinned cards based on search query
  const filteredPinnedCards = cards.filter(card =>
    isCardPinned(card.id) && card.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUnpinnedCards = cards.filter(card =>
    !isCardPinned(card.id) && card.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const combinedFilteredCards = [...filteredPinnedCards, ...filteredUnpinnedCards];


  return (
    <div className="app-container">
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="cards-container">
        {combinedFilteredCards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            color={card.color}
            text={card.text}
            onUpdate={handleUpdateCard}
            onDelete={() => handleDeleteCard(card.id)}
            onPinToggle={() => handlePinToggle(card.id)} // Pass the pin toggle function
            isPinned={pinnedCardIds.includes(card.id)} // Check if the card is pinned
          />
        ))}
        <PlusCard onCardAdded={handleCardAdded} />
      </div>
    </div>
  );
};

export default App;
