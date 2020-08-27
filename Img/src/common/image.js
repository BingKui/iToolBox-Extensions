const BaseImage = require('base64-img');

export const ImageToBase64 = (filePath) => {
    return new Promise((resolve, reject) => {
        BaseImage.base64(filePath, (err, data) => {
            if (err) console.log(err);
            resolve(data);
        });
    });
};

export const ImageUrlToBase64 = (url) => {
    return new Promise((resolve, reject) => {
        BaseImage.requestBase64(url, (err, res, body) => {
            if (err) console.log();
            resolve(body);
        });
    });
};

export const Base64ToImage = (data) => {

};
