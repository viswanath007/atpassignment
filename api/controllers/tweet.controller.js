import config from "../../config";
import Tweet from '../models/tweet';


export async function getHashtagsCount(){
    let hashtagsCount = [];
    try {
        hashtagsCount = await Tweet.aggregate([
            {
                $addFields: {
                    date: {
                        $dateFromString: {
                            dateString: "$created_at"
                        }
                    }
                }
            },
            {
                $match: {
                    date: { $gt: new Date(new Date().setHours(new Date().getHours() - 1)) }
                }
            },
            { $unwind: "$hashtags" },
            {
                $group: {
                    _id: "$hashtags.text",
                    count: { $sum: 1 }
                }
            },
            {$project: {
                _id: 0,
                hashTag: "$_id",
                count: 1
            }},
            { $sort: { count: -1 } },
            { $limit: 10 }
        ])
        // .exec((err, data) => {
        //     if (err) throw err;
        //     // console.log(data);
        // });
    } catch (err){
        console.error(err);
    }
    // console.log(hashtagsCount);
    return hashtagsCount;
}

export function deleteExpiredTweets(){
    Tweet.remove({ date: { $lt: new Date(new Date().setHours(new Date().getHours() - 1))}})
}
