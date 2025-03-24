#pragma once

#include "piece.h"

class EmptyPiece : public Piece {

public:
  EmptyPiece();
  virtual std::unique_ptr<Piece> clone() const override;
  virtual const bool isChessMoveValidForPiece(
      const ChessMove &move,
      const std::vector<std::vector<std::unique_ptr<Piece>>> &squares)
      const override;
  virtual const bool isAChessPiece() const override;
};
