const LOCAL_STORAGE_KEY = "pinnedCardIds";

export const getPinnedCardIds = () => {
  const pinnedCards = localStorage.getItem(LOCAL_STORAGE_KEY);
  return pinnedCards ? JSON.parse(pinnedCards) : [];
};

export const addPinnedCard = (cardId) => {
  const pinnedCards = getPinnedCardIds();
  if (!pinnedCards.includes(cardId)) {
    pinnedCards.push(cardId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pinnedCards));
  }
};

export const removePinnedCard = (cardId) => {
  const pinnedCards = getPinnedCardIds().filter(id => id !== cardId);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pinnedCards));
};

export const isCardPinned = (cardId) => {
  const pinnedCards = getPinnedCardIds();
  return pinnedCards.includes(cardId);
};
