#pragma once

#include "chess_move.h"
#include "player_move.h"
#include "setup_move.h"
#include <istream>
#include <string>

class CommandInterpreter {
  std::istream &in;

  const bool parsePlayerMoveInput(std::istringstream &iss,
                                  PlayerMove &playerMove) const;
  const bool parseGameMoveInput(std::istringstream &iss,
                                GameMove &gameMove) const;
  const bool parseSetupBoardMoveInput(std::istringstream &iss,
                                      SetupBoardMove &setupBoardMove) const;

public:
  CommandInterpreter();
  const PlayerMove getPlayerMove() const;
  const GameMove getGameMove() const;
  const SetupBoardMove getSetupBoardMove() const;
};
