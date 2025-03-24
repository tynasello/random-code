#pragma once

#include "chess_move.h"
#include "piece.h"
#include <vector>

class Player {
  int m_id;
  PieceColor m_pieceColor;

public:
  Player(int id, PieceColor pieceColor);
  const int getId() const;
  const PieceColor getColor() const;
  virtual PlayerMove getMove() = 0;
  virtual ~Player() = default;
};
