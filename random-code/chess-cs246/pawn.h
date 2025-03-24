#pragma once

#include "chess_move.h"
#include "move_direction.h"
#include "piece.h"

class PawnPiece : public Piece {
  MoveDirection m_direction;

public:
  PawnPiece(PieceColor pc);
  const MoveDirection getMoveDirection() const;
  virtual std::unique_ptr<Piece> clone() const override;
  virtual const bool isChessMoveValidForPiece(
      const ChessMove &move,
      const std::vector<std::vector<std::unique_ptr<Piece>>> &squares)
      const override;
};
