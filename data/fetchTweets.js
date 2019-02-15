import Twitter from "twit";
import config from "../config";
import Tweet from '../api/models/tweet';

export default () => {
    const twitter = new Twitter(config.twitterConfig);

    // get list of trends for a place - id 1 (world)
    twitter.get('trends/place', { id: 1 }, function (err, data, resp) {
        // console.log(data);
        // get all trend names
        const trendNames = (data && data[0]) ?
          data[0].trends.map(({ name, tweet_volume }) => name.toLowerCase()) :
          "";
        // console.log(trendNames);

        // attach to stream using trends as track parameters
        const twitterStream = twitter.stream('statuses/filter', { track: trendNames.join(',') });

        let i = 0;
        // on tweet
        twitterStream.on('tweet', (tweet) => {
            const { created_at, id, entities: { hashtags } = {}, lang, favorite_count } = tweet;
            if(hashtags.length === 0)
                return;
            // loop through all hashtags
            // hashtags.forEach(hashtag => {
            //     // is hashtag trending
            //     const hashStr = '#' + hashtag.text.toLowerCase();
            //     if(trendNames.indexOf(hashStr) > -1){
            //         console.log(hashStr);
            //     }
            // })

            const data = { created_at, id, hashtags, lang, favorite_count };

            const options = {
                new: true,
                upsert: true
            };

            Tweet.update({ id }, data, options, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    // console.log(i + " - inserted: " + res.n, "modified: " + res.nModified);
                }
            });
            i++;
        });

        twitterStream.on('error', (error) => {
            throw error;
        });

    });

}
