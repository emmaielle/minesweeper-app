export const LEVELS = [
  {
    NAME: 'Beginner',
    INDEX: 1,
    ROWS: 5,
    COLUMNS: 5,
    MINES: 5,
  },
  {
    NAME: 'Intermediate',
    INDEX: 2,
    ROWS: 10,
    COLUMNS: 10,
    MINES: 20,
  },
  {
    NAME: 'Expert',
    INDEX: 3,
    ROWS: 15,
    COLUMNS: 15,
    MINES: 30,
  },
];

export const CELL_STATES = {
  INCOGNITO: 0,
  FLAGGED: 1,
  EXPOSED: 2,
};
