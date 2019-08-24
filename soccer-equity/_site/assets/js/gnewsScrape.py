
from bs4 import BeautifulSoup
import requests
import re
from datetime import datetime

header = {"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko"}

currentdate = datetime.now()

gurl = "https://news.google.com/search?q=equity%20pay%20soccer&hl=en-US&gl=US&ceid=US%3Aen" 
# searches for equity pay soccer

response = requests.get(gurl, headers=header)

soup = BeautifulSoup(response.text, 'html.parser')


stories = soup.find_all('h3')

link = stories[0].a['href']
link = link.split(".")

link1 = stories[1].a['href']
link1 = link1.split(".")

link2 = stories[2].a['href']
link2 = link2.split(".")

link3 = stories[3].a['href']
link3 = link3.split(".")

link4 = stories[4].a['href']
link4 = link4.split(".")

link5 = stories[5].a['href']
link5 = link5.split(".")

link6 = stories[6].a['href']
link6 = link6.split(".")

link7 = stories[7].a['href']
link7 = link7.split(".")

gnewsurl = "https://news.google.com"
full_url = gnewsurl + link[1]
full_url1 = gnewsurl + link1[1]
full_url2 = gnewsurl + link2[1]
full_url3 = gnewsurl + link3[1]
full_url4 = gnewsurl + link4[1]
full_url5 = gnewsurl + link5[1]
full_url6 = gnewsurl + link6[1]
full_url7 = gnewsurl + link7[1]

lateststories = '''var lateststories = [{"currentdatetime": "%s", "title1": "%s", "url1": "%s",
"title2": "%s", "url2": "%s",
"title3": "%s", "url3": "%s",
"title4": "%s", "url4": "%s",
"title5": "%s", "url5": "%s",
"title6": "%s", "url6": "%s",
"title7": "%s", "url7": "%s",
"title8": "%s", "url8": "%s"}] 
''' % (currentdate, stories[0].text, full_url, stories[1].text, full_url1, stories[2].text, full_url2, stories[3].text, full_url3, stories[4].text, full_url4, stories[5].text, full_url5, stories[6].text, full_url6, stories[7].text, full_url7)

with open('lateststories.js', 'w') as file:
    file.write(lateststories)
    file.close()
    
