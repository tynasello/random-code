#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Token types - IDENTIFIER, KEYWORD, OPERATOR, LITERAL

const size_t NUM_KEYWORDS = 28;
const size_t NUM_OPERATORS = 24;

const static char *KEYWORDS[NUM_KEYWORDS] = {
    "double",   "case",   "float",    "default", "struct", "register",
    "unsigned", "sizeof", "int",      "typedef", "short",  "volatile",
    "break",    "extern", "continue", "if",      "else",   "char",
    "for",      "do",     "switch",   "return",  "void",   "static",
    "long",     "union",  "signed",   "while"};

const static char OPERATORS[NUM_OPERATORS] = {
    '+', '-', '*', '/', '%',  '=', '!', '|', '&', '<', '>', '#',
    '?', ':', ',', ';', '\\', '(', ')', '{', '}', '[', ']', '^'};

static FILE *fin, *fout;
static int curr_line = 1, curr_col = 0;
static char curr_char = ' ';

static void read_char(void) { curr_char = fgetc(fin); }

static void skip_whitespace(void) {
  while (isspace(curr_char) || curr_char == '\0') {
    read_char();
  }
}

static void string_literal(void) {
  fprintf(fout, "STRING LITERAL:\t ");
  read_char();
  while (curr_char != '"') {
    fprintf(fout, "%c", curr_char);
    read_char();
  }
  read_char();
  fprintf(fout, "\n");
}

static void num_literal(void) {
  int was_decimal_seen = 0;
  fprintf(fout, "NUM LITERAL:\t ");
  while (isdigit(curr_char) || (!was_decimal_seen && curr_char == '.')) {
    if (curr_char == '.') was_decimal_seen = 1;
    fprintf(fout, "%c", curr_char);
    read_char();
  }
  fprintf(fout, "\n");
}

static int operator_requires_peak(void) {
  char old_char = curr_char;
  read_char();
  switch (old_char) {
    case '+':
      if (curr_char == '+' || curr_char == '=') return 1;
      break;
    case '-':
      if (curr_char == '-' || curr_char == '=') return 1;
      break;
    case '=':
      if (curr_char == '=') return 1;
      break;
    case '*':
      if (curr_char == '=') return 1;
      break;
    case '/':
      if (curr_char == '=' || curr_char == '/') return 1;
      break;
    case '%':
      if (curr_char == '=') return 1;
      break;
    case '!':
      if (curr_char == '=') return 1;
      break;
    case '&':
      if (curr_char == '&') return 1;
      break;
    case '|':
      if (curr_char == '|') return 1;
      break;
    case '>':
      if (curr_char == '=' | curr_char == '>') return 1;
      break;
    case '<':
      if (curr_char == '=' || curr_char == '<') return 1;
      break;
  }
  return 0;
}

static int is_operator(void) {
  for (int i = 0; i < NUM_OPERATORS; ++i) {
    if (OPERATORS[i] == curr_char) return 1;
  }
  return 0;
}

static void operator(void) {
  fprintf(fout, "OPERATOR:\t\t %c", curr_char);

  // look forward: eg: +=
  if (operator_requires_peak()) {
    fprintf(fout, "%c", curr_char);
    read_char();
  }
  fprintf(fout, "\n");
}

static int is_keyword(char *str) {
  for (int i = 0; i < NUM_KEYWORDS; ++i) {
    if (strcmp(KEYWORDS[i], str) == 0) {
      return 1;
    }
  }
  return 0;
}

static void keyword_or_identifier(void) {
  // identifier or keyword can't be greater than 30 chars
  // TODO implement better soln
  char str[30] = "";

  while (isalpha(curr_char) || curr_char == '_') {
    size_t len = strlen(str);
    str[len] = curr_char;
    read_char();
  }

  if (is_keyword(str)) {
    fprintf(fout, "KEYWORD:\t\t %s\n", str);
  } else {
    fprintf(fout, "IDENTIFIER:\t\t %s\n", str);
  }
}

static void lexer(void) {
  read_char();
  while (EOF != curr_char) {
    skip_whitespace();
    if (curr_char == '"') {
      string_literal();
    } else if (is_operator()) {
      operator();
    } else if (isdigit(curr_char) || curr_char == '-') {
      num_literal();
    } else if (isalpha(curr_char)) {
      keyword_or_identifier();
    } else {
      fprintf(fout, "UNKNOWN TOKEN");
    }
  }
}

static void init_IO(FILE **f, FILE *std, char f_path[], char mode[]) {
  if (strcmp(f_path, "") == 0) {
    *f = std;
  } else {
    *f = fopen(f_path, mode);
    if (NULL == *f) {
      fprintf(stderr, "Error opening file %s\n", f_path);
      exit(0);
    }
  }
}

int main(void) {
  // init input and output streams
  init_IO(&fin, stdin, "test_in.txt", "r");
  init_IO(&fout, stdout, "test_out.txt", "w");

  // perform lexical analysis
  lexer();

  // close files
  fclose(fin);
  fclose(fout);

  return 0;
}
