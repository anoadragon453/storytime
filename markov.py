import markovify, tweepy, re, time

def generateMarkov(text):
	# Get raw text as string.
	'''
	with open("/path/to/my/corpus.txt") as f:
	    text = f.read()
	'''
	# Build the model.
	text_model = markovify.Text(text)

	# Print five randomly-generated sentences
	for i in range(15):
	    text+= str(text_model.make_sentence())

	# Print three randomly-generated sentences of no more than 140 characters
	#for i in range(3):
	#    print(text_model.make_short_sentence(140))

	return text

def twitterfeed(textToSearch):
   auth = tweepy.OAuthHandler('72USdViI5PT9VuadnGTocxwtP', 'RBpgWBnyMvsNSy5VIrpAuw1Z9v9stZXH33q0ygl747CB4BP60H')
   auth.set_access_token('2632797234-Caxa9h9PdbK9dW47njosiegOl0kPuJxSFov5vDl', 'yhcDb9R1iyR56jpeCU6nBhxylZRgaIXfRaOq0gUHqrxDT')
   api = tweepy.API(auth)
   statuses = api.search(q=textToSearch,count=50,locale='en_US')
   data = [s.text.encode('utf8') for s in statuses]
   return data

def writeStory():
	# Get topic to search
	text = ""
	with open("./topic.txt") as f:
		text = f.read()
	tweets = twitterfeed(text)

	for tweet in tweets:
		if len(tweet.strip()) > 5:
			# Remove social crap from tweets (credit: https://stackoverflow.com/a/8377440)
			stripped = lambda tweet: re.compile('\#').sub('', re.compile('RT @').sub('@', tweet, count=0).strip())
			text += ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)"," ",stripped(tweet)).split()) + '. '

	# Write markov output to file
	f = open('./markov_out.txt','w')
	markovText = generateMarkov(text)
	f.write(markovText.rsplit(' ', 1)[0])
	f.close()

def main():
	while(True):
		writeStory()
		time.sleep(10)

if __name__ == "__main__":
    	main()
