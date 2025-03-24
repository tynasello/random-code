#include "player.h"

Player::Player(int id, PieceColor pieceColor)
    : m_id{id}, m_pieceColor{pieceColor} {}
const int Player::getId() const { return this->m_id; }
const PieceColor Player::getColor() const { return this->m_pieceColor; }
