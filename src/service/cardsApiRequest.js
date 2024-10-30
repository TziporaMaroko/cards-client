import http from './http.js'; 

const getCards = async () => {
  const response = await http.get('/cards');
  return response.data;
};

const updateCard = async (id, updatedData) => {
  await http.put(`/cards/${id}`, updatedData);
};

const deleteCard = async (id) => {
  await http.delete(`/cards/${id}`);
};

const addCard = async (newCard) => {
  const response = await http.post('/cards', newCard);
  return response.data; // Assuming the API returns the newly created card
};

export { getCards, updateCard, deleteCard, addCard };
