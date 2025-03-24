import csv

stat_type = ['Team', 'Wins', 'Games Played', 'Completions', 'Attempts', 'Completion %', 'Yards', 'Average',
                 'Yards/Game', 'Long', 'TD', 'Interceptions', 'Sack', 'Sack Yards Lost', 'Passer Rating']
wins_yards_type = ['Team', 'Wins', 'Yards', 'XY', 'X^2', 'Y^2']

stats_file = "team_stats.csv"
wins_yards_file = "wins_yards.csv"


def write_stats_CSV(players_name_and_stats):
    try:
        with open(stats_file, 'w') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=stat_type)
            writer.writeheader()
            for data in players_name_and_stats:
                writer.writerow(data)
    except IOError:
        print("I/O error")


def write_wins_yards_CSV(players_name_and_stats):
    try:
        with open(wins_yards_file, 'w') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=wins_yards_type)
            writer.writeheader()
            for data in players_name_and_stats:
                writer.writerow(data)
    except IOError:
        print("I/O error")