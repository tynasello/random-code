#include "computer_player.h"
#include "board.h"
#include "queen.h"
#include <random>

ComputerPlayer::ComputerPlayer(int id, PieceColor pieceColor, Board &board,
                               std::vector<std::unique_ptr<Player>> &players,
                               int difficultyLevel)
    : Player(id, pieceColor), m_board{board}, m_players{players},
      m_difficultyLevel{difficultyLevel} {}

ComputerPlayer::~ComputerPlayer() {}

PlayerMove ComputerPlayer::makeLevelOneMove() const {
  std::vector<ChessMove> legalMoves;

  for (int sourceRow = 0; sourceRow < m_board.getBoardSize(); ++sourceRow) {
    for (int sourceCol = 0; sourceCol < m_board.getBoardSize(); ++sourceCol) {
      for (int destinationRow = 0; destinationRow < m_board.getBoardSize();
           ++destinationRow) {
        for (int destinationCol = 0; destinationCol < m_board.getBoardSize();
             ++destinationCol) {
          const ChessMove move{sourceRow, sourceCol, destinationRow,
                               destinationCol};
          if (m_board.isMoveValid(move, getColor())) {
            legalMoves.emplace_back(move);
          }
        }
      }
    }
  }

  std::random_device rd;
  std::mt19937 gen(rd());

  std::uniform_int_distribution<> distribution(0, legalMoves.size() - 1);
  int randomLegalMoveIndex = distribution(gen);
  return PlayerMove{PlayerMoveType::CHESS_MOVE,
                    legalMoves[randomLegalMoveIndex]};
}

PlayerMove ComputerPlayer::makeLevelTwoMove() const {
  std::vector<ChessMove> legalMoves;
  std::vector<ChessMove> prioritizedMoves;

  for (int sourceRow = 0; sourceRow < m_board.getBoardSize(); ++sourceRow) {
    for (int sourceCol = 0; sourceCol < m_board.getBoardSize(); ++sourceCol) {
      for (int destinationRow = 0; destinationRow < m_board.getBoardSize();
           ++destinationRow) {
        for (int destinationCol = 0; destinationCol < m_board.getBoardSize();
             ++destinationCol) {
          const ChessMove move{sourceRow, sourceCol, destinationRow,
                               destinationCol};
          if (m_board.isMoveValid(move, getColor())) {
            // move is valid
            legalMoves.emplace_back(move);
            if (m_board.getState()[destinationRow][destinationCol]
                    ->isAChessPiece() &&
                m_board.getState()[destinationRow][destinationCol]
                        ->getColor() != getColor()) {
              // move captures an opponents piece
              prioritizedMoves.emplace_back(move);
            } else {
              Board tmpBoard = m_board;
              tmpBoard.makeMove(move);
              for (const auto &opponent : m_players) {
                if (opponent->getColor() != getColor() &&
                    tmpBoard.isPlayerInCheck(opponent->getColor())) {
                  // move puts opponent into check
                  prioritizedMoves.emplace_back(move);
                }
              }
            }
          }
        }
      }
    }
  }

  std::random_device rd;
  std::mt19937 gen(rd());

  if (prioritizedMoves.size() != 0) {
    std::uniform_int_distribution<> distribution(0,
                                                 prioritizedMoves.size() - 1);
    int randomPrioritizedMoveIndex = distribution(gen);
    return PlayerMove{PlayerMoveType::CHESS_MOVE,
                      prioritizedMoves[randomPrioritizedMoveIndex]};
  } else {
    std::uniform_int_distribution<> distribution(0, legalMoves.size() - 1);
    int randomLegalMoveIndex = distribution(gen);
    return PlayerMove{PlayerMoveType::CHESS_MOVE,
                      legalMoves[randomLegalMoveIndex]};
  }
}

PlayerMove ComputerPlayer::makeLevelThreeMove() const {
  std::vector<ChessMove> legalMoves;
  std::vector<ChessMove> prioritizedMoves;

  for (int sourceRow = 0; sourceRow < m_board.getBoardSize(); ++sourceRow) {
    for (int sourceCol = 0; sourceCol < m_board.getBoardSize(); ++sourceCol) {
      for (int destinationRow = 0; destinationRow < m_board.getBoardSize();
           ++destinationRow) {
        for (int destinationCol = 0; destinationCol < m_board.getBoardSize();
             ++destinationCol) {
          const ChessMove move{sourceRow, sourceCol, destinationRow,
                               destinationCol};
          if (m_board.isMoveValid(move, getColor())) {
            // move is valid
            legalMoves.emplace_back(move);
            if (m_board.getState()[destinationRow][destinationCol]
                    ->isAChessPiece() &&
                m_board.getState()[destinationRow][destinationCol]
                        ->getColor() != getColor()) {
              // move captures an opponents piece
              prioritizedMoves.emplace_back(move);
            } else if (m_board.isPieceUnderAttack(sourceRow, sourceCol)) {
              // piece is under attack
              Board tmpBoard = m_board;
              tmpBoard.makeMove(move);
              if (!tmpBoard.isPieceUnderAttack(destinationRow,
                                               destinationCol)) {
                // piece is no longer under attack after hypothetical move
                prioritizedMoves.emplace_back(move);
              }

            } else {
              Board tmpBoard = m_board;
              tmpBoard.makeMove(move);
              for (const auto &opponent : m_players) {
                if (opponent->getColor() != getColor() &&
                    tmpBoard.isPlayerInCheck(getColor())) {
                  // move puts opponent into check
                  prioritizedMoves.emplace_back(move);
                }
              }
            }
          }
        }
      }
    }
  }

  std::random_device rd;
  std::mt19937 gen(rd());

  if (prioritizedMoves.size() != 0) {
    std::uniform_int_distribution<> distribution(0,
                                                 prioritizedMoves.size() - 1);
    int randomPrioritizedMoveIndex = distribution(gen);
    return PlayerMove{PlayerMoveType::CHESS_MOVE,
                      prioritizedMoves[randomPrioritizedMoveIndex]};
  } else {
    std::uniform_int_distribution<> distribution(0, legalMoves.size() - 1);
    int randomLegalMoveIndex = distribution(gen);
    return PlayerMove{PlayerMoveType::CHESS_MOVE,
                      legalMoves[randomLegalMoveIndex]};
  }
}

