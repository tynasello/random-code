#include "pawn.h"

PawnPiece::PawnPiece(PieceColor pc)
    : Piece{pc == PieceColor::WHITE ? "P" : "p", 1, pc},
      m_direction{pc == PieceColor::WHITE ? MoveDirection::UP
                                          : MoveDirection::DOWN} {};

const MoveDirection PawnPiece::getMoveDirection() const { return m_direction; }

std::unique_ptr<Piece> PawnPiece::clone() const {
  return std::make_unique<PawnPiece>(*this);
}

const bool PawnPiece::isChessMoveValidForPiece(
    const ChessMove &move,
    const std::vector<std::vector<std::unique_ptr<Piece>>> &squares) const {

  if (move.destinationRow - move.sourceRow < 0 &&
      m_direction != MoveDirection::UP)
    return false;
  if (move.destinationRow - move.sourceRow > 0 &&
      m_direction != MoveDirection::DOWN)
    return false;

  if (std::abs(move.destinationCol - move.sourceCol) == 1) {
    // diagonal capture
    if (std::abs(move.destinationRow - move.sourceRow) == 1) {
      if (!squares[move.destinationRow][move.destinationCol]->isAChessPiece()) {
        return false;
      }
    } else {
      return false;
    }
  } else {
    // pawn is moving forward
    if (move.destinationCol != move.sourceCol) {
      return false;
    }

    if (squares[move.destinationRow][move.destinationCol]->isAChessPiece()) {
      return false;
    }

    if (std::abs(move.destinationRow - move.sourceRow) == 2) {
      int direction = ((move.destinationRow - move.sourceRow) < 0 ? -1 : 1);
      if (this->getHasPieceMoved() ||
          squares[move.sourceRow + direction][move.sourceCol]
              ->isAChessPiece()) {
        return false;
      }
    } else if (std::abs(move.destinationRow - move.sourceRow) != 1) {
      return false;
    }
  }

  return true;
}
