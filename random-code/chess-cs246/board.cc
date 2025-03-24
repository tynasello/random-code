#include "board.h"
#include "bishop.h"
#include "empty_piece.h"
#include "king.h"
#include "knight.h"
#include "pawn.h"
#include "piece_color.h"
#include "player.h"
#include "queen.h"
#include "rook.h"

Board::Board() {
  m_squares.resize(m_boardSize);
  for (int row = 0; row < m_boardSize; ++row) {
    m_squares[row].resize(m_boardSize);
    for (int col = 0; col < m_boardSize; ++col) {
      m_squares[row][col] = std::make_unique<EmptyPiece>();
    }
  }
}

Board::Board(const Board &other) : Subject(), m_boardSize(other.m_boardSize) {
  m_squares.resize(m_boardSize);
  for (int row = 0; row < m_boardSize; ++row) {
    m_squares[row].resize(m_boardSize);
    for (int col = 0; col < m_boardSize; ++col) {
      m_squares[row][col] = other.m_squares[row][col]->clone();
    }
  }
}

const int &Board::getBoardSize() const { return m_boardSize; }

const std::vector<std::vector<std::unique_ptr<Piece>>> &
Board::getState() const {
  return m_squares;
}

void Board::placePiece(std::string pieceId, PieceColor pieceColor,
                       const int row, const int col) {
  if (pieceId == "r") {
    m_squares[row][col] = std::make_unique<RookPiece>(pieceColor);
  } else if (pieceId == "n") {
    m_squares[row][col] = std::make_unique<KnightPiece>(pieceColor);
  } else if (pieceId == "b") {
    m_squares[row][col] = std::make_unique<BishopPiece>(pieceColor);
  } else if (pieceId == "q") {
    m_squares[row][col] = std::make_unique<QueenPiece>(pieceColor);
  } else if (pieceId == "k") {
    m_squares[row][col] = std::make_unique<KingPiece>(pieceColor);
  } else if (pieceId == "p") {
    m_squares[row][col] = std::make_unique<PawnPiece>(pieceColor);
  }
  m_squares[row][col]->setHasPieceMoved();
  notifyObservers();
}

void Board::removePiece(const int row, const int col) {
  m_squares[row][col] = std::make_unique<EmptyPiece>();
  notifyObservers();
}

const bool Board::isPlayerInCheck(const PieceColor &playerColor) const {
  bool kingFound = false;
  int kingRow;
  int kingCol;
  for (int row = 0; row < m_boardSize; ++row) {
    for (int col = 0; col < m_boardSize; ++col) {
      if (dynamic_cast<KingPiece *>(m_squares[row][col].get()) &&
          m_squares[row][col]->getColor() == playerColor) {
        kingFound = true;
        kingRow = row;
        kingCol = col;
        break;
      }
    }
  }
  if (!kingFound) {
    return false;
  }

  for (int row = 0; row < m_boardSize; ++row) {
    for (int col = 0; col < m_boardSize; ++col) {
      const ChessMove move{row, col, kingRow, kingCol};
      if (playerColor !=
              m_squares[move.sourceRow][move.sourceCol]->getColor() &&
          m_squares[move.sourceRow][move.sourceCol]->isChessMoveValidForPiece(
              move, m_squares)) {
        return true;
      }
    }
  }
  return false;
}

const bool Board::isPlayerInCheckMate(const PieceColor &playerColor) const {
  if (!isPlayerInCheck(playerColor))
    return false;

  for (int sourceRow = 0; sourceRow < m_boardSize; ++sourceRow) {
    for (int sourceCol = 0; sourceCol < m_boardSize; ++sourceCol) {
      for (int destinationRow = 0; destinationRow < m_boardSize;
           ++destinationRow) {
        for (int destinationCol = 0; destinationCol < m_boardSize;
             ++destinationCol) {
          const ChessMove move{sourceRow, sourceCol, destinationRow,
                               destinationCol};
          if (isMoveValid(move, playerColor)) {
            return false;
          }
        }
      }
    }
  }
  return true;
}

const bool Board::movePutsPlayerInCheck(const PieceColor &playerColor,
                                        const ChessMove &move) const {
  Board tmpBoard{*this};
  tmpBoard.makeMove(move);
  return tmpBoard.isPlayerInCheck(playerColor);
}

