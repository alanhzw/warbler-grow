import {JSEncrypt} from 'jsencrypt';
export const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOmLoU+Ren28tiSDRB3T9rtL02xuXhkC1652NldwD/G8LrgN5emGNnpqydAZh+q6KgqU3bcb3dQnPYzBRq/PE5sCAwEAAQ=='

export default  {
// 加密
  des_encrypt(data) {
    const encryptor = new JSEncrypt() // 新建JSEncrypt对象
    encryptor.setPublicKey(publicKey) // 设置公钥
    // 对需要加密的数据进行加密
    return encryptor.encrypt(data)
  }
}

