import sys

from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import QComboBox, QInputDialog, QLineEdit, QPushButton, QVBoxLayout, QApplication, QMainWindow, QWidget
from functools import partial
from googletrans import Translator


def inputDialog():
    text, ok = QInputDialog.getText(None, 'Phrase', 'Enter a sentence:')
    if len(text) == 0:
        quit()
    return text


class translatorGUI(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('Py Translator')
        self.setMaximumHeight(275)
        self.centralWidget = QWidget()
        self.setCentralWidget(self.centralWidget)
        self.layout = QVBoxLayout()
        self.centralWidget.setLayout(self.layout)
        self._displayForEntry()
        self._languages()
        self._translateBtn()
        self._result()
        self._clearBtn()

    def _displayForEntry(self):
        self.entryDisplay = QLineEdit()
        self.entryDisplay.setFixedHeight(30)
        self.text = inputDialog()
        self.entryDisplay.setText('  Entry: ' + self.text)
        self.entryDisplay.setReadOnly(True)
        self.entryDisplay.setStyleSheet("""
                        QWidget {
                            font-size: .9rem;
                            border-radius: 3px; 
                            padding: .6rem .8rem;
                            line-height: 1.4rem;
                            min-width: 350px;
                            }
                        """)
        self.layout.addWidget(self.entryDisplay, alignment=Qt.AlignCenter)

    def _languages(self):
        self.languages = QComboBox()
        self.languages.setFixedHeight(30)
        self.languages.addItems([
            " -Choose Language-",
            " Arabic",
            " Chinese (Mandarin)",
            " English",
            " French",
            " German",
            " Hindi",
            " Italian",
            " Japanese",
            " Portuguese",
            " Russian",
            " Spanish"
        ])
        self.languages.setStyleSheet("""
                        QWidget {
                            width: 150px;
                            padding-top: 1px;
                            font-size: .9rem;
                            border-radius: 3px; 
                            line-height: 1.4rem;
                            }
                        """)
        self.layout.addWidget(self.languages, alignment=Qt.AlignCenter)

    def chosenLang(self, index):
        self.abbr = [
            "ar",
            "zh-CN",
            "en",
            "fr",
            "de",
            "hi",
            "it",
            "ja",
            "pt",
            "ru",
            "es"
        ]
        result = str(self.abbr[index])
        return result

    def _result(self):
        self.resultDisplay = QLineEdit()
        self.resultDisplay.setFixedHeight(30)
        self.resultDisplay.setReadOnly(True)
        self.resultDisplay.setText('')
        self.resultDisplay.setStyleSheet("""
                                QWidget {
                                    font-size: .9rem;
                                    border-radius: 3px; 
                                    padding: .6rem .8rem;
                                    line-height: 1.4rem;
                                    min-width: 350px;
                                    }
                                """)
        self.layout.addWidget(self.resultDisplay, alignment=Qt.AlignCenter)

    def _translateBtn(self):
        self.translateb = QPushButton('Translate ↓')
        self.translateb.setFixedHeight(30)
        self.translateb.setFixedWidth(95)
        self.translateb.setStyleSheet("""
                                QWidget {
                                    padding: .4rem .6rem;
                                    line-height: 1.4rem;
                                    color: white;
                                    background-color: #424949;
                                    font-size: .9rem;
                                    border-radius: 3px; 
                                }
                                QWidget:hover{
                                    background-color: #999999;
                                }
                                """)
        self.layout.addWidget(self.translateb, alignment=Qt.AlignCenter)

    def _clearBtn(self):
        self.clear = QPushButton('Exit')
        self.clear.setFixedHeight(30)
        self.clear.setFixedWidth(55)
        self.clear.setStyleSheet("""
                                        QWidget {
                                            padding: .4rem .6rem;
                                            line-height: 1.4rem;
                                            color: white;
                                            background-color: #424949;
                                            text-decoration: none;
                                            font-size: .9rem;
                                            border-radius: 3px; 
                                        }
                                        QWidget:hover{
                                            background-color: #999999;
                                        }
                                        """)
        self.layout.addWidget(self.clear, alignment=Qt.AlignCenter)

    def clearIO(self):
        self.close()


class translatorController:
    def __init__(self, view):
        self._view = view
        self._connectSignals()

    def translate(self, phrase):
        index = self._view.languages.currentIndex()
        if len(phrase) > 58:
            self._view.resultDisplay.setText('Input is too large')
        else:
            if index > 0:
                trans = Translator()
                t = trans.translate(
                    phrase, dest=self._view.chosenLang(index - 1)
                )
                self._view.resultDisplay.setText('Translation: ' + t.text)

    def _connectSignals(self):
        self._view.translateb.clicked.connect(partial(self.translate, self._view.text))
        self._view.clear.clicked.connect(self._view.clearIO)


def main():
    pyTrans = QApplication(sys.argv)
    view = translatorGUI()
    view.show()
    translatorController(view=view)
    sys.exit(pyTrans.exec_())


if __name__ == '__main__':
    main()
