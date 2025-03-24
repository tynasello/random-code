#pragma once

#include "board.h"

class DisplayMedium {
public:
  virtual void
  draw(const std::vector<std::vector<std::unique_ptr<Piece>>> &board) = 0;
  virtual void write(const std::string message) const = 0;
  virtual ~DisplayMedium() = default;
};
