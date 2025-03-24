#pragma once

#include "piece.h"
#include <memory>

class QueenPiece : public Piece {

public:
  QueenPiece(PieceColor pc);
  virtual std::unique_ptr<Piece> clone() const override;
  virtual const bool isChessMoveValidForPiece(
      const ChessMove &move,
      const std::vector<std::vector<std::unique_ptr<Piece>>> &squares)
      const override;
};
