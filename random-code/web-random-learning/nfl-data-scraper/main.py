from writeCSV import *
from teamInfo import team_dictionary
from findCorrelation import create_set
from findCorrelation import find_correlation_coefficient


# Is there a correlation between team wins and receiving yards

team_info = team_dictionary()
data_sets = create_set()
if __name__ == "__main__":
    write_stats_CSV(team_info)
    write_wins_yards_CSV(data_sets)
    print("Correlation Coefficient: " + str(find_correlation_coefficient()))
