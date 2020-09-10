
const crypto = require('crypto');
const dayjs = require('dayjs');

function sha256(message, secret = '', encoding) {
    const hmac = crypto.createHmac('sha256', secret);
    return hmac.update(message).digest(encoding);
}
function getHash(message, encoding = 'hex') {
    const hash = crypto.createHash('sha256');
    return hash.update(message).digest(encoding);
}

export const getCommondLine = (text, { base, target }) => {
    // 密钥参数
    const SECRET_ID = 'AKIDChGaEZGdjhR9i4x5CzV4hG0VhZmIKb6G';
    const SECRET_KEY = 'gXKDsGp2Cq5gWbETMSpyJK5ULuvKljtQ';
    const endpoint = 'tmt.tencentcloudapi.com';
    const service = 'tmt';
    const region = 'ap-shanghai';
    const action = 'TextTranslate';
    const version = '2018-03-21';
    const timestamp = parseInt(new Date().getTime() / 1000);
    //时间处理, 获取世界时间日期
    const date = dayjs().format('YYYY-MM-DD');

    // ************* 步骤 1：拼接规范请求串 *************
    const signedHeaders = 'content-type;host';
    const params = {
        SourceText: text,
        Source: base,
        Target: target,
        ProjectId: 1197129,
    };
    const payload = JSON.stringify(params);

    const hashedRequestPayload = getHash(payload);
    const httpRequestMethod = 'POST';
    const canonicalUri = '/';
    const canonicalQueryString = '';
    const canonicalHeaders = 'content-type:application/json;\n' + 'host:' + endpoint + '\n';

    const canonicalRequest = httpRequestMethod + '\n'
                         + canonicalUri + '\n'
                         + canonicalQueryString + '\n'
                         + canonicalHeaders + '\n'
                         + signedHeaders + '\n'
                         + hashedRequestPayload;
    // ************* 步骤 2：拼接待签名字符串 *************
    const algorithm = 'TC3-HMAC-SHA256';
    const hashedCanonicalRequest = getHash(canonicalRequest);
    const credentialScope = date + '/' + service + '/' + 'tc3_request';
    const stringToSign = algorithm + '\n' +
                    timestamp + '\n' +
                    credentialScope + '\n' +
                    hashedCanonicalRequest;
    // ************* 步骤 3：计算签名 *************
    const kDate = sha256(date, 'TC3' + SECRET_KEY);
    const kService = sha256(service, kDate);
    const kSigning = sha256('tc3_request', kService);
    const signature = sha256(stringToSign, kSigning, 'hex');
    // ************* 步骤 4：拼接 Authorization *************
    const authorization = algorithm + ' ' +
                    'Credential=' + SECRET_ID + '/' + credentialScope + ', ' +
                    'SignedHeaders=' + signedHeaders + ', ' +
                    'Signature=' + signature;
    const Call_Information = 'curl -X POST ' + 'https://' + endpoint
                           + ' -H "Authorization: ' + authorization + '"'
                           + ' -H "Content-Type: application/json;"'
                           + ' -H "Host: ' + endpoint + '"'
                           + ' -H "X-TC-Action: ' + action + '"'
                           + ' -H "X-TC-Timestamp: ' + timestamp.toString() + '"'
                           + ' -H "X-TC-Version: ' + version + '"'
                           + ' -H "X-TC-Region: ' + region + '"'
                           + ' -d \'' + payload + '\'';
    return Call_Information;
};


