## Motivation

This project was inspired by https://harrypotter.fandom.com/wiki/List_of_spells. \
We wanted to build a more concise website and the spell was more readable.

## Impact

To make this website not just a card-showing app, we wanted to add a special feature, the search engine.\
We thought there might be a scenario that a wizard forgot the spell he wanted to cast and he or she had no time to poring over those spell books.\
Therefore, we made the search engine.\
You can just type your wish or some keyword, the search engine would show the most relative 5 spell.

## Design
This website is divided into two pages, the spell list and the search engine.

### Spell List
The spell list consists of several spell card.\
Users can use the top alphabet list to filter the spell card.\
The spell card shows everything about the spell, such as pronunciation, decription, etymology, etc.

### Search engine
By entering some keyword, users can get the most relative 5 spell.\
Because it takes time for the search engine to calculate the similarity between input word and every spell, we design a loading screen to increase user experience.

## Method

### Search Engine
We use Universal Sentence Encoder lite from `TensorFlow.js`, which encodes text into 512-dimensional embeddings, as our encoder. \
In order to not make the searching time too long, we embed the description of all the spells in advance and store them in an array. \
When the user enters an input, the input text will also be encoded into an a 512-dimensional embedding, and then we will calculate the cosine similarity between the input and each description of all the spells. \
The first five largest value of cosine similarity will be considered as the search results. 

## data
### Spell data
We scrawled the spell data from https://harrypotter.fandom.com/wiki/List_of_spells. \

### Sound file
The sound file was downloaded from https://www.youtube.com/

## Code organization





