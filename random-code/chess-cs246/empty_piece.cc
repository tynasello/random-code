#include "empty_piece.h"

EmptyPiece::EmptyPiece() : Piece{"_", 0, PieceColor::EMPTY} {};

std::unique_ptr<Piece> EmptyPiece::clone() const {
  return std::make_unique<EmptyPiece>(*this);
}

const bool EmptyPiece::isChessMoveValidForPiece(
    const ChessMove &,
    const std::vector<std::vector<std::unique_ptr<Piece>>> &) const {
  return false;
}

const bool EmptyPiece::isAChessPiece() const { return false; }
