import  axios  from 'axios';

const headers= {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4'
  }
const res = await axios.get('https://mobile.twitter.com/home',{headers:headers})

console.log(res.data)