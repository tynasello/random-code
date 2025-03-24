#pragma once

#include "piece_color.h"
#include <string>

enum class SetupBoardOutcome { PLACE, REMOVE, SET_TURN, DONE, EOF_ };

struct SetupBoardMove {
  SetupBoardOutcome outcome;
  PieceColor nextTurnColor;
  int row;
  int col;
  std::string pieceIdentifier;
  PieceColor pieceColor;
};
