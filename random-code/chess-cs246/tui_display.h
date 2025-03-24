#pragma once

#include "display_medium.h"
#include <memory>
#include <string>

class TuiDisplay : public DisplayMedium {
  std::ostream &m_out;

public:
  TuiDisplay();
  virtual void
  draw(const std::vector<std::vector<std::unique_ptr<Piece>>> &board) override;
  virtual void write(const std::string message) const override;
  virtual ~TuiDisplay() override;
};
