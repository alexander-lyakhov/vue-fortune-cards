export interface CreateDeckPayload {
  name:             string;
  description:      string | null;
  emoji:            string;
  colorIndex:       number;
  cardBackImage?:   File;
}
