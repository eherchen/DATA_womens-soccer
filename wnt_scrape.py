from splinter import Browser
from bs4 import BeautifulSoup as bs
import requests
import pandas as pd
import time

def init_browser():
    executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
    return Browser("chrome", **executable_path, headless=False)

def scrape():
    browser = init_browser()


    nasa_url = 'https://mars.nasa.gov/news/'
    nasa_response = requests.get(nasa_url)
    nasa_soup = bs(nasa_response.text, 'html.parser')

    news_title = nasa_soup.find('div', class_='content_title').text
    news_paragraph = nasa_soup.find('div', class_='rollover_description_inner').text


    #     # BONUS: Find the src for the sloth image
    # relative_image_path = soup.find_all('img')[2]["src"]
    # sloth_img = url + relative_image_path

    jpl_url = 'https://www.jpl.nasa.gov'
    search_url = '/spaceimages/?search=&category=Mars'
    jpl_response = requests.get(jpl_url + search_url)
    jpl_soup = bs(jpl_response.text, 'html.parser')
    jpl_image = jpl_soup.find('img', class_='thumb')
    jpl_image_path = jpl_url + jpl_image['src']

    twitter_url = 'https://twitter.com/marswxreport?lang=en'
    twitter_response = requests.get(twitter_url)

    twitter_soup = bs(twitter_response.text, 'html.parser')
    mars = twitter_soup.find('div', class_='js-tweet-text-container')
    mars_weather = mars.text

    marsfacts_url = "https://space-facts.com/mars/"
    marstables = pd.read_html(marsfacts_url)

    marstables_df = marstables[0]
    marstables_df.columns = ['Description', 'Values']
    marstables_df = marstables_df.set_index('Description')

    mars_html_table = marstables_df.to_html()
    mars_html_table = mars_html_table.replace('\n', '')


    executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
    browser = Browser('chrome', **executable_path, headless=False)

    usgs_baseurl = "https://astrogeology.usgs.gov"
    mars_search = "/search/map/Mars/Viking/cerberus_enhanced" # /search/results?q=hemisphere+enhanced&k1=target&v1=Mars
    hemispheres_url = usgs_baseurl + mars_search
    browser.visit(hemispheres_url)

    hemispheres = ['Schiaparelli', 'Syrtis', 'Valles', 'Cerberus']

    hemi_pic_url = []
    hemi_pic_title = []

    for hemisphere in hemispheres:
        html = browser.html
        soup = bs(html, 'html.parser')
        
        href = soup.find('img', class_='wide-image')
        title = soup.find('h2', class_='title')
    
        hemi_image_path = usgs_baseurl + href['src']
        hemi_pic_url.append(hemi_image_path)
        hemi_pic_title.append(title.text)
        
        try:    
            browser.click_link_by_partial_text(hemisphere)
            time.sleep(1.3)
          
        except:
            browser.quit()
    
    c_url = hemi_pic_url[0]
    sch_url = hemi_pic_url[1]
    sy_url = hemi_pic_url[2]
    v_url = hemi_pic_url[3]

    c_title = hemi_pic_title[0]
    sch_title = hemi_pic_title[1]
    sy_title = hemi_pic_title[2]
    v_title = hemi_pic_title[3]

    mars_data = {
        "headline": news_title,
        "news": news_paragraph,
        "image": jpl_image_path,
        "weather": mars_weather,
        "facts": mars_html_table,
        "c_url": c_url,
        "sch_url": sch_url,
        "sy_url": sy_url,
        "v_url": v_url,
        "c_title": c_title,
        "sch_title": sch_title,
        "sy_title": sy_title,
        "v_title": v_title
    }


    browser.quit()

    # return mars_data


