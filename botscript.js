require("dotenv").config()
const { Contract } = require("ethers")
const { ethers } = require("hardhat")

const rpcETH = process.env.ETH_RPC_URL
const providerETH = new ethers.providers.WebSocketProvider(rpcETH)
const rpcBNB = process.env.BNB_RPC_URL
const providerBNB = new ethers.providers.WebSocketProvider(rpcBNB)

const ETH_CONTRACT_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const BNB_CONTRACT_ADDRESS = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"

const ETH_CONTRACT_ABI = [
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "_spender", type: "address" },
            { name: "_value", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "_from", type: "address" },
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { name: "_owner", type: "address" },
            { name: "_spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    { payable: true, stateMutability: "payable", type: "fallback" },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "owner", type: "address" },
            { indexed: true, name: "spender", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "from", type: "address" },
            { indexed: true, name: "to", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
    },
]
const BNB_CONTRACT_ABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "_owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "getOwner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
]

// const telegramBot = require("node-telegram-bot-api")
// const apiKEY = process.env.TG_API_KEY
// const TGBOT = new telegramBot(apiKEY, { polling: true })

// TGBOT.on("message", (message) => {
//     TGBOT.sendMessage(message.chat.id, "Dit is een test.")
// })

let ethAddresses = new Contract(
    ETH_CONTRACT_ADDRESS,
    ETH_CONTRACT_ABI,
    providerETH
)

let bnbAddresses = new Contract(
    BNB_CONTRACT_ADDRESS,
    BNB_CONTRACT_ABI,
    providerBNB
)

const addresses = [
    "0xE4A040AE4bAD72CdC5594695d2f8Efac0fA873cf" /** Jelle zijn wallet*/,
    "0x55f510bE6AB4c7E07EC6EE637aa83574975D6898" /** random wallet*/,
    "",
    "",
    "",
]

// //if an address from the array addresses trades an alt coin for ETH, then log that data in the console

// ethAddresses.on("Transfer", (from, to, value) => {
//     if (addresses.includes(from)) {
//         console.log("ETH transfer from: ", from, "to: ", to, "value: ", value)
//     }
// })

// //if an address from the array addresses trades an alt coin for BNB, then log that data in the console

// bnbAddresses.on("Transfer", (from, to, value) => {
//     if (addresses.includes(from)) {
//         console.log("BNB transfer from: ", from, "to: ", to, "value: ", value)
//     }
// })

const main = async () => {


    if (addresses.includes(addresses) === true) {
        const nameETH = await ethAddresses.name()
        ethAddresses.on("Transfer", (from, to, amount, data) => {
            console.log("name:", nameETH)
            console.log("from:", from)
            console.log("amount:", amount.toString(), "wei")
            console.log("to:", to)
            console.log(`data: https://etherscan.io/tx/${data.transactionHash}\n`)
        })
    }



    // providerETH.on("block", async (blockNumber) => {
    //     console.log("New block mined: " + blockNumber)
    //     for (let i = 0; i < addresses.length; i++) {
    //         let balance = await ethAddresses.balanceOf(addresses[i])
    //         if (balance > 0) {
    //             console.log("New ETH received: " + balance)
    //         }
    //     }
    // })

    if (addresses.includes(addresses === true)) {
        const nameBNB = await bnbAddresses.name()
        bnbAddresses.on("Transfer", (from, to, amount, data) => {
            console.log("name:", nameBNB)
            console.log("from:", from)
            console.log("amount:", amount.toString(), "wei")
            console.log("to:", to)
            console.log(`data: https://bscscan.com/tx/${data.transactionHash}\n`)
        })
    }

    // providerBNB.on("block", async (blockNumber) => {
    //     console.log("New block mined: " + blockNumber)
    //     for (let j = 0; j < addresses.length; j++) {
    //         let balance = await bnbAddresses.balanceOf(addresses[j])
    //         if (balance > 0) {
    //             console.log("New BNB received: " + balance)
    //         }
    //     }
    // })
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
