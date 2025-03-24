#include "piece_color.h"

std::string colorToString(PieceColor color) {
  switch (color) {
  case PieceColor::WHITE:
    return "White";
  case PieceColor::BLACK:
    return "Black";
  default:
    return "Unknown";
  }
}
