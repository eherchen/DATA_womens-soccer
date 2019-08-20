# WNT ussoccer scrape

from bs4 import BeautifulSoup
import requests
import re
from datetime import datetime

header = {"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko"}

currentdate = datetime.now()

womensurl = 'https://www.ussoccer.com/teams/uswnt'
mensurl= "https://www.ussoccer.com/teams/usmnt"

womensresponse = requests.get(womensurl, headers=header, timeout=8)

womenssoup = BeautifulSoup(womensresponse.text, 'html.parser')

womensresults = womenssoup.find_all('div', class_=re.compile("HighlightStats-module__value"))

print("Womens FIFA World Rank: " + womensresults[0].text)
print("Wins: " + womensresults[1].text)
print("Losses: " + womensresults[2].text)
print("Draws: " + womensresults[3].text)
print("Goals: " + womensresults[4].text)


womensfeaturedstories = womenssoup.find_all('div', class_=re.compile(r'FeaturedStories'))

for story in womensfeaturedstories:
    
    # Retrieve the thread title
    titles = []
    
    times = []
    # Access the thread's text content
    links = []

    imgsrcs = []
#     print(title_text)
    siteurl = "https://www.ussoccer.com"
    

    try:
        # Access the thread with CSS selectors
#         thread = result.find('li', class_='first')    

#         # The number of comments made in the thread
#         comments = thread.text.lstrip()

#         # Parse string, e.g. '47 comments' for possible numeric manipulation
#         comments_num = int(comments.split()[0])

#         # Access the href attribute with bracket notation
#         link = thread.a['href']
        title = story.find('h4')
        time = story.find('time')
        link = siteurl + story.a['href']
        imgsrc = story.img['src']

        titles.append(title)
        times.append(time)
        links.append(link)
        imgsrcs.append(imgsrc)

    except AttributeError as e:
        pass

soccerscrape = '''var soccerscrape = [{'date': '%s', 'fifa_ranking': %s, 'wins': %s, 'losses': %s, 'draws': %s, 'goals': %s, 'recent_news': '%s', 'time_of_story': '%s', 'story_link': '%s', 'image_link': '%s', 
'recent_news2': '%s', 'time_of_story2': '%s', 'story_link2': '%s', 'image_link2': '%s'}]
''' % (currentdate, womensresults[0].text, womensresults[1].text, womensresults[2].text, womensresults[3].text, womensresults[4].text, titles[0], times[0], links[0], imgsrc[0], titles[1], times[1], links[1], imgsrc[1])

with open('soccerscrape.js', 'w') as file:
    file.write(soccerscrape)
    file.close()