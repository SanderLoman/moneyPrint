require("dotenv").config()
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

const addresses = [
    "0xE4A040AE4bAD72CdC5594695d2f8Efac0fA873cf" /** Jelle BSC wallet          */,
    "0x7B23298319Ea680e73059AE6eB1fF4162C9bD89e" /** Sander ETH EN BSC wallet  */,
    "0xB6a4f41c83aeB4Bf9E0DcC8509A5cE6D73743c0f" /** Test wallet               */,
    "0xe5aB89E74af448043e1a4906E31E4C3eDd3f9662" /** Track wallet              */,
    "0xA7D04CA1E2E7008A807eB6Fd34D8A8E7ce45B865" /** Track wallet              */,
    "0xbbA6aDd128D8d4fBc55AbD7769c92D5A73bDc31d" /** Track wallet              */,
    "0x1d80900c7c302304eE4d1E2fe632c1605Aab3E1A" /** Jelle ETH wallet          */,
]

const main = async () => {
    console.log(`Running! Waiting for transactions...\n`)

    providerETH.on("pending", (TxHash) => {
        providerETH.getTransaction(TxHash).then((tx) => {
            for (let j = 0; j < addresses.length; j++) {
                if (tx.from == addresses[j]) {
                    if (tx.from == "7B23298319Ea680e73059AE6eB1fF4162C9bD89e") { //sander
                        console.log(`Name: Wrapped Ether\nNW: Sander Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${TxHash}\n`)
                        bot.sendMessage("-1001613920275", `Name: Wrapped Ether\nNW: Sander Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${TxHash}\n`)                        
                    } else if (tx.from == "0xE4A040AE4bAD72CdC5594695d2f8Efac0fA873cf") { //jelle bsc 
                        console.log(`Name: Wrapped Ether\nNW: Jelle Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${TxHash}\n`)
                        bot.sendMessage("-1001613920275", `Name: Wrapped Ether\nNW: Jelle Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${TxHash}\n`)      
                    } else if (tx.from == "0x1d80900c7c302304eE4d1E2fe632c1605Aab3E1A") { //jelle eth
                        console.log(`Name: Wrapped Ether\nNW: Jelle Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${TxHash}\n`)
                        bot.sendMessage("-1001613920275", `Name: Wrapped Ether\nNW: Jelle Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${TxHash}\n`)      
                    } else { //random
                        console.log(`Name: Wrapped Ether\nNW: Random Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${TxHash}\n`)
                        bot.sendMessage("-1001613920275", `Name: Wrapped Ether\nNW: Random Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${TxHash}\n`)                        
                    }
                }
            }
        }).catch(() => {})
    })

    providerBNB.on("pending", (TxHash) => {
        providerBNB.getTransaction(TxHash).then((tx) => {
            for (let j = 0; j < addresses.length; j++) {
                if (tx.from == addresses[j]) {
                    if (tx.from == "0x7B23298319Ea680e73059AE6eB1fF4162C9bD89e"){ //sander
                        console.log(`Name: Wrapped BNB\nNW: Sander Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n\nTxHash: https://bscscan.com/tx/${TxHash}\n`)
                        bot.sendMessage("-1001613920275", `Name: Wrapped BNB\nNW: Sander Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n\nTxHash: https://bscscan.com/tx/${TxHash}\n`)
                    } else if (tx.from == "0xE4A040AE4bAD72CdC5594695d2f8Efac0fA873cf") { //jelle bsc
                        console.log(`Name: Wrapped BNB\nNW: Jelle Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n\nTxHash: https://bscscan.com/tx/${TxHash}\n`)
                        bot.sendMessage("-1001613920275", `Name: Wrapped BNB\nNW: Jelle Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n\nTxHash: https://bscscan.com/tx/${TxHash}\n`)      
                    } else if (tx.from == "0x1d80900c7c302304eE4d1E2fe632c1605Aab3E1A") { //jelle eth
                        console.log(`Name: Wrapped BNB\nNW: Jelle Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n\nTxHash: https://bscscan.com/tx/${TxHash}\n`)
                        bot.sendMessage("-1001613920275", `Name: Wrapped BNB\nNW: Jelle Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n\nTxHash: https://bscscan.com/tx/${TxHash}\n`)      
                    } else { //random
                        console.log(`Name: Wrapped BNB\nNW: Random Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n\nTxHash: https://bscscan.com/tx/${TxHash}\n`)
                        bot.sendMessage("-1001613920275", `Name: Wrapped BNB\nNW: Random Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n\nTxHash: https://bscscan.com/tx/${TxHash}\n`)                        
                    }
                }
            }
        }).catch(() => {})
    })

    providerGOE.on("pending", (TxHash) => {
        providerGOE.getTransaction(TxHash).then((tx) => {
            for (let k = 0; k < addresses.length; k++) {
                if (tx.from == addresses[k]) {
                    if (tx.from == "0xB6a4f41c83aeB4Bf9E0DcC8509A5cE6D73743c0f") {
                        console.log(`Name: Goerli Wrapped Ether\nNW: Test wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} GOE\n\nTxHash: https://goerli.etherscan.io/tx/${TxHash}\n`)
                        bot.sendMessage("-1001613920275", `Name: Goerli Wrapped Ether\nNW: Test wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} GOE\n\nTxHash: https://goerli.etherscan.io/tx/${TxHash}\n`)
                    } else {
                        console.log(`Name: Goerli Wrapped Ether\nNW: Random Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} GOE\n\nTxHash: https://goerli.etherscan.io/tx/${TxHash}\n`)
                        bot.sendMessage("-1001613920275", `Name: Goerli Wrapped Ether\nNW: Random Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} GOE\n\nTxHash: https://goerli.etherscan.io/tx/${TxHash}\n`)                        
                    }
                }
            }
        }).catch(() => {})
    })
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})