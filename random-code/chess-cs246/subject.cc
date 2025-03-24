#include "subject.h"

void Subject::notifyObservers() {
  for (Observer *o : this->observers) {
    o->notify();
  }
}
void Subject::attach(Observer *o) { this->observers.emplace_back(o); }

void Subject::detach(Observer *o) {
  for (auto it = this->observers.begin(); it != this->observers.end();) {
    if (*it == o)
      it = this->observers.erase(it);
    else
      ++it;
  }
}

Subject::~Subject() {}
