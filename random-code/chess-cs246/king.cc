#include "king.h"
#include "rook.h"

KingPiece::KingPiece(PieceColor pc)
    : Piece{pc == PieceColor::WHITE ? "K" : "k", 0, pc} {};

std::unique_ptr<Piece> KingPiece::clone() const {
  return std::make_unique<KingPiece>(*this);
}

const bool KingPiece::isChessMoveValidForPiece(
    const ChessMove &move,
    const std::vector<std::vector<std::unique_ptr<Piece>>> &squares) const {

  // castling
  if (!getHasPieceMoved() &&
      squares[move.sourceRow][move.sourceCol]->getColor() ==
          squares[move.destinationRow][move.destinationCol]->getColor() &&
      dynamic_cast<RookPiece *>(
          squares[move.destinationRow][move.destinationCol].get()) &&
      !squares[move.destinationRow][move.destinationCol]->getHasPieceMoved())
    return true;

  if (std::abs(move.destinationRow - move.sourceRow) > 1 ||
      std::abs(move.destinationCol - move.sourceCol) > 1) {
    return false;
  }

  return true;
}
