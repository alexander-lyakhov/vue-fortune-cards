import { Card } from './card';

export interface Deck {
  id:               number;
  name:             string;
  description:      string | null;
  createdAt:        string;
  emoji:            string;
  colorIndex:       number;
  cardBackImageUrl: string | null;
  cardCount?:       number;
  cards?:           Card[];
}
