#include "human_player.h"

HumanPlayer::HumanPlayer(int id, PieceColor pc, CommandInterpreter *ci)
    : Player(id, pc), commandInterpreter{ci} {}

HumanPlayer::~HumanPlayer() {}

PlayerMove HumanPlayer::getMove() {
  return this->commandInterpreter->getPlayerMove();
}
