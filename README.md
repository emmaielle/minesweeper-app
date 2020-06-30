# Minesweeper

## Description

This repo includes my version of the classic Minesweeper in React Native.

## Table of Contents

- [Game Instructions](#game-instructions)
- [Run App](#run-app)
- [Test App](#test-app)
- [Project Solution](#project-solution)
- [Issues and Improvements](#issues-and-improvements)

## Game Instructions 

NOTE: Part of this section was adapted from Wikipedia to use this app's terminology.


This game has three levels of complexity: Begginer (5x5), Intermediate (10x10) and Expert (15x15). Changing the sizes of the board or number of mines for testing purposes is easy and it is described in [Test App](#test-app). 

The player can easily toggle between them to change levels, which will restart the ongoing game (even if the player selects the same level they are on).

![image](https://user-images.githubusercontent.com/9577328/86143563-f54f5a80-baca-11ea-92bd-50c0bb1c2e5b.png)


Minesweeper has a very basic gameplay style. Mines are scattered throughout a board. This board is divided into cells, which have three states: incognito (traditionally "covered"), exposed ("uncovered") and flagged.
- An incognito cell is blank and clickable, while an exposed cell shows either a number (the mines adjacent to it), or a mine. 
- When a cell is exposed by a player click, and if it bears a mine, the game ends.
- A flagged cell is similar to a incognito cell, in the way that mines are not triggered when a cell is flagged, and it is impossible to lose through the action of flagging a cell.
- Flagging a cell implies that a player thinks there is a mine underneath, which causes the game to deduct an available mine from the display.

In order to win the game, players must logically deduce where mines exist through the use of the numbers given by exposed cells. To win, all non-mine cells must be exposed.

When a player **taps** on a cell, the game will expose it. If there are no mines adjacent to that particular cell, the mine will display a blank tile, and all adjacent cells will automatically be exposed. **Long-pressing** on a cell will flag it, causing a flag to appear on it. Flagged cells are in a way incognito; a player can **long-press** it to unflag it, and then **tap** it like a normal incognito cell.

![image](https://user-images.githubusercontent.com/9577328/86143653-1617b000-bacb-11ea-99d0-e38725e406e3.png)


## Run app
Run the following commands from the root of this project:
- `yarn install`
- `cd ios/ && pod install && cd ..` 
- `yarn start` in one terminal 
- `react-native run-ios` or `react-native run-android` in a separate terminal.

## Test app
You are provided with constants in `constants/game.js` to test the app with different scenarios. You can edit the number of rows, columns or number of mines, under the object `LEVELS`.

## Project Solution

```
├── android
├── ios
└── src
  ├── components
  ├── constants
  ├── screens
  └── utils
```

- `components` - All minor components found inside any screen in the app.
- `constants` - All fixed values.
- `screens` - All major components responsible for displaying a screen, which could be configured with navigation.
- `utils` - All reusable business logic. Includes the major algorithms for the layout of the board/matrix and the recursive propagation of empty cells. 

### Data Structure

The Board (rendered in `MineField.js`) is a `i x j` matrix, where `i` is the number of rows and `j` the number of columns. Each cell `(i, j)` contains specific information that will help the component `Cell` be displayed. Each cell will react to any change made on the matrix layout.


### State Management

This project does not include a state management solution, like Redux. Albeit I considered it initially, there was no pressing need for adding one because the app is not big enough and there is only three levels of hierarchy between components to share data to and from. In the event that app scales, it will be a definitive necessity. 


## Issues and Improvements

- Possibly future usage of Local Storage to persist certain data, like the last level selected by the user. 
- Style improvements needed on the MineField display of their cells. Ideally cells in all levels should have the same dimensions.
- Addition of real navigation to transition correctly between a Splash page and Home, which currently is handled by local state changes.
- The time it takes to render bigger boards increases exponentially, despite the algorithms to calculate the matrix layout only take miliseconds.
