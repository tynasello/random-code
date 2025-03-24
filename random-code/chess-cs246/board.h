#pragma once

#include "player.h"
#include "subject.h"
#include <stack>
#include <vector>

class Board : public Subject {
  const int m_boardSize = 8;
  std::vector<std::vector<std::unique_ptr<Piece>>> m_squares;
  std::stack<ChessMove> m_previousMoves;
  void clearBoard();
  const bool movePutsPlayerInCheck(const PieceColor &playerColor,
                                   const ChessMove &move) const;
  const bool handleSpecialMove(const ChessMove &move);
  const bool isCastleAllowed(const ChessMove &move) const;
  void performCastle(const ChessMove &move);
  void performEnPassant(const ChessMove &move);
  void performPawnPromotion(const ChessMove &move);
  const std::unique_ptr<Piece> getPromotedPiece(const ChessMove &move);

public:
  Board();
  Board(const Board &other);
  const int &getBoardSize() const;
  const std::vector<std::vector<std::unique_ptr<Piece>>> &getState() const;
  void initializeBoard();
  void placePiece(std::string pieceId, PieceColor pieceColor, const int row,
                  const int col);
  void removePiece(const int row, const int col);
  const bool isMoveValid(const ChessMove &move,
                         const PieceColor &playerColor) const;
  void makeMove(const ChessMove &move);
  const bool isPlayerInCheck(const PieceColor &playerColor) const;
  const bool isPlayerInCheckMate(const PieceColor &playerColor) const;
  const bool isBoardInStalemate(const PieceColor &playerColor) const;
  const bool isPieceUnderAttack(const int row, const int col) const;
  const bool isBoardADraw() const;
  const bool isEnPassentAllowed(const ChessMove &move) const;
  const bool isPawnPromotionAllowed(const ChessMove &move) const;
};
