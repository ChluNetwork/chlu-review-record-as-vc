const sinon = require('sinon')
const expect = require('chai').expect
const ReviewRecord = require('../src/review_record')

var jsonld = require('jsonld');
var jsig = require('jsonld-signatures');
jsig.use('jsonld', jsonld);

const chluDID = {"@context":"https://w3id.org/did/v1","id":"did:chlu:B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU","publicKey":[{"id":"did:chlu:B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU#keys-1","type":"Ed25519VerificationKey2018","owner":"did:chlu:B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU","publicKeyBase58":"B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU","privateKeyBase58":"28dDPywX1z4Sv7ksWthdh6yGN6ua42YER34mN5Q3dLqosLEH4L3s5HSvRtdEDqNsvU33Ug84gfkJpHpTUZyga7bx"}],"authentication":[{"type":"Ed25519SignatureAuthentication2018","publicKey":"did:chlu:B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU#keys-1"}]}

const vendorDID = {"@context":"https://w3id.org/did/v1","id":"did:chlu:GuhduVevhGzwc8DtyNQWoUUQvSWcAZrTuNqNL9bG7XfY","publicKey":[{"id":"did:chlu:GuhduVevhGzwc8DtyNQWoUUQvSWcAZrTuNqNL9bG7XfY#keys-1","type":"Ed25519VerificationKey2018","owner":"did:chlu:GuhduVevhGzwc8DtyNQWoUUQvSWcAZrTuNqNL9bG7XfY","publicKeyBase58":"GuhduVevhGzwc8DtyNQWoUUQvSWcAZrTuNqNL9bG7XfY","privateKeyBase58":"4sGHzpG5th38v4WhaShoXRKaDvN3vtXgXqQjCwcqs19xetAhkbabBitKFPPgZnrGESQaQrfdeTbqZjbzh7C6sZaS"}],"authentication":[{"type":"Ed25519SignatureAuthentication2018","publicKey":"did:chlu:GuhduVevhGzwc8DtyNQWoUUQvSWcAZrTuNqNL9bG7XfY#keys-1"}]}

const signedVC = {"@context":["https://w3id.org/credentials/v1","http://schema.org/"],"subject":"did:chlu:GuhduVevhGzwc8DtyNQWoUUQvSWcAZrTuNqNL9bG7XfY","issuer":"did:chlu:B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU","claim":{"ReviewBody":"blah","ReviewRating":5},"sec:proof":{"@graph":{"type":"sec:Ed25519Signature2018","created":"2018-04-30T12:19:54Z","sec:jws":"eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..3wrjm2ERq1cIPyQvm39Cho0GGOU1HuaYh-ZDV9VnpHgm9tUYaaYPrS6zFYU3656BLd86ibMFFW__XohCYi3NAg"}}}

describe('ReviewRecord', () => {
  beforeEach(() => {
  })

  it('Signs a review record, returning a verifiable claim', async () => {
    const review = {
      ReviewBody: "blah",
      ReviewRating: 5
    }  
    
    var jsigSpy = sinon.stub(jsig, "sign")
    const vc = await new ReviewRecord().sign(chluDID, vendorDID, review)
    sinon.assert.called(jsig.sign);
  })

  // TODO: Add a test to check verify
})
