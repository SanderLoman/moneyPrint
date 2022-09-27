require("dotenv").config()
const { Contract } = require("ethers")
const { ethers } = require("hardhat")
const telegramBot = require("node-telegram-bot-api")

const TGtoken = process.env.TG_API_KEY

const bot = new telegramBot(TGtoken, { polling: true })

const rpcETH = process.env.ETH_RPC_URL
const providerETH = new ethers.providers.WebSocketProvider(rpcETH)

const rpcBNB = process.env.BNB_RPC_URL
const providerBNB = new ethers.providers.WebSocketProvider(rpcBNB)

const rpcGOE = process.env.GOE_RPC_URL
const providerGOE = new ethers.providers.WebSocketProvider(rpcGOE)

const ETH_CONTRACT_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const BNB_CONTRACT_ADDRESS = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
const GOE_CONTRACT_ADDRESS = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"

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

const GOE_CONTRACT_ABI = [
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [
            {
                name: "",
                type: "string",
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
                name: "guy",
                type: "address",
            },
            {
                name: "wad",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
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
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
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
                name: "src",
                type: "address",
            },
            {
                name: "dst",
                type: "address",
            },
            {
                name: "wad",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
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
                name: "wad",
                type: "uint256",
            },
        ],
        name: "withdraw",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [
            {
                name: "",
                type: "uint8",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
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
        name: "symbol",
        outputs: [
            {
                name: "",
                type: "string",
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
                name: "dst",
                type: "address",
            },
            {
                name: "wad",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
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
        inputs: [],
        name: "deposit",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "",
                type: "address",
            },
            {
                name: "",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        payable: true,
        stateMutability: "payable",
        type: "fallback",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "src",
                type: "address",
            },
            {
                indexed: true,
                name: "guy",
                type: "address",
            },
            {
                indexed: false,
                name: "wad",
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
                name: "src",
                type: "address",
            },
            {
                indexed: true,
                name: "dst",
                type: "address",
            },
            {
                indexed: false,
                name: "wad",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "dst",
                type: "address",
            },
            {
                indexed: false,
                name: "wad",
                type: "uint256",
            },
        ],
        name: "Deposit",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "src",
                type: "address",
            },
            {
                indexed: false,
                name: "wad",
                type: "uint256",
            },
        ],
        name: "Withdrawal",
        type: "event",
    },
]

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

let goeAddresses = new Contract(
    GOE_CONTRACT_ADDRESS,
    GOE_CONTRACT_ABI,
    providerGOE
)

const addresses = [
    "0xE4A040AE4bAD72CdC5594695d2f8Efac0fA873cf" /** Jelle wallet  */,
    "0x55f510bE6AB4c7E07EC6EE637aa83574975D6898" /** Random wallet */,
    "0x7B23298319Ea680e73059AE6eB1fF4162C9bD89e" /** Sander wallet */,
    "0xB6a4f41c83aeB4Bf9E0DcC8509A5cE6D73743c0f" /** Test wallet   */,
    "0xe5aB89E74af448043e1a4906E31E4C3eDd3f9662" /** random wallet */,
    "0xA7D04CA1E2E7008A807eB6Fd34D8A8E7ce45B865" /** random wallet */,
    "0xbbA6aDd128D8d4fBc55AbD7769c92D5A73bDc31d" /** random wallet */, 
]

const main = async () => {
    console.log(`Running! Waiting for transactions...\n`)

    //ETH mainnet

    const nameETH = await ethAddresses.name()

    ethAddresses.on("Swap", (from, to, value, data) => {
        for (let i = 0; i < addresses.length; i++) {
            if (from === addresses[i]) {
                bot.sendMessage("-1001613920275", `Name: ${nameETH}\nFrom: ${from}\nTo: ${to}\nValue: ${ethers.utils.formatUnits(value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${data.transactionHash}`)
                console.log(`Name: ${nameETH}\nFrom: ${from}\nTo: ${to}\nValue: ${ethers.utils.formatUnits(value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${data.transactionHash}`)
            }
       }
    })

    //BNB mainnet

    const nameBNB = await bnbAddresses.name()

    bnbAddresses.on("Transfer", (from, to, value, data) => {
       for (let j = 0; j < addresses.length; j++) {
            if (from === addresses[j]) {
                bot.sendMessage("-1001613920275", `Name: ${nameBNB}\nFrom: ${from}\nTo: ${to}\nValue: ${ethers.utils.formatUnits(value, 18)} BNB\n\nTxHash: https://bscscan.com/tx/${data.transactionHash}`)
                console.log(`Name: ${nameBNB}\nFrom: ${from}\nTo: ${to}\nValue: ${ethers.utils.formatUnits(value, 18)} ETH\n\nTxHash: https://bscscan.com/tx/${data.transactionHash}`)
            }
        }
    })

    //Goerli testnet

    const nameGOE = await goeAddresses.name()

    goeAddresses.on("Depost", (dst, wad) => {
        for (let k = 0; k < addresses.length; k++) {
            if (dst === addresses[k]) {
                bot.sendMessage("-1001613920275", `Name: Goerli ${nameGOE}\nFrom: ${dst}\nTo: ${wad}`)
                console.log(`Name: ${nameGOE}\nFrom: ${dst}\nTo: ${wad}`)
            }
        }
    })
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})


//\nValue: ${ethers.utils.formatUnits(value, 18)} ETH\n\nTxHash: https://goerli.etherscan.io/tx/${data.transactionHash}