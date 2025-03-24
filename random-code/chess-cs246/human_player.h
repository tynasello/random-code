#pragma once

#include "command_interpreter.h"
#include "player.h"

class HumanPlayer : public Player {
  CommandInterpreter *commandInterpreter;

public:
  HumanPlayer(int id, PieceColor pc, CommandInterpreter *ci);
  virtual PlayerMove getMove() override;
  virtual ~HumanPlayer() override;
};
