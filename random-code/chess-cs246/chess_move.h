#pragma once

#include "piece_color.h"
#include "player_type.h"
#include <string>

enum class GameMoveType {
  SETUP_START,
  START_GAME,
  EOF_,
};

struct StartGameMove {
  PlayerType playerOne;
  PlayerType playerTwo;
  int playerOneDifficulty;
  int playerTwoDifficulty;
};

struct GameMove {
  GameMoveType outcome;
  StartGameMove startGameMove;
};