PlayerMove ComputerPlayer::makeLevelFourMove() const {
  std::vector<ChessMove> prioritizedMoves;
  int theoreticalValueCap = 100;
  int maxValueOfMove = theoreticalValueCap * -1;

  for (int sourceRow = 0; sourceRow < m_board.getBoardSize(); ++sourceRow) {
    for (int sourceCol = 0; sourceCol < m_board.getBoardSize(); ++sourceCol) {
      for (int destinationRow = 0; destinationRow < m_board.getBoardSize();
           ++destinationRow) {
        for (int destinationCol = 0; destinationCol < m_board.getBoardSize();
             ++destinationCol) {
          const ChessMove move{sourceRow, sourceCol, destinationRow,
                               destinationCol};
          if (m_board.isMoveValid(move, getColor())) {
            int valueOfMove = 0;

            // if we are in check, we must get out of it
            Board tmpInCheckBoard = m_board;
            if (tmpInCheckBoard.isPlayerInCheck(getColor())) {
              tmpInCheckBoard.makeMove(move);
              if (!tmpInCheckBoard.isPlayerInCheck(getColor())) {
                valueOfMove += theoreticalValueCap;
              }
            }

            // captures an opponents piece
            if (m_board.getState()[destinationRow][destinationCol]
                    ->isAChessPiece() &&
                m_board.getState()[destinationRow][destinationCol]
                        ->getColor() != getColor()) {
              valueOfMove +=
                  m_board.getState()[sourceRow][sourceCol]->getValue();
            }

            // move puts piece in danger
            Board tmpDangerBoard = m_board;
            tmpDangerBoard.makeMove(move);
            if (tmpDangerBoard.isPieceUnderAttack(destinationRow,
                                                  destinationCol)) {
              valueOfMove -=
                  m_board.getState()[sourceRow][sourceCol]->getValue();
            }

            // avoid capture
            if (m_board.isPieceUnderAttack(sourceRow, sourceCol)) {
              Board tmpAvoidBoard = m_board;
              tmpAvoidBoard.makeMove(move);
              if (!tmpAvoidBoard.isPieceUnderAttack(destinationRow,
                                                    destinationCol)) {
                valueOfMove +=
                    m_board.getState()[sourceRow][sourceCol]->getValue();
              }
            }

            if (m_board.isPawnPromotionAllowed(move)) {
              valueOfMove += QueenPiece{PieceColor::EMPTY}.getValue();
            }

            // move puts opponent king in check
            Board tmpCheckBoard = m_board;
            tmpCheckBoard.makeMove(move);
            for (const auto &opponent : m_players) {
              if (opponent->getColor() != getColor() &&
                  tmpCheckBoard.isPlayerInCheck(opponent->getColor())) {
                valueOfMove += 2;
              }
            }

            if (valueOfMove == maxValueOfMove) {
              prioritizedMoves.emplace_back(move);
            } else if (valueOfMove > maxValueOfMove) {
              prioritizedMoves.clear();
              prioritizedMoves.emplace_back(move);
              maxValueOfMove = valueOfMove;
            }
          }
        }
      }
    }
  }

  std::random_device rd;
  std::mt19937 gen(rd());
  std::uniform_int_distribution<> distribution(0, prioritizedMoves.size() - 1);
  int randomPrioritizedMoveIndex = distribution(gen);
  return PlayerMove{PlayerMoveType::CHESS_MOVE,
                    prioritizedMoves[randomPrioritizedMoveIndex]};
}

PlayerMove ComputerPlayer::getMove() {
  switch (m_difficultyLevel) {
  case 1:
    return makeLevelOneMove();
  case 2:
    return makeLevelTwoMove();
  case 3:
    return makeLevelThreeMove();
  case 4:
    return makeLevelFourMove();
  default:
    return PlayerMove{};
  }
}
