#include "chess_game.h"
#include "computer_player.h"
#include "human_player.h"
#include "king.h"
#include "pawn.h"
#include <iomanip>
#include <sstream>

ChessGame::ChessGame()
    : m_board{Board{}}, m_display{ChessDisplay{m_board}},
      m_commandInterpreter{std::unique_ptr<CommandInterpreter>{
          std::make_unique<CommandInterpreter>()}},
      m_players{}, m_playerScores{}, m_turnIndex{0} {}

void ChessGame::completeSetupMode(bool &simulOver, bool &gameOver) {
  while (true) {
    SetupBoardMove setupMove = m_commandInterpreter->getSetupBoardMove();
    int numBlackKings = 0;
    int numWhiteKings = 0;

    switch (setupMove.outcome) {

    case SetupBoardOutcome::PLACE:
      m_board.placePiece(setupMove.pieceIdentifier, setupMove.pieceColor,
                         setupMove.row, setupMove.col);
      break;

    case SetupBoardOutcome::REMOVE:
      m_board.removePiece(setupMove.row, setupMove.col);
      break;

    case SetupBoardOutcome::SET_TURN:
      m_turnIndex = setupMove.nextTurnColor == PieceColor::WHITE ? 0 : 1;
      break;

    case SetupBoardOutcome::DONE:
      for (int row = 0; row < m_board.getBoardSize(); ++row) {
        for (int col = 0; col < m_board.getBoardSize(); ++col) {
          if (KingPiece *king = dynamic_cast<KingPiece *>(
                  m_board.getState()[row][col].get())) {
            if (king->getColor() == PieceColor::WHITE) {
              numWhiteKings += 1;
            } else if (king->getColor() == PieceColor::BLACK) {
              numBlackKings += 1;
            }
          }
        }
      }

      if (numBlackKings != 1 || numWhiteKings != 1) {
        m_display.displayMessage("Invalid setup: There must be exactly one "
                                 "white king and one black king");
        break;
      }

      if (m_board.isPlayerInCheck(PieceColor::WHITE) ||
          m_board.isPlayerInCheck(PieceColor::BLACK)) {
        m_display.displayMessage("Invalid setup: Neither king may be in check");
        break;
      }

      for (int col = 0; col < m_board.getBoardSize(); ++col) {
        if (dynamic_cast<PawnPiece *>(m_board.getState()[0][col].get()) ||
            dynamic_cast<PawnPiece *>(
                m_board.getState()[m_board.getBoardSize() - 1][col].get())) {
          m_display.displayMessage(
              "Invalid setup: No pawns are aloud on the first or last row");
          break;
        }
      }
      return;

    case SetupBoardOutcome::EOF_:
      simulOver = true;
      gameOver = true;
      return;

    default:
      break;
    }
  }
}

void ChessGame::setupNewSimul(bool &simulOver, bool &gameOver) {
  m_board.initializeBoard();
  while (true) {
    GameMove gameMove = m_commandInterpreter->getGameMove();

    switch (gameMove.outcome) {
    case GameMoveType::SETUP_START:
      m_board.notifyObservers();
      this->completeSetupMode(simulOver, gameOver);
      break;

    case GameMoveType::START_GAME:
      m_board.notifyObservers();
      m_players.clear();
      if (gameMove.startGameMove.playerOne == PlayerType::HUMAN) {
        m_players.emplace_back(std::make_unique<HumanPlayer>(
            0, PieceColor::WHITE, m_commandInterpreter.get()));
      } else {
        m_players.emplace_back(std::make_unique<ComputerPlayer>(
            0, PieceColor::WHITE, m_board, m_players,
            gameMove.startGameMove.playerOneDifficulty));
      }
      if (gameMove.startGameMove.playerTwo == PlayerType::HUMAN) {
        m_players.emplace_back(std::make_unique<HumanPlayer>(
            1, PieceColor::BLACK, m_commandInterpreter.get()));
      } else {
        m_players.emplace_back(std::make_unique<ComputerPlayer>(
            1, PieceColor::BLACK, m_board, m_players,
            gameMove.startGameMove.playerTwoDifficulty));
      }
      for (const auto &player : m_players) {
        if (m_playerScores.count(player->getId()) == 0) {
          m_playerScores[player->getId()] = 0;
        }
      }
      return;

    case GameMoveType::EOF_:
      simulOver = true;
      gameOver = true;
      return;

    default:
      break;
    }
  }
}

void ChessGame::displaySimulScore() const {
  m_display.displayMessage("Final Score:");
  for (const auto &player : m_players) {
    std::ostringstream oss;
    oss << std::fixed << std::setprecision(1)
        << m_playerScores.at(player->getId());
    m_display.displayMessage(colorToString(player->getColor()) + ": " +
                             oss.str());
  }
}

void ChessGame::handlePlayerMove(Player &player, bool &gameOver,
                                 bool &simulOver) {

  if (m_board.isPlayerInCheckMate(player.getColor())) {
    for (const auto &opponent : m_players) {
      if (opponent->getId() != player.getId()) {
        m_display.displayMessage(
            "Checkmate! " + colorToString(opponent->getColor()) + " wins!");
        m_playerScores[opponent->getId()] += 1;
      }
    };
    gameOver = true;
    return;
  }

  if (m_board.isBoardInStalemate(player.getColor())) {
    m_display.displayMessage("Stalemate!");
    for (const auto &player : m_players) {
      m_playerScores[player->getId()] += 0.5;
    }
    gameOver = true;
    return;
  }

  if (m_board.isBoardADraw()) {
    m_display.displayMessage("Draw!");
    for (const auto &player : m_players) {
      m_playerScores[player->getId()] += 0.5;
    }
    gameOver = true;
    return;
  }

  if (m_board.isPlayerInCheck(player.getColor())) {
    m_display.displayMessage(colorToString(player.getColor()) +
                             " is in check.");
  }

  // get input from player to make a move

  while (true) {
    PlayerMove playerMove = player.getMove();

    switch (playerMove.outcome) {
    case PlayerMoveType::RESIGNATION:
      for (const auto &opponent : m_players) {
        if (opponent->getId() != player.getId()) {
          m_display.displayMessage(colorToString(opponent->getColor()) +
                                   " wins!");
          m_playerScores[opponent->getId()] += 1;
        }
      };
      gameOver = true;
      return;

    case PlayerMoveType::CHESS_MOVE:
      if (m_board.isMoveValid(playerMove.move, player.getColor())) {
        m_board.makeMove(playerMove.move);
        return;
      } else {
        break;
      }

    case PlayerMoveType::EOF_:
      simulOver = true;
      gameOver = true;
      return;

    default:
      break;
    }
  }
}

void ChessGame::runSimul() {
  bool simulOver = false;
  bool gameOver = true;

  while (!simulOver) {
    m_turnIndex = 0;
    setupNewSimul(simulOver, gameOver);
    gameOver = false;

    // below is the gameplay of a single chess game

    while (!gameOver) {
      if (simulOver || gameOver) {
        break;
      }
      handlePlayerMove(*m_players[m_turnIndex].get(), gameOver, simulOver);
      m_turnIndex = (m_turnIndex + 1) % m_players.size();
    }
  }

  displaySimulScore();
}
