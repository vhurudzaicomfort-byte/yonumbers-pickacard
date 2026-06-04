/** The games library shown on the Games tab and the All Games view. */
export interface Game {
  title: string;
  img: string;
  category: string;
}

export const GAMES: Game[] = [
  { title: "Lucky Gran", img: "/img/game-1.png", category: "Arcade" },
  { title: "Alpha Guns", img: "/img/game-2.png", category: "Action" },
  { title: "Archery Hero Pro", img: "/img/game-3.png", category: "Sport" },
  { title: "Baby Care", img: "/img/game-4.png", category: "Intellectual" },
  { title: "Badland", img: "/img/game-5.png", category: "Adventure" },
  { title: "Frozen Front", img: "/img/game-6.png", category: "Strategy" },
];

export const CATEGORIES = ["Action", "Adventure", "Arcade", "Strategy", "Intellectual", "Sport"];