const bool Board::isBoardInStalemate(const PieceColor &playerColor) const {
  if (isPlayerInCheck(playerColor)) {
    return false;
  }
  for (int sourceRow = 0; sourceRow < m_boardSize; ++sourceRow) {
    for (int sourceCol = 0; sourceCol < m_boardSize; ++sourceCol) {
      for (int destinationRow = 0; destinationRow < m_boardSize;
           ++destinationRow) {
        for (int destinationCol = 0; destinationCol < m_boardSize;
             ++destinationCol) {
          const ChessMove move{sourceRow, sourceCol, destinationRow,
                               destinationCol};
          if (isMoveValid(move, playerColor)) {
            return false;
          }
        }
      }
    }
  }
  return true;
}

const bool Board::isPieceUnderAttack(const int row, const int col) const {
  for (int sourceRow = 0; sourceRow < m_boardSize; ++sourceRow) {
    for (int sourceCol = 0; sourceCol < m_boardSize; ++sourceCol) {
      const ChessMove move{sourceRow, sourceCol, row, col};
      for (int colorIndex = 0; colorIndex < static_cast<int>(PieceColor::Count);
           ++colorIndex) {
        std::vector<int> enPassentRowOffsets{1, -1};
        for (auto offset : enPassentRowOffsets) {
          if (isMoveValid(ChessMove{sourceRow, sourceCol, row + offset, col},
                          static_cast<PieceColor>(colorIndex)) &&
              isEnPassentAllowed(
                  ChessMove{sourceRow, sourceCol, row + offset, col})) {
            return true;
          }
        }
        if (isMoveValid(move, static_cast<PieceColor>(colorIndex))) {
          return true;
        }
      }
    }
  }
  return false;
}

const bool Board::isBoardADraw() const {
  int numPiecesOnBoard = 0;
  for (int row = 0; row < m_boardSize; ++row) {
    for (int col = 0; col < m_boardSize; ++col) {
      if (m_squares[row][col]->isAChessPiece())
        numPiecesOnBoard += 1;
      if (numPiecesOnBoard > 2)
        return false;
    }
  }
  return true;
}

const bool Board::isMoveValid(const ChessMove &move,
                              const PieceColor &playerColor) const {
  // ensure move is within board boundaries
  if (move.destinationCol < 0 || move.destinationCol >= m_boardSize ||
      move.destinationRow < 0 || move.destinationRow >= m_boardSize ||
      move.sourceCol < 0 || move.sourceCol >= m_boardSize ||
      move.sourceRow < 0 || move.sourceRow >= m_boardSize) {
    return false;
  }
  // ensure move covers a distance
  if (move.sourceRow == move.destinationRow &&
      move.sourceCol == move.destinationCol) {
    return false;
  }
  // ensure a player can only move their own piece
  if (playerColor != m_squares[move.sourceRow][move.sourceCol]->getColor()) {
    return false;
  }
  // ensure the move is valid for the current piece
  if (!m_squares[move.sourceRow][move.sourceCol]->isChessMoveValidForPiece(
          move, m_squares) &&
      !isEnPassentAllowed(move) && !isCastleAllowed(move)) {
    return false;
  }
  // ensure we are not taking our own piece
  if (playerColor ==
          m_squares[move.destinationRow][move.destinationCol]->getColor() &&
      !isCastleAllowed(move)) {
    return false;
  }
  // ensure move will not put player in check
  if (movePutsPlayerInCheck(playerColor, move)) {
    return false;
  }
  return true;
}

const bool Board::isCastleAllowed(const ChessMove &move) const {
  int colChange = (move.destinationCol > move.sourceCol) ? 1 : -1;
  int rookCol = (move.destinationCol > move.sourceCol) ? 7 : 0;
  if (move.destinationRow != move.sourceRow) {
    return false;
  }

  RookPiece *rook;
  KingPiece *king;
  if (!(king = dynamic_cast<KingPiece *>(
            m_squares[move.sourceRow][move.sourceCol].get())) ||
      !(rook = dynamic_cast<RookPiece *>(
            m_squares[move.destinationRow][rookCol].get()))) {
    return false;
  }

  if (rook->getColor() != king->getColor() || rook->getHasPieceMoved() ||
      king->getHasPieceMoved()) {
    return false;
  }

  for (int row = move.sourceRow, col = move.sourceCol + colChange;
       col != rookCol; col += colChange) {
    if (m_squares[row][col]->isAChessPiece()) {
      return false;
    }
  }
  if (isPieceUnderAttack(move.sourceRow, move.sourceCol)) {
    return false;
  }

  Board tmpBoard = *this;
  tmpBoard.performCastle(move);
  if (tmpBoard.isPieceUnderAttack(move.sourceRow, move.sourceCol + colChange) ||
      tmpBoard.isPieceUnderAttack(move.sourceRow,
                                  move.sourceCol + colChange * 2)) {
    return false;
  }

  return true;
}

