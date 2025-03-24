#include "chess_display.h"
#include "gui_display.h"
#include "tui_display.h"

ChessDisplay::ChessDisplay(Board &board) : board{board} {
  board.attach(this);
  displays.emplace_back(std::make_unique<TuiDisplay>());
  displays.emplace_back(std::make_unique<GuiDisplay>(board.getBoardSize()));
}

void ChessDisplay::notify() const {
  for (const auto &display : this->displays)
    display->draw(board.getState());
}

void ChessDisplay::displayMessage(const std::string message) const {
  for (const auto &display : this->displays)
    display->write(message);
}

ChessDisplay::~ChessDisplay() {}
