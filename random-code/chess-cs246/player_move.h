#pragma once

#include <string>

enum class PlayerMoveType {
  START_GAME,
  CHESS_MOVE,
  RESIGNATION,
  EOF_,
};

struct ChessMove {
  int sourceRow;
  int sourceCol;
  int destinationRow;
  int destinationCol;
  std::string promotionPiece;
};

struct PlayerMove {
  PlayerMoveType outcome;
  ChessMove move;
};
