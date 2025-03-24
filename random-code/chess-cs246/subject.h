#pragma once
#include "observer.h"
#include <vector>

class Subject {
  std::vector<Observer *> observers;

public:
  void notifyObservers();
  void attach(Observer *observer);
  void detach(Observer *observer);
  virtual ~Subject() = 0;
};
