#include "gui_display.h"

GuiDisplay::GuiDisplay(int boardSize)
    : m_boardSize{boardSize}, m_window{std::make_unique<Xwindow>()} {
  DrawBoardLayout();
};

void GuiDisplay::draw(
    const std::vector<std::vector<std::unique_ptr<Piece>>> &board) {

  for (size_t row = 0; row < board.size(); ++row) {
    if (board.size() != m_previouslyDisplayedBoard.size()) {
      m_previouslyDisplayedBoard.resize(board.size());
    }
    for (size_t col = 0; col < board.size(); ++col) {
      if (board[col].size() != m_previouslyDisplayedBoard[col].size()) {
        m_previouslyDisplayedBoard[col].resize(board[col].size());
      }
      std::string pieceId = board[row][col].get()->getId();
      if (m_previouslyDisplayedBoard[row][col] != pieceId) {
        m_window->fillRectangle(
            (col + col + BORDER_OFFSET) * GRID_RATIO - GRID_RATIO / 2,
            (row + row + BORDER_OFFSET) * GRID_RATIO - GRID_RATIO,
            1.5 * GRID_RATIO, 1.5 * GRID_RATIO,
            (row + col) % 2 == 0 ? Xwindow::White : Xwindow::Green);
        m_window->drawString((col + col + BORDER_OFFSET) * GRID_RATIO,
                             (row + row + BORDER_OFFSET) * GRID_RATIO, pieceId);
        m_previouslyDisplayedBoard[row][col] = pieceId;
      }
    }
  }
}

void GuiDisplay::DrawBoardLayout() const {
  for (int col = 0; col < m_boardSize; ++col) {
    m_window->drawString((col + col + BORDER_OFFSET) * GRID_RATIO,
                         1 * GRID_RATIO,
                         std::string{static_cast<char>('a' + col)});
    m_window->drawString((col + col + BORDER_OFFSET) * GRID_RATIO,
                         (m_boardSize + COL_OFFSET + 2 * BORDER_OFFSET) *
                             GRID_RATIO,
                         std::string{static_cast<char>('a' + col)});
  }
  for (int row = 0; row < m_boardSize; ++row) {
    m_window->drawString(1 * GRID_RATIO,
                         (row + row + BORDER_OFFSET) * GRID_RATIO,
                         std::to_string(m_boardSize - row));
    m_window->drawString((m_boardSize + COL_OFFSET + 2 * BORDER_OFFSET) *
                             GRID_RATIO,
                         (row + row + BORDER_OFFSET) * GRID_RATIO,
                         std::to_string(m_boardSize - row));
  }
  for (int col = 0; col < m_boardSize; ++col) {
    for (int row = 0; row < m_boardSize; ++row) {
      m_window->fillRectangle(
          (col + col + BORDER_OFFSET) * GRID_RATIO - GRID_RATIO / 2,
          (row + row + BORDER_OFFSET) * GRID_RATIO - GRID_RATIO,
          1.5 * GRID_RATIO, 1.5 * GRID_RATIO,
          (col + row) % 2 == 0 ? Xwindow::White : Xwindow::Green);
    }
  }
}

void GuiDisplay::write(const std::string message) const {
  m_window->fillRectangle(
      0, (m_boardSize + COL_OFFSET + 2 * BORDER_OFFSET) * GRID_RATIO,
      GRID_RATIO * 50, 10 * GRID_RATIO, Xwindow::White);
  m_window->drawString(
      0, (m_boardSize + COL_OFFSET + 3 * BORDER_OFFSET) * GRID_RATIO, message);
}