const bool Board::isEnPassentAllowed(const ChessMove &move) const {

  if (PawnPiece *pawn = dynamic_cast<PawnPiece *>(
          m_squares[move.sourceRow][move.sourceCol].get())) {
    if (move.destinationRow - move.sourceRow < 0 &&
        pawn->getMoveDirection() != MoveDirection::UP)
      return false;
    if (move.destinationRow - move.sourceRow > 0 &&
        pawn->getMoveDirection() != MoveDirection::DOWN)
      return false;
    if (std::abs(move.sourceRow - move.destinationRow) != 1 ||
        std::abs(move.sourceCol - move.destinationCol) != 1) {
      return false;
    }

    int pawnColOffset = move.sourceCol > move.destinationCol ? -1 : 1;
    if (PawnPiece *opponentPawn = dynamic_cast<PawnPiece *>(
            m_squares[move.sourceRow][move.sourceCol + pawnColOffset].get())) {

      if (opponentPawn->getColor() != pawn->getColor() &&
          m_previousMoves.size() > 0) {
        // opponent pawn was moved in the last move
        const ChessMove lastMove = m_previousMoves.top();
        if (lastMove.destinationRow == move.sourceRow &&
            lastMove.destinationCol == move.sourceCol + pawnColOffset &&
            (lastMove.sourceRow ==
             (opponentPawn->getMoveDirection() == MoveDirection::UP ? 6 : 1))) {
          return true;
        }
      }
    }
  }
  return false;
}

const bool Board::isPawnPromotionAllowed(const ChessMove &move) const {
  if (PawnPiece *pawn = dynamic_cast<PawnPiece *>(
          m_squares[move.sourceRow][move.sourceCol].get())) {
    return pawn->getMoveDirection() == MoveDirection::UP
               ? (move.destinationRow == 0)
               : (move.destinationRow == 7);
  }
  return false;
}

const std::unique_ptr<Piece> Board::getPromotedPiece(const ChessMove &move) {
  if (move.promotionPiece == "q") {
    return std::make_unique<QueenPiece>(
        m_squares[move.sourceRow][move.sourceCol]->getColor());
  } else if (move.promotionPiece == "r") {
    return std::make_unique<RookPiece>(
        m_squares[move.sourceRow][move.sourceCol]->getColor());
  } else if (move.promotionPiece == "b") {
    return std::make_unique<BishopPiece>(
        m_squares[move.sourceRow][move.sourceCol]->getColor());
  } else if (move.promotionPiece == "n") {
    return std::make_unique<KnightPiece>(
        m_squares[move.sourceRow][move.sourceCol]->getColor());
  } else {
    return std::make_unique<QueenPiece>(
        m_squares[move.sourceRow][move.sourceCol]->getColor());
  }
}

void Board::performCastle(const ChessMove &move) {
  int rookOffset = move.sourceCol > move.destinationCol ? 1 : -1;
  int rookCol = (move.destinationCol > move.sourceCol) ? 7 : 0;
  ChessMove moveKing{move.sourceRow, move.sourceCol, move.destinationRow,
                     move.destinationCol};
  ChessMove moveRook{move.destinationRow, rookCol, move.destinationRow,
                     move.destinationCol + rookOffset};

  // move king
  m_squares[moveKing.destinationRow][moveKing.destinationCol] =
      std::move(m_squares[moveKing.sourceRow][moveKing.sourceCol]);
  m_squares[moveKing.sourceRow][moveKing.sourceCol] =
      std::make_unique<EmptyPiece>();
  m_squares[moveKing.destinationRow][moveKing.destinationCol]
      ->setHasPieceMoved();

  // move rook
  m_squares[moveRook.destinationRow][moveRook.destinationCol] =
      std::move(m_squares[moveRook.sourceRow][moveRook.sourceCol]);
  m_squares[moveRook.sourceRow][moveRook.sourceCol] =
      std::make_unique<EmptyPiece>();
  m_squares[moveRook.destinationRow][moveRook.destinationCol]
      ->setHasPieceMoved();
}

