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

const ETH_CONTRACT_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" //ETH
const BNB_CONTRACT_ADDRESS = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" //BNB
const GOE_CONTRACT_ADDRESS = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6" //GOE
const PAN_CONTRACT_ADDRESS = "0x10ed43c718714eb63d5aa57b78b54704e256024e" //PAN
const Uv2_CONTRACT_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" //ETH
const Uv3_CONTRACT_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45" //ETH

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
            { name: "guy", type: "address" },
            { name: "wad", type: "uint256" },
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
            { name: "src", type: "address" },
            { name: "dst", type: "address" },
            { name: "wad", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [{ name: "wad", type: "uint256" }],
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
        outputs: [{ name: "", type: "uint8" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [{ name: "", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
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
            { name: "dst", type: "address" },
            { name: "wad", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
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
            { name: "", type: "address" },
            { name: "", type: "address" },
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
            { indexed: true, name: "src", type: "address" },
            { indexed: true, name: "guy", type: "address" },
            { indexed: false, name: "wad", type: "uint256" },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "src", type: "address" },
            { indexed: true, name: "dst", type: "address" },
            { indexed: false, name: "wad", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "dst", type: "address" },
            { indexed: false, name: "wad", type: "uint256" },
        ],
        name: "Deposit",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "src", type: "address" },
            { indexed: false, name: "wad", type: "uint256" },
        ],
        name: "Withdrawal",
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

let Uv2Addresses = new Contract(
    Uv2_CONTRACT_ADDRESS,
    ETH_CONTRACT_ABI,
    providerETH
)

let Uv3Addresses = new Contract(
    Uv3_CONTRACT_ADDRESS,
    ETH_CONTRACT_ABI,
    providerETH
)

let panAddresses = new Contract(
    PAN_CONTRACT_ADDRESS,
    BNB_CONTRACT_ABI,
    providerBNB
)

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

    const nameBNB = await bnbAddresses.name()
    const nameETH = await ethAddresses.name()
    const nameGOE = await goeAddresses.name()

    //ETH
    Uv2Addresses.on("Transfer", (src, dst, wad, data) => {
        for (let f = 0; f < addresses.length; f++) {
            if (src === addresses[f]) {
                console.log(`Uv2Addresses: Detected trade on ${nameETH}!\n`)
                bot.sendMessage("-1001613920275", `Name: ${nameETH}\nFrom: ${src}\nTo: ${dst}\nValue: ${ethers.utils.formatUnits(wad, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${data.transactionHash}`)
                console.log(`Name: ${nameETH}\nFrom: ${src}\nTo: ${dst}\nValue: ${ethers.utils.formatUnits(wad, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${data.transactionHash}`)
            }
        }
    })

    //ETH
    Uv3Addresses.on("Transfer", (from, to, value, data) => {
        for (let g = 0; g < addresses.length; g++) {
            if (from === addresses[g]) {
                console.log(`Uv3Addresses: Detected trade on ${nameETH}!\n`)
                bot.sendMessage("-1001613920275", `Name: ${nameETH}\nFrom: ${from}\nTo: ${to}\nValue: ${ethers.utils.formatUnits(value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${data.transactionHash}`)
                console.log(`Name: ${nameETH}\nFrom: ${from}\nTo: ${to}\nValue: ${ethers.utils.formatUnits(value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${data.transactionHash}`)
            }
        }
    })

    //BNB
    panAddresses.on("Transfer", (from, to, value, data) => {
        for (let h = 0; h < addresses.length; h++) {
            if (from === addresses[h]) {
                console.log(`panAddresses: Detected trade on ${nameBNB}!\n`)
                bot.sendMessage("-1001613920275", `Name: ${nameBNB}\nFrom: ${from}\nTo: ${to}\nValue: ${ethers.utils.formatUnits(value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${data.transactionHash}`)
                console.log(`Name: ${nameBNB}\nFrom: ${from}\nTo: ${to}\nValue: ${ethers.utils.formatUnits(value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${data.transactionHash}`)
            }
        }
    })

    //ETH
    ethAddresses.on("Transfer", (from, to, value, data) => {
        for (let i = 0; i < addresses.length; i++) {
            if (from === addresses[i]) {
                console.log(`ethAddresses: Detected trade on ${nameETH}!\n`)
                bot.sendMessage("-1001613920275", `Name: ${nameETH}\nFrom: ${from}\nTo: ${to}\nValue: ${ethers.utils.formatUnits(value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${data.transactionHash}`)
                console.log(`Name: ${nameETH}\nFrom: ${from}\nTo: ${to}\nValue: ${ethers.utils.formatUnits(value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${data.transactionHash}`)
            }
        }
    })

    //BNB
    bnbAddresses.on("Transfer", (from, to, value, data) => {
        for (let j = 0; j < addresses.length; j++) {
            if (from === addresses[j]) {
                console.log(`bnbAddresses: Detected trade on ${nameBNB}!\n`)
                bot.sendMessage("-1001613920275", `Name: ${nameBNB}\nFrom: ${from}\nTo: ${to}\nValue: ${ethers.utils.formatUnits(value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${data.transactionHash}`)
                console.log(`Name: ${nameBNB}\nFrom: ${from}\nTo: ${to}\nValue: ${ethers.utils.formatUnits(value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${data.transactionHash}`)
            }
        }
    })

    //GOE
    goeAddresses.on("Deposit", (dst, wad, value, data) => {
        for (let k = 0; k < addresses.length; k++) {
            if (dst == addresses[k]) {
                console.log(`goeAddresses: Detected trade on ${nameGOE}!\n`)
                bot.sendMessage("-1001613920275", `Name: ${nameGOE}\nFrom: ${dst}\nTo: ${wad}`)
                console.log(`Name: ${nameGOE}\nFrom: ${dst}\nTo: ${wad}`)
            }
        }
    })
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
