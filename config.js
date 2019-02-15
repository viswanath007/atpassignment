const config = {
  mongoURL: process.env.MLAB_MONGO_URL || 'mongodb://127.0.0.1:27017/mydb?authSource=mydb',
  port: process.env.PORT || 5000,
  twitterConfig: {
    consumer_key: 'fID09SvhI1tyI8tohT0NAbSLT',
    consumer_secret: '15O0KPC5ytdMsEy66L3DlReEjxVvr5fwvoyIHDwE9vyhUt9Bks',
    access_token: '2247528453-bIC56ajbBXRFQQnSW2dtteLW71hssJZoyhFOUOE',
    access_token_secret: 'z6MxGENYZeGl44od0eEAuDvMbFYsvOA6N28aVSnP8CByQ',
  }
};

export default config;
