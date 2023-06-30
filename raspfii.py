from bs4 import BeautifulSoup

# Lendo o conteúdo do arquivo HTML
with open('nsei.html', 'r') as file:
    html = file.read()

soup = BeautifulSoup(html, 'html.parser')
links = soup.find_all('a')

for link in links:
    link_text = link.text
    print(link_text)
