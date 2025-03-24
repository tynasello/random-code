#include "piece.h"
#include <memory>

Piece::Piece(std::string id, int value, PieceColor color)
    : m_id{id}, m_value{value}, m_color{color} {}

const std::string Piece::getId() const { return this->m_id; }

const int Piece::getValue() const { return this->m_value; }

const PieceColor Piece::getColor() const { return this->m_color; }

const bool Piece::getHasPieceMoved() const { return this->m_hasPieceMoved; }

void Piece::setHasPieceMoved() { this->m_hasPieceMoved = true; }

const bool Piece::isAChessPiece() const { return true; }
