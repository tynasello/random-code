#pragma once

#include "board.h"

class ComputerPlayer : public Player {
  Board &m_board;
  std::vector<std::unique_ptr<Player>> &m_players;
  int m_difficultyLevel;
  PlayerMove makeLevelOneMove() const;
  PlayerMove makeLevelTwoMove() const;
  PlayerMove makeLevelThreeMove() const;
  PlayerMove makeLevelFourMove() const;

public:
  ComputerPlayer(int id, PieceColor pieceColor, Board &board,
                 std::vector<std::unique_ptr<Player>> &players,
                 int difficultyLevel);
  virtual ~ComputerPlayer() override;
  virtual PlayerMove getMove() override;
};