void Board::performEnPassant(const ChessMove &move) {
  int pawnColOffset = move.sourceCol > move.destinationCol ? -1 : 1;

  // move pawn
  m_squares[move.destinationRow][move.destinationCol] =
      std::move(m_squares[move.sourceRow][move.sourceCol]);
  m_squares[move.sourceRow][move.sourceCol] = std::make_unique<EmptyPiece>();
  m_squares[move.destinationRow][move.destinationCol]->setHasPieceMoved();

  // capture opponent pawn
  m_squares[move.sourceRow][move.sourceCol + pawnColOffset] =
      std::make_unique<EmptyPiece>();
}

void Board::performPawnPromotion(const ChessMove &move) {
  m_squares[move.destinationRow][move.destinationCol] =
      getPromotedPiece(move)->clone();
  m_squares[move.sourceRow][move.sourceCol] = std::make_unique<EmptyPiece>();
  m_squares[move.destinationRow][move.destinationCol]->setHasPieceMoved();
  m_previousMoves.push(move);
}

const bool Board::handleSpecialMove(const ChessMove &move) {
  if (isCastleAllowed(move)) {
    performCastle(move);
    notifyObservers();
    return true;
  } else if (isEnPassentAllowed(move)) {
    performEnPassant(move);
    notifyObservers();
    return true;
  } else if (isPawnPromotionAllowed(move)) {
    performPawnPromotion(move);
    notifyObservers();
    return true;
  }

  return false;
}

void Board::makeMove(const ChessMove &move) {
  if (handleSpecialMove(move))
    return;
  m_squares[move.destinationRow][move.destinationCol] =
      std::move(m_squares[move.sourceRow][move.sourceCol]);
  m_squares[move.sourceRow][move.sourceCol] = std::make_unique<EmptyPiece>();
  m_squares[move.destinationRow][move.destinationCol]->setHasPieceMoved();
  m_previousMoves.push(move);
  notifyObservers();
}

void Board::clearBoard() {
  for (int row = 0; row < m_boardSize; ++row) {
    for (int col = 0; col < m_boardSize; ++col) {
      m_squares[row][col] = std::make_unique<EmptyPiece>();
    }
  }
}

void Board::initializeBoard() {
  this->clearBoard();
  for (int col = 0; col < m_boardSize; ++col) {
    m_squares[1][col] = std::make_unique<PawnPiece>(PieceColor::BLACK);
    m_squares[6][col] = std::make_unique<PawnPiece>(PieceColor::WHITE);
  }
  m_squares[0][0] = std::make_unique<RookPiece>(PieceColor::BLACK);
  m_squares[0][1] = std::make_unique<KnightPiece>(PieceColor::BLACK);
  m_squares[0][2] = std::make_unique<BishopPiece>(PieceColor::BLACK);
  m_squares[0][3] = std::make_unique<QueenPiece>(PieceColor::BLACK);
  m_squares[0][4] = std::make_unique<KingPiece>(PieceColor::BLACK);
  m_squares[0][5] = std::make_unique<BishopPiece>(PieceColor::BLACK);
  m_squares[0][6] = std::make_unique<KnightPiece>(PieceColor::BLACK);
  m_squares[0][7] = std::make_unique<RookPiece>(PieceColor::BLACK);
  m_squares[7][0] = std::make_unique<RookPiece>(PieceColor::WHITE);
  m_squares[7][1] = std::make_unique<KnightPiece>(PieceColor::WHITE);
  m_squares[7][2] = std::make_unique<BishopPiece>(PieceColor::WHITE);
  m_squares[7][3] = std::make_unique<QueenPiece>(PieceColor::WHITE);
  m_squares[7][4] = std::make_unique<KingPiece>(PieceColor::WHITE);
  m_squares[7][5] = std::make_unique<BishopPiece>(PieceColor::WHITE);
  m_squares[7][6] = std::make_unique<KnightPiece>(PieceColor::WHITE);
  m_squares[7][7] = std::make_unique<RookPiece>(PieceColor::WHITE);
}
