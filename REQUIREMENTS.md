# Front End Thesis Requirements

## Business Question
_As a Twitter Advertiser I want to know what the ratio of positive to negative tweets about my brand over the last 3 month by 5 min increments_

*Server Side Requirements*

1) Use Twitter Streaming Api 
  - Use Twitter client to consume stream of Tweets
    - *Optional but recommended* : because the Streaming API is limited you will have better results if you store the tweets in a persistent datastore
  - Create server side route to let clients consume Tweet stream (Server Side Events, WebSockets, Polling)

2) Add routes to filter stream
  - User should be able to find tweets based on keyword

3) Use the [sentiment package](https://www.npmjs.com/package/sentiment) to get a sentiment score
    
*Client Side Requirements*

1) Accept Server Side Events to capture Tweet stream from client
2) Be able to filter incoming tweet data based
  a. keyword
  b. timeframe
3) Create one or more data visualizations of sentiment analysis (D3 is preferrable)