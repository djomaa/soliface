const assert = require('assert')
const coder = require('web3-eth-abi')
console.log("🚀 ~ file: test.js:2 ~ coder", coder)

const abi = {
  "inputs": [
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "firstParentField",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "firstChildField",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "secondChildField",
              "type": "address[]"
            },
          ],
          "internalType": "struct Contract.Child",
          "name": "secondParentField",
          "type": "tuple"
        },
      ],
      "internalType": "struct Contract.Parent",
      "name": "tokens",
      "type": "tuple"
    }
  ],
  "name": "updateDepositTokensWhitelist",
  "stateMutability": "nonpayable",
  "type": "function"
}

const data = [
  [
    "1",
    ["2", ['0xbe807dddb074639cd9fa61b47676c064fc50d62c', '0x685b1ded8013785d6623cc18d214320b6bb64759']]
  ]
]

const gen = [
  [
    "1",
    [
      "2",
      [
        [
          "0x585b1ded8013785d6623cc18d214320b6bb64759"
        ],
        [
          "0x685b1ded8013785d6623cc18d214320b6bb64759"
        ]
      ]
    ]
  ]
]

assert.deepStrictEqual(data, gen);

const res = coder.encodeFunctionCall(abi, data);
console.log("🚀 ~ file: test.js:44 ~ res", res)


