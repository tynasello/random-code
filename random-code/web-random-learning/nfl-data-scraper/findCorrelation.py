from teamInfo import team_dictionary
from math import sqrt

stats = team_dictionary()
all_subjects = []


def create_set():
    subject = {}
    sum_stats = {"Team": "Sum", "Wins": 0, "Yards": 0, "XY": 0, "X^2": 0, "Y^2": 0}

    for team in range(32):
        subject["Team"] = stats[team].get('Team')
        subject["Wins"] = stats[team].get('Wins')
        subject["Yards"] = stats[team].get('Yards')
        x = int(stats[team].get('Wins'))
        y = int((stats[team].get('Yards')).replace(',', ''))
        subject["XY"] = x * y
        subject["X^2"] = x ** 2
        subject["Y^2"] = y ** 2
        all_subjects.append(subject)
        subject = {}

        sum_stats["Wins"] += int(stats[team].get('Wins'))
        sum_stats["Yards"] += int(stats[team].get('Yards').replace(',', ''))
        sum_stats["XY"] += x * y
        sum_stats["X^2"] += x ** 2
        sum_stats["Y^2"] += y ** 2

    all_subjects.append(sum_stats)
    return all_subjects


def find_correlation_coefficient():
    data = create_set()
    numerator = (32 * data[32].get('XY')) - (data[32].get('Wins')) * (data[32].get('Yards'))
    denominator = sqrt(
        (32 * data[32].get('X^2') - data[32].get('Wins') ** 2) * (32 * data[32].get('Y^2') - data[32].get('Yards') **
                                                                  2))
    correlation_coefficient = numerator / denominator
    return correlation_coefficient

# print(find_correlation_coefficient())
# print(find_correlation_coefficient())

# team_abbreviations = {
#     "ARI": "Arizona Cardinals",
#     "ATL": "Atlanta Falcons",
#     "BAL": "Baltimore Ravens",
#     "BUF": "Buffalo Bills",
#     "CAR": "Carolina Panthers",
#     "CHI": "Chicago Bears",
#     "CIN": "Cincinnati Bengals",
#     "CLE": "Cleveland Browns",
#     "DAL": "Dallas Cowboys",
#     "DEN": "Denver Broncos",
#     "DET": "Detroit Lions",
#     "GB": "Green Bay Packers",
#     "HOU": "Houston Texans",
#     "IND": "Indianapolis Colts",
#     "JAX": "Jacksonville Jaguars",
#     "KC": "Kansas City Chiefs",
#     "LAC": "Los Angeles Chargers",
#     "LAR": "Los Angeles Rams",
#     "LV": "Las Vegas Raiders",
#     "MIA": "Miami Dolphins",
#     "MIN": "Minnesota Vikings",
#     "NE": "New England Patriots",
#     "NO": "New Orleans Saints",
#     "NYG": "New York Giants",
#     "NYJ":"New York Jets",
#     "PHI": "Philadelphia Eagles",
#     "PIT": "Pittsburgh Steelers",
#     "SEA": "Seattle Seahawks",
#     "SF": "San Francisco 49ers",
#     "TB": "Tampa Bay Buccaneers",
#     "TEN": "Tennessee Titans",
#     "WAS":  "Washington Football Team"
# }
