#include "command_interpreter.h"
#include "piece_color.h"
#include <iostream>
#include <sstream>
#include <vector>

CommandInterpreter::CommandInterpreter() : in{std::cin} {}

const PlayerMove CommandInterpreter::getPlayerMove() const {
  std::string line;

  while (true) {
    std::getline(in, line);
    PlayerMove playerMove{};

    if (in.eof()) {
      playerMove.outcome = PlayerMoveType::EOF_;
      return playerMove;
    }
    if (in.fail()) {
      continue;
    }

    std::istringstream iss(line);
    if (!parsePlayerMoveInput(iss, playerMove)) {
      continue;
    }
    return playerMove;
  }
}

const bool
CommandInterpreter::parsePlayerMoveInput(std::istringstream &iss,
                                         PlayerMove &playerMove) const {
  std::string command;
  iss >> command;

  if (command == "resign") {
    playerMove.outcome = PlayerMoveType::RESIGNATION;
    return true;
  } else if (command == "move") {
    playerMove.outcome = PlayerMoveType::CHESS_MOVE;
    std::string source;
    std::string destination;
    std::string promotionPiece;
    iss >> source >> destination >> promotionPiece;
    if (source.length() != 2 || destination.length() != 2 ||
        (promotionPiece.length() > 0 && promotionPiece.length() != 1)) {
      return false;
    }
    playerMove.move = ChessMove{std::abs(source[1] - '8'), source[0] - 'a',
                                std::abs(destination[1] - '8'),
                                destination[0] - 'a', promotionPiece};
    return true;
  }
  return false;
}

const GameMove CommandInterpreter::getGameMove() const {
  std::string line;

  while (true) {
    std::getline(in, line);
    GameMove gameMove{};

    if (in.eof()) {
      gameMove.outcome = GameMoveType::EOF_;
      return gameMove;
    }
    if (in.fail()) {
      continue;
    }

    std::istringstream iss(line);
    if (!parseGameMoveInput(iss, gameMove)) {
      continue;
    }
    return gameMove;
  }
}

const bool CommandInterpreter::parseGameMoveInput(std::istringstream &iss,
                                                  GameMove &gameMove) const {
  std::string command;
  iss >> command;

  if (command == "setup") {
    gameMove.outcome = GameMoveType::SETUP_START;
    return true;
  } else if (command == "game") {
    gameMove.outcome = GameMoveType::START_GAME;
    std::string playerOne;
    std::string playerTwo;
    iss >> playerOne >> playerTwo;
    const std::vector<std::string> acceptableGameParameters{
        "human", "computer1", "computer2", "computer3", "computer4"};

    bool playerOneIsValid = false;
    bool playerTwoIsValid = false;

    for (const auto &acceptableGameParameter : acceptableGameParameters) {
      if (playerOne == acceptableGameParameter) {
        playerOneIsValid = true;
      }
      if (playerTwo == acceptableGameParameter) {
        playerTwoIsValid = true;
      }
    }

    if (!playerOneIsValid || !playerTwoIsValid) {
      return false;
    }

    if (playerOne != "human") {
      gameMove.startGameMove.playerOne = PlayerType::COMPUTER;
      gameMove.startGameMove.playerOneDifficulty = playerOne.back() - '0';
    } else {
      gameMove.startGameMove.playerOne = PlayerType::HUMAN;
    }
    if (playerTwo != "human") {
      gameMove.startGameMove.playerTwo = PlayerType::COMPUTER;
      gameMove.startGameMove.playerTwoDifficulty = playerTwo.back() - '0';
    } else {
      gameMove.startGameMove.playerTwo = PlayerType::HUMAN;
    }
    return true;
  }
  return false;
}

const SetupBoardMove CommandInterpreter::getSetupBoardMove() const {
  std::string line;

  while (true) {
    std::getline(in, line);
    SetupBoardMove setupBoardMove{};

    if (in.eof()) {
      setupBoardMove.outcome = SetupBoardOutcome::EOF_;
      return setupBoardMove;
    }
    if (in.fail()) {
      continue;
    }

    std::istringstream iss(line);
    if (!parseSetupBoardMoveInput(iss, setupBoardMove)) {
      continue;
    }
    return setupBoardMove;
  }
}

const bool CommandInterpreter::parseSetupBoardMoveInput(
    std::istringstream &iss, SetupBoardMove &setupBoardMove) const {
  std::string command;
  iss >> command;

  if (command == "+") {
    setupBoardMove.outcome = SetupBoardOutcome::PLACE;
    std::string pieceIdentifier;
    std::string location;
    iss >> pieceIdentifier >> location;
    if (location.size() != 2 || pieceIdentifier.size() != 1) {
      return false;
    }
    PieceColor pieceColor = std::isupper(pieceIdentifier[0])
                                ? PieceColor::WHITE
                                : PieceColor::BLACK;
    pieceIdentifier = std::tolower(pieceIdentifier[0]);
    std::vector<std::string> validPieceIdentifiers{"r", "n", "b",
                                                   "q", "k", "p"};
    bool isPieceValid = false;
    for (const auto &validPieceIdentifier : validPieceIdentifiers) {
      if (validPieceIdentifier == pieceIdentifier) {
        isPieceValid = true;
        break;
      }
    }
    if (!isPieceValid) {
      return false;
    }
    setupBoardMove.pieceIdentifier = pieceIdentifier;
    setupBoardMove.pieceColor = pieceColor;
    setupBoardMove.row = std::abs(location[1] - '8');
    setupBoardMove.col = location[0] - 'a';
    if (setupBoardMove.row < 0 || setupBoardMove.row > 7 ||
        setupBoardMove.col < 0 || setupBoardMove.col > 7) {
      return false;
    }
    return true;
  } else if (command == "-") {
    setupBoardMove.outcome = SetupBoardOutcome::REMOVE;
    std::string location;
    iss >> location;
    if (location.size() != 2) {
      return false;
    }
    setupBoardMove.row = std::abs(location[1] - '8');
    setupBoardMove.col = location[0] - 'a';
    if (setupBoardMove.row < 0 || setupBoardMove.row > 7 ||
        setupBoardMove.col < 0 || setupBoardMove.col > 7) {
      return false;
    }
    return true;
  } else if (command == "=") {
    setupBoardMove.outcome = SetupBoardOutcome::SET_TURN;
    std::string nextTurnColor;
    iss >> nextTurnColor;
    if (nextTurnColor != "white" && nextTurnColor != "black") {
      return false;
    }
    setupBoardMove.nextTurnColor =
        nextTurnColor == "white" ? PieceColor::WHITE : PieceColor::BLACK;
    return true;
  } else if (command == "done") {
    setupBoardMove.outcome = SetupBoardOutcome::DONE;
    return true;
  } else {
    return false;
  }
  return false;
}
