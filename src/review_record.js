//var jsonld = require('../node_modules/jsonld/dist/jsonld.js');
var jsonld = require('jsonld');
var jsig = require('jsonld-signatures');
jsig.use('jsonld', jsonld);

class ReviewRecord {

  /**
   * Create review record, wrap it in a VC and sign with did
   *
   * @param obj, the review record to convert to VC
   *
   * @param did, the DID to sign the VC with (should be chlu-did)
   *
   * @return review as VC, signed. Or undefined. 
   */
  async sign(issuerDID, subjectDID, review) {
    const privateKeyBase58 = issuerDID.publicKey[0].privateKeyBase58
    const vc = {
      "@context": [
        'https://w3id.org/credentials/v1',
        'http://schema.org/'
      ],
      subject: subjectDID.id,
      issuer: issuerDID.id,
      claim: review
    }
    return jsig.sign(vc, {
      algorithm: 'Ed25519Signature2018',
      subject: subjectDID.id,
      privateKeyBase58,
    })
  }

  /**
   * Verify review record as a verifiable claim. This is not the Chlu
   * protocol verification
   *
   * @param obj, the review record to convert to VC
   *
   * @param did, the DID to sign the VC with (should be chlu-did)
   *
   * @return review as VC, signed. Or undefined. 
   */
  async verify(issuerDID, vc) {
    const publicKeyBase58 = issuerDID.publicKey[0].publicKeyBase58
    return jsig.verify(vc, {
      publicKeyBase58,
      checkTimestamp: false
    })
  }

  /*
   * Published review using provided IPFS. Should be
   * chlu-ipfs-support.
   * 
   * @param ipfs, the Chlu IPFS implementation to use
   */
  async publish(ipfs) {
    console.log("to be implemented")
  }
  
}

module.exports = ReviewRecord
