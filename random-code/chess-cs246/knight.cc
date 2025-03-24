#include "knight.h"

KnightPiece::KnightPiece(PieceColor pc)
    : Piece{pc == PieceColor::WHITE ? "N" : "n", 3, pc} {};

std::unique_ptr<Piece> KnightPiece::clone() const {
  return std::make_unique<KnightPiece>(*this);
}

const bool KnightPiece::isChessMoveValidForPiece(
    const ChessMove &move,
    const std::vector<std::vector<std::unique_ptr<Piece>>> &squares) const {

  int rowDistance = std::abs(move.destinationRow - move.sourceRow);
  int colDistance = std::abs(move.destinationCol - move.sourceCol);

  if (!((rowDistance == 2 && colDistance == 1) ||
        (rowDistance == 1 && colDistance == 2))) {
    return false;
  }

  return true;
}
