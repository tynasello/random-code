#include "rook.h"
#include <memory>
#include <vector>

RookPiece::RookPiece(PieceColor pc)
    : Piece{pc == PieceColor::WHITE ? "R" : "r", 5, pc} {};

std::unique_ptr<Piece> RookPiece::clone() const {
  return std::make_unique<RookPiece>(*this);
}

const bool RookPiece::isChessMoveValidForPiece(
    const ChessMove &move,
    const std::vector<std::vector<std::unique_ptr<Piece>>> &squares) const {

  if (move.sourceRow != move.destinationRow &&
      move.sourceCol != move.destinationCol) {
    return false;
  }

  int rowChange = (move.destinationRow > move.sourceRow)
                      ? 1
                      : ((move.destinationRow < move.sourceRow) ? -1 : 0);
  int colChange = (move.destinationCol > move.sourceCol)
                      ? 1
                      : ((move.destinationCol < move.sourceCol) ? -1 : 0);

  for (int row = move.sourceRow + rowChange, col = move.sourceCol + colChange;
       row != move.destinationRow || col != move.destinationCol;
       row += rowChange, col += colChange) {
    if (squares[row][col]->isAChessPiece()) {
      return false;
    }
  }

  return true;
}
