export const LEVELS = [
  {
    NAME: 'Beginner',
    INDEX: 1,
    ROWS: 8,
    COLUMNS: 8,
    MINES: 10,
  },
  {
    NAME: 'Intermediate',
    INDEX: 2,
    ROWS: 16,
    COLUMNS: 16,
    MINES: 40,
  },
  {
    NAME: 'Expert',
    INDEX: 3,
    ROWS: 16,
    COLUMNS: 32,
    MINES: 99,
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
