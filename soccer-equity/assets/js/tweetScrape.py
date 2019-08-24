from bs4 import BeautifulSoup
import requests
import re
from datetime import datetime

currentdate = datetime.now()

uswntUrl = "https://twitter.com/search?q=%23USWNT"

header = {"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko"}

response = requests.get(uswntUrl, headers=header, timeout=8)

soup = BeautifulSoup(response.text, "html.parser")

tweets = soup.find_all("p", class_="TweetTextSize")


# for x in range(10): 
#     print(tweets[x].text)
#     x + 1

# print("scrape complete")
recenttweets = ''' var recenttweets = [{"date": "%s", "tweet1": "%s", "tweet2": "%s", 
"tweet3": "%s", "tweet4": "%s", "tweet5": "%s", "tweet6": "%s", "tweet7": "%s", "tweet8": "%s"}]''' % (currentdate, tweets[0].text, tweets[1].text, tweets[2].text, tweets[3].text, tweets[4].text, tweets[5].text, tweets[6].text, tweets[7].text)

with open("recenttweets.js", "w") as file:
    file.write(recenttweets)
    file.close()