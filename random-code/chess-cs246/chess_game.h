#pragma once

#include "board.h"
#include "chess_display.h"
#include "command_interpreter.h"
#include <map>
#include <string>
#include <vector>

class ChessGame {
  Board m_board;
  const ChessDisplay m_display;
  const std::unique_ptr<CommandInterpreter> m_commandInterpreter;
  std::vector<std::unique_ptr<Player>> m_players;
  std::map<int, float> m_playerScores;
  int m_turnIndex;
  void setupNewSimul(bool &gameOver, bool &simulOver);
  void completeSetupMode(bool &gameOver, bool &simulOver);
  void displaySimulScore() const;
  void handlePlayerMove(Player &player, bool &gameOver, bool &simulOver);

public:
  ChessGame();
  void runSimul();
};
