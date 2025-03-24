#pragma once

#include "piece_color.h"
#include "player_move.h"
#include <memory>
#include <string>
#include <vector>

class Piece {
  const std::string m_id;
  int m_value;
  const PieceColor m_color;
  bool m_hasPieceMoved = false;

public:
  Piece(std::string id, int value, PieceColor color);
  virtual ~Piece() = default;
  virtual std::unique_ptr<Piece> clone() const = 0;
  const std::string getId() const;
  const int getValue() const;
  const PieceColor getColor() const;
  const bool getHasPieceMoved() const;
  void setHasPieceMoved();
  virtual const bool isAChessPiece() const;
  virtual const bool isChessMoveValidForPiece(
      const ChessMove &move,
      const std::vector<std::vector<std::unique_ptr<Piece>>> &squares)
      const = 0;
};
