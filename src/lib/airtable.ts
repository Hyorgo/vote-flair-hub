import Airtable from 'airtable';

// Initialisation d'Airtable avec votre clé API
const airtable = new Airtable({
  apiKey: 'VOTRE_CLE_API' // Nous utiliserons une vraie clé API plus tard
}).base('VOTRE_BASE_ID'); // Nous utiliserons un vrai ID de base plus tard

// Fonction pour récupérer toutes les catégories
export const getCategories = async () => {
  try {
    const records = await airtable('Categories').select().all();
    return records.map(record => ({
      id: record.id,
      name: record.get('name'),
      nominees: record.get('nominees') || 0,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return [];
  }
};

// Fonction pour récupérer tous les nominés
export const getNominees = async () => {
  try {
    const records = await airtable('Nominees').select().all();
    return records.map(record => ({
      id: record.id,
      name: record.get('name'),
      description: record.get('description'),
      imageUrl: record.get('image_url'),
      categoryId: record.get('category_id'),
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des nominés:', error);
    return [];
  }
};

// Fonction pour ajouter un vote
export const addVote = async (nomineeId: string) => {
  try {
    const record = await airtable('Votes').create({
      nominee_id: nomineeId,
      timestamp: new Date().toISOString(),
    });
    return record;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du vote:', error);
    throw error;
  }
};