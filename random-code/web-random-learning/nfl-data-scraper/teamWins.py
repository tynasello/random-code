import requests
from bs4 import BeautifulSoup

URL = "https://www.espn.com/nfl/standings/_/group/league"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")

team_elements_container = soup.find_all(class_="Table__TBODY")
stat_elements_container = soup.find_all(class_="Table__Scroller")


def team_names():
    all_teams = []

    for team_element in team_elements_container:
        for team_index in range(16):
            team_link = team_element.find_all(class_="Table__TR Table__TR--sm Table__even")[team_index].find_all(
                class_= "hide-mobile")
            for link in team_link:
                team = link.find('a').get_text()
                all_teams.append(team)
            team_link = team_element.find_all(class_="filled Table__TR Table__TR--sm Table__even")[team_index].find_all(
                class_= "hide-mobile")
            for link in team_link:
                team = link.find('a').get_text()
                all_teams.append(team)

    return all_teams


def team_wins():
    wins = []

    for stat_elements in stat_elements_container:
        for team_index in range(16):
            stat = stat_elements.find_all(class_="Table__TR Table__TR--sm Table__even")[team_index].find_all(
                class_='Table__TD')[0].get_text()
            wins.append(stat)
            stat = stat_elements.find_all(class_="filled Table__TR Table__TR--sm Table__even")[team_index].find_all(
                class_='Table__TD')[0].get_text()

            wins.append(stat)

    return wins


def wins_dictionary():

    wins_dict = {}

    for team in range(32):
        wins_dict[team_names()[team]] = team_wins()[team]

    return wins_dict
