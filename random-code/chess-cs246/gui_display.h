#pragma once

#include "display_medium.h"
#include "window.h"

class GuiDisplay : public DisplayMedium {
  const int GRID_RATIO = 10;
  const int COL_OFFSET = 5;
  const int BORDER_OFFSET = 3;
  const int m_boardSize;
  std::vector<std::vector<std::string>> m_previouslyDisplayedBoard;
  std::unique_ptr<Xwindow> m_window;
  void DrawBoardLayout() const;

public:
  GuiDisplay(int boardSize);
  virtual void
  draw(const std::vector<std::vector<std::unique_ptr<Piece>>> &board) override;
  virtual void write(const std::string message) const override;
};
