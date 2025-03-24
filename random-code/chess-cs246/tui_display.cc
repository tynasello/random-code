#include "tui_display.h"
#include <iostream>

TuiDisplay::TuiDisplay() : m_out{std::cout} {}

void TuiDisplay::draw(
    const std::vector<std::vector<std::unique_ptr<Piece>>> &board) {

  m_out << "\n   ";
  for (size_t col = 0; col < board[0].size(); ++col) {
    m_out << static_cast<char>('a' + col) << " ";
  }
  m_out << "\n\n";
  for (size_t row = 0; row < board.size(); ++row) {
    m_out << board.size() - row << "  ";
    for (size_t col = 0; col < board[row].size(); ++col) {
      m_out << board[row][col]->getId() << " ";
    }
    m_out << " " << board.size() - row;
    m_out << "\n";
  }

  m_out << "\n   ";
  for (size_t col = 0; col < board[0].size(); ++col) {
    m_out << static_cast<char>('a' + col) << " ";
  }
  m_out << "\n" << std::endl;
}

void TuiDisplay::write(const std::string message) const {
  m_out << message << std::endl;
}

TuiDisplay::~TuiDisplay() {}
