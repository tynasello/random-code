#pragma once

#include "board.h"
#include "display_medium.h"
#include "observer.h"
#include <memory>
#include <string>
#include <vector>

class ChessDisplay : public Observer {
  Board &board;
  std::vector<std::unique_ptr<DisplayMedium>> displays;

public:
  ChessDisplay(Board &b);
  ~ChessDisplay();
  virtual void notify() const;
  void displayMessage(const std::string message) const;
};
