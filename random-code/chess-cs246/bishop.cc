#include "bishop.h"

BishopPiece::BishopPiece(PieceColor pc)
    : Piece{pc == PieceColor::WHITE ? "B" : "b", 3, pc} {};

std::unique_ptr<Piece> BishopPiece::clone() const {
  return std::make_unique<BishopPiece>(*this);
}

const bool BishopPiece::isChessMoveValidForPiece(
    const ChessMove &move,
    const std::vector<std::vector<std::unique_ptr<Piece>>> &squares) const {
  if (std::abs(move.destinationRow - move.sourceRow) !=
      std::abs(move.destinationCol - move.sourceCol)) {
    return false;
  }

  int rowChange = (move.destinationRow > move.sourceRow) ? 1 : -1;
  int colChange = (move.destinationCol > move.sourceCol) ? 1 : -1;

  for (int row = move.sourceRow + rowChange, col = move.sourceCol + colChange;
       row != move.destinationRow || col != move.destinationCol;
       row += rowChange, col += colChange) {
    if (squares[row][col]->isAChessPiece()) {
      return false;
    }
  }

  return true;
}
