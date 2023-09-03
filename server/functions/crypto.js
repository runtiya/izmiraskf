const crypto = require('crypto');
const secretKey = require("../environments/development").cryptojsSecretKey;

function encryptData(data) {
  try {
    const algorithm = 'aes-256-cbc';
    const iv = crypto.randomBytes(16); // Rastgele bir Initialization Vector (IV) oluşturun
    //const secretKey = '7ce2daf0bdac7688ca2fd73f08a8e130';
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);

    let encryptedData = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encryptedData += cipher.final('hex');

    return {
      iv: iv.toString('hex'), // Şifreleme için kullanılan IV'yi hex formatında döndürün
      encryptedData: encryptedData,
    };

  } catch (error) {
    //return null;
    return data;

  }



}

exports.encryptData = encryptData;
