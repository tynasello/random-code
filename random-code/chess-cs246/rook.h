#pragma once

#include "piece.h"
#include "player_move.h"
#include <memory>

class RookPiece : public Piece {

public:
  RookPiece(PieceColor pc);
  virtual std::unique_ptr<Piece> clone() const override;
  virtual const bool isChessMoveValidForPiece(
      const ChessMove &move,
      const std::vector<std::vector<std::unique_ptr<Piece>>> &squares)
      const override;
};
