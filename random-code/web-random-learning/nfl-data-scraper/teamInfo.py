import requests
from bs4 import BeautifulSoup
from teamWins import wins_dictionary

URL = "https://www.espn.com/nfl/stats/team/_/view/offense/stat/passing/table/passing/sort/netPassingYards/dir/desc"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")

team_elements_container = soup.find_all(class_="Table__TR Table__TR--sm Table__even")
stat_elements_container = soup.find_all(class_="Table__Scroller")


def team_name():
    all_teams = []

    for i, team_element in enumerate(team_elements_container):
        if i == 32:
            break

        team = team_element.find_all(class_="AnchorLink")[1].get_text()

        all_teams.append(team)

    return all_teams


def team_stats():
    stats = []
    all_team_stats = []

    for stat_elements in stat_elements_container:
        for team_index in range(32):
            for stat_index in range(13):
                stat = stat_elements.find_all(class_="Table__TR Table__TR--sm Table__even")[team_index].find_all(
                    class_='Table__TD')[stat_index].get_text()

                stats.append(stat)

            all_team_stats.append(stats)

            stats = []

    return all_team_stats


def team_name_stats():
    names = team_name()
    stats = team_stats()
    wins_dict = wins_dictionary()
    name_stats = []
    all_name_stats = []

    for team in range(32):
        name_stats.append(names[team])
        name_stats.append(wins_dict.get(names[team]))
        for stat in range(13):
            name_stats.append(stats[team][stat])
        all_name_stats.append(name_stats)
        name_stats = []
    return all_name_stats


def team_dictionary():
    stat_type = ['Team', 'Wins', 'Games Played', 'Completions', 'Attempts', 'Completion %', 'Yards', 'Average',
                 'Yards/Game', 'Long', 'TD', 'Interceptions', 'Sack', 'Sack Yards Lost', 'Passer Rating']

    name_stats = team_name_stats()

    team_info = []
    team_info_dict = {}

    for team in range(32):
        for stat in range(15):
            team_info_dict[stat_type[stat]] = name_stats[team][stat]
        team_info.append(team_info_dict)
        team_info_dict = {}

    return team_info
