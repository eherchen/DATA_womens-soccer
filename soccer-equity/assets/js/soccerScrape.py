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


womensfeaturedstories = womenssoup.find_all('div', class_=re.compile(r'FeaturedStories'))


titles = []
    
times = []

links = []

imgsrcs = []

siteurl = "https://www.ussoccer.com"

for story in womensfeaturedstories:
    
    title = story.find('h4').text
    time = story.find('time').text
    link = siteurl + story.a['href']
    imgsrc = story.img['src']

    titles.append(title)
    times.append(time)
    links.append(link)
    imgsrcs.append(imgsrc)

womenssoccerscrape = '''var womenssoccerscrape = [{'date': '%s', 'fifa_ranking': %s, 'wins': %s, 'losses': %s, 'draws': %s, 'goals': %s, 'recent_news': '%s', 'time_of_story': '%s', 'story_link': '%s', 'image_link': '%s', 
'recent_news2': '%s', 'time_of_story2': '%s', 'story_link2': '%s', 'image_link2': '%s', 'recent_news2': '%s', 'time_of_story2': '%s', 'story_link2': '%s', 'image_link2': '%s'}]
''' % (currentdate, womensresults[0].text, womensresults[1].text, womensresults[2].text, womensresults[3].text, womensresults[4].text, titles[0], times[0], links[0], imgsrcs[0], titles[1], times[1], links[1], imgsrcs[1], titles[2], times[2], links[2], imgsrcs[2])

with open('womenssoccerscrape.js', 'w') as file:
    file.write(womenssoccerscrape)
    file.close()
    
# print("womens scrape complete")


mensresponse = requests.get(mensurl, headers=header, timeout=8)

menssoup = BeautifulSoup(mensresponse.text, 'html.parser')

mensresults = menssoup.find_all('div', class_=re.compile("HighlightStats-module__value"))


mensfeaturedstories = menssoup.find_all('div', class_=re.compile(r'FeaturedStories'))

menstitles = []
    
menstimes = []

menslinks = []

mensimgsrcs = []

siteurl = "https://www.ussoccer.com"

for mensstory in mensfeaturedstories:
    
    menstitle = mensstory.find('h4').text
    menstime = mensstory.find('time').text
    menslink = siteurl + mensstory.a['href']
    mensimgsrc = mensstory.img['src']

    menstitles.append(menstitle)
    menstimes.append(menstime)
    menslinks.append(menslink)
    mensimgsrcs.append(mensimgsrc)

menssoccerscrape = '''var menssoccerscrape = [{'date': '%s', 'fifa_ranking': 'NR', 'wins': %s, 'losses': %s, 'draws': %s, 'goals': %s, 'recent_news': '%s', 'time_of_story': '%s', 'story_link': '%s', 'image_link': '%s', 
'recent_news2': '%s', 'time_of_story2': '%s', 'story_link2': '%s', 'image_link2': '%s', 'recent_news2': '%s', 'time_of_story2': '%s', 'story_link2': '%s', 'image_link2': '%s'}]
''' % (currentdate, mensresults[0].text, mensresults[1].text, mensresults[2].text, mensresults[3].text, menstitles[0], menstimes[0], menslinks[0], mensimgsrcs[0], menstitles[1], menstimes[1], menslinks[1], mensimgsrcs[1], menstitles[2], menstimes[2], menslinks[2], mensimgsrcs[2])

with open('menssoccerscrape.js', 'w') as file:
    file.write(menssoccerscrape)
    file.close()
    
# print("mens scrape complete")