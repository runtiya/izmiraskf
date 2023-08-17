const cache = require('memory-cache');

const requestCaching = (cachingAsMiliseconds) => {
    return (req, res, next) => {
        try{
            const cachedData = cache.get(req.originalUrl);
            if(cachedData){
                return res.send(cachedData);
            } else {
                const originalSend = res.send;
                res.send = (data) => {
                    cache.put(req.originalUrl, data, cachingAsMiliseconds);
                    originalSend.call(res, data);
                };
                next();
            }
        } catch (error) {
          // Write error message
          next();
        }
    };
}

module.exports = requestCaching;
