export const CELL_MULTIPLIER = 4;
export const LEVELS = [
  {
    NAME: 'Beginner',
    INDEX: 1,
    MINES: 6,
  },
  {
    NAME: 'Intermediate',
    INDEX: 2,
    MINES: 10,
  },
  {
    NAME: 'Expert',
    INDEX: 3,
    MINES: 20,
  },
];
export const CELL_STATES = {
  INCOGNITO: 0,
  FLAGGED: 1,
  EXPOSED: 2,
};

export const NEIGHBOUR_COLORS = {
  1: '#8332AC',
  2: '#EE6123',
  3: '#0197F6',
  4: '#D7263D',
  5: '#5FAD56',
  6: '#FFBA08',
  7: '#12EAEA',
  8: '#DB2763',
};
