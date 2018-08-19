# Ratings and Reviews as Verifiable Claims

## Chlu Review Records

The Chlu protocol enables capturing independently verifiable ratings
and reviews backed by proof of payment. 

The proof of payment is available via publicly accessible bitcoin
blockchain.

Independent verification is provided by each review record capturing a
proof of payment request issued by a marketplace on behalf of a
vendor. This proof of payment request is later included in the proof
of payment by the customer at the time of payment.

The proof of payment request along with proof of payment enable anyone
who to independently verify the validity of a review without trusting
a third party.

For details of the Chlu protocol see
[https://github.com/ChluNetwork/chlu-protocol](https://github.com/ChluNetwork/chlu-protocol)

## Verifiable Claims

Verifiable Claims (VC) is a tamper-proof claim whose authorship can be
cryptographically verified. See, [what is a verifiable
claim?](https://www.w3.org/TR/verifiable-claims-data-model/#what-is-a-verifiable-claim?)

VC specifications are being developed by the W3C Community Group, see
the W3C home page for more details. https://www.w3.org/2017/vc/WG/

### Decentralised Identity (DID)

Verifiable claims are issued for Decentralised Identity (DID), so that
the DID owner can provide the proof of the claim without requiring the
original claim issuer to be available or accessible.

DID specifications are being developed by the W3C Community Group, see
https://w3c-ccg.github.io/did-spec/

## Chlu Review Records as Verifiable Claims

The module is a proof of concept implementation to show how a Chlu
review record can be captured as a verifiable claim.

There are three actors in a Chlu Review Record.

1. A _vendor_ selling a product or a service
2. A _marketplace_ where the vendor is selling the product
3. A _customer_ who makes a purchase at a marketplace and writes a
   review for the vendor.

We propose that each review record is issued by the customer DID, and
includes just enough data for anyone to verifiable that the claim is: 

1. Backed by a payment, and that,
2. The payment is backed by a verifiable proof of payment request
   issued by the marketplace on behalf of a the vendor.

### Example

The following is an example of a review record published as a
verifiable claim:

```
{
  "@context": [
    "http://schema.org/Review",
    "http://schema.org/Rating",
    "https://w3id.org/security/v1"
  ],
  "@id": "https://demomarketplace.com/reviews/123456",
  "type": ["Credential", "Review"],
  "issuer": "did:chlu:B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU",
  "issued": "2017-12-25",
  "claim" : {
    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
    "Review": {
        "ReviewBody": "Excellent work delivered by Alice. Was quick to respond and communicated really well.",
        "ReviewRating": {
            "bestRating": 5,
            "worstRating": 1,
            "ratingValue": 4
        }
    },
    "popr": {
        "currency_symbol": "BTC",
        "amount": 0.001,
        "key_location": "Qm...",
        "chlu_version": "0.1.0",
        "signature": {
            "type": "LinkedDataSignature2015",
            "created": "2016-06-18T21:19:10Z",
            "creator": "vm pub key",
            "domain": "json-ld.org",
            "nonce": "97639n251",
            "signatureValue": "..."
        },
        "vendor_key_location": "Qm..."
    }
  },
  "signature": {
    "type": "LinkedDataSignature2015",
    "created": "2016-06-18T21:19:10Z",
    "creator": "did:chlu:B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU#keys-1",
    "domain": "json-ld.org",
    "nonce": "598c63d6",
    "signatureValue": "BavEll0/I1zpYw8XNi1bgVg/sCneO4Jugez8RwDg/+..."
  }
}
```

The verifiable claim captures the review record: 

```
{
  "ReviewBody": "Excellent work delivered by Alice. Was quick to respond and communicated really well.",
  "ReviewRating": {
    "bestRating": 5,
    "worstRating": 1,
    "ratingValue": 4
  }
}
```

Authored (we say issued) by customer with DID

```
{
  "@context": "https://w3id.org/did/v1",
  "id": "did:chlu:B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU",
  "publicKey": [
    {
      "id": "did:chlu:B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU#keys-1",
      "type": "Ed25519VerificationKey2018",
      "owner": "did:chlu:B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU",
      "publicKeyBase58": "B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU",
    }
  ],
  "authentication": [
    {
      "type": "Ed25519SignatureAuthentication2018",
      "publicKey": "did:chlu:B6BrdJTTCzu9m52rKVZnitaLPNB6GhTWn6MkPJhrTksU#keys-1"
    }
  ]
}
```

Backed by Proof of Payment Request

```
{
  "currency_symbol": "BTC",
  "amount": 0.001,
  "key_location": "Qm...",
  "chlu_version": "0.1.0",
  "signature": {
    "type": "LinkedDataSignature2015",
    "created": "2016-06-18T21:19:10Z",
    "creator": "vm pub key",
    "domain": "json-ld.org",
    "nonce": "97639n251",
    "signatureValue": "..."
  },
  "vendor_key_location": "Qm..."
}
```

This module, uses JavaScript implementations of Jason-ld
(https://github.com/digitalbazaar/jsonld.js) and jsonld-signature
(https://github.com/digitalbazaar/jsonld-signatures/) provided by
OpenBazaar.
