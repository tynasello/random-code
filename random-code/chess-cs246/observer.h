#pragma once

class Observer {
public:
  virtual void notify() const = 0;
  virtual ~Observer() = default;
};
