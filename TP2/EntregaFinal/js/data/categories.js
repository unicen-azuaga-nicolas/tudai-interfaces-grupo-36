const BASE_ROUTE = "../assets/games-images/";

const generateUniqueID = () => {
  return Math.floor(Math.random() * 1000);
};

const getRandomImage = () => {
  return `${BASE_ROUTE}${Math.ceil(Math.random() * 24)}.png`;
};

const getImageByID = (id) => {
  return `${BASE_ROUTE}${id}.png`;
};

const generateRandomPrice = () => {
  //entre 0 y 100
  // 70% de probabilidad de que sea gratis
  // 30% de probabilidad de que tenga un precio
  const random = Math.random() * 100;
  if (random < 70) {
    return 0;
  }
  const price = Number(Math.random() * 100).toFixed(2);

  return price;
};

const GAME_NAMES_BY_IMAGE = {
  1: "Cubes",
  2: "VOXIOM - Build - Craft - Shoot",
  3: "Bro Royale",
  4: "Dead Shot",
  5: "Moto X3M",
  6: "Mahjongg - Solitaire",
  7: "Tiny Fishing",
  8: "Bloxd.io",
  9: "Crazy Flips 3D",
  10: "Mesozoic Valley",
  11: "Gulper.io",
  12: "Arkadium's Bubble Shooter",
  13: "Chess - Online Multiplayer Game",
  14: "Basketball Stars",
  15: "Fordward Assault Remix",
  16: "Speedy Golf",
  17: "Drift Boss",
  18: "Tap-Tap Shots",
  19: "Time Shooter 2",
  20: "Ships 3D",
  21: "Jet Rush",
  22: "Capybara Clicker",
  23: "Four Colors",
  24: "Bloons TD 4",
};

const generateRandomGames = (quantity) => {
  const games = [];
  const usedImages = new Set();

  for (let i = 0; i < quantity; i++) {
    let imageNumber;
    do {
      imageNumber = Math.ceil(Math.random() * 24);
    } while (usedImages.has(imageNumber));

    usedImages.add(imageNumber);

    const image = getImageByID(imageNumber);
    const id = generateUniqueID();
    const name = GAME_NAMES_BY_IMAGE[imageNumber];
    games.push({
      id,
      name,
      price: generateRandomPrice(),
      image,
      inCart: false,
    });
  }
  return games;
};

// USER GAMES

// PARA TI
const FOR_YOU = generateRandomGames(10);
// CONTINUAR JUGANDO
const KEEP_PLAYING = generateRandomGames(10);
// CATEGORIAS

const ACTION = generateRandomGames(10);

const SPORTS = generateRandomGames(10);

const CLASSICS = generateRandomGames(10);

// MAPS
/**
 * Mapas para almacenar los juegos de usuario y las categorías
 * agregar los juegos a los mapas
 */
const userGames = new Map([
  ["Para ti", FOR_YOU],
  ["Continuar Jugando", KEEP_PLAYING],
]);

const categories = new Map([
  ["Acción", ACTION],
  ["Deportes", SPORTS],
  ["Clásicos", CLASSICS],
]);
