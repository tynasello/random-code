#include "queen.h"
#include <memory>
#include <vector>

QueenPiece::QueenPiece(PieceColor pc)
    : Piece{pc == PieceColor::WHITE ? "Q" : "q", 9, pc} {};

std::unique_ptr<Piece> QueenPiece::clone() const {
  return std::make_unique<QueenPiece>(*this);
}

const bool QueenPiece::isChessMoveValidForPiece(
    const ChessMove &move,
    const std::vector<std::vector<std::unique_ptr<Piece>>> &squares) const {

  if (move.sourceRow != move.destinationRow &&
      move.sourceCol != move.destinationCol &&
      std::abs(move.destinationRow - move.sourceRow) !=
          std::abs(move.destinationCol - move.sourceCol)) {
    return false;
  }

  int rowChange = (move.destinationRow > move.sourceRow)
                      ? 1
                      : ((move.destinationRow < move.sourceRow) ? -1 : 0);
  int colChange = (move.destinationCol > move.sourceCol)
                      ? 1
                      : ((move.destinationCol < move.sourceCol) ? -1 : 0);

  if (move.sourceRow != move.destinationRow ||
      move.sourceCol != move.destinationCol) {
    for (int row = move.sourceRow + rowChange, col = move.sourceCol + colChange;
         row != move.destinationRow || col != move.destinationCol;
         row += rowChange, col += colChange) {
      if (squares[row][col]->isAChessPiece()) {
        return false;
      }
    }
  }

  return true;
}
