import markovify, tweepy, re, time, sys
from  more_itertools import unique_everseen

def generateMarkov(text):
	# Get raw text as string.
	# Build the model.
	text_model = markovify.Text(text)

	# Print five randomly-generated sentences
	for i in range(4):
	    text+= str(text_model.make_sentence())

	# Print three randomly-generated sentences of no more than 140 characters
	#for i in range(3):
	#    print(text_model.make_short_sentence(140))

	return text

def searchTweets(textToSearch):
   auth = tweepy.OAuthHandler('72USdViI5PT9VuadnGTocxwtP', 'RBpgWBnyMvsNSy5VIrpAuw1Z9v9stZXH33q0ygl747CB4BP60H')
   auth.set_access_token('2632797234-Caxa9h9PdbK9dW47njosiegOl0kPuJxSFov5vDl', 'yhcDb9R1iyR56jpeCU6nBhxylZRgaIXfRaOq0gUHqrxDT')
   api = tweepy.API(auth)
   statuses = api.search(q=textToSearch,rpp=100,lang='en')
   data = [s.text.encode('utf8') for s in statuses]
   return data

def writeStory():
	markovText = ""
	text = ""
	topic = sys.argv[1]
	post_limit = 5
	if sys.argv[2] == "twitter":
		# Get topic to search
		tweets = searchTweets(topic)

		# Parse Tweets
		for tweet in tweets:
			if len(tweet.strip()) > 5:
                            # Remove social crap from tweets (credit: https://stackoverflow.com/a/8377440)
                            stripped = lambda tweet: re.compile('\#').sub('', re.compile('RT @').sub('@', tweet, count=1))
                            text += ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)"," ",stripped(tweet)).split()) + '. '
                            text = re.sub("( s )","\'s ",text)
                            text = re.sub("( ll )","\'ll ",text)
                            text = re.sub("( t )","\'t ",text)
                            text = re.sub("( ve )","\'ve ",text)
                            text = re.sub("(https|http)"," ",text)
                            text = re.sub("( m )","\'m ",text)
                            text = re.sub("(y all)","y\'all",text)
                            text = re.sub("( amp )"," & ",text)
                            text = re.sub("( re )","\'r ",text)
                            text = re.sub("( d )","\'d ",text)
                            text = re.sub("(NoneNone)"," ",text)


		# Generate markov
		splitText = generateMarkov(text).rsplit(' ', 1)[0].split(".")
                for tweet in list(unique_everseen(splitText)):
                    markovText+=tweet+'. '

	elif sys.argv[2] == "reddit":
		r = praw.Reddit(user_agent='storytime script: amorgan.me/storytime')	
		r.login('storytime_bot', 'Jnw5v9pgbHW6qXXrNb24EJkGeE8KwZ', disable_warning=True)
		submissions = r.get_subreddit(topic).get_new(limit=10)

		# Get comments
		for x in xrange(0,post_limit):
			submission = next(submissions)
			#comments = praw.helpers.flatten_tree(submission.comments)
			# Parse comments
			print (submission)
			#for comment in submission.comments:
				#markovText+=comment.body
			#	print(comment.body)
	print (markovText)

def main():
	writeStory()

if __name__ == "__main__":
    	main()
