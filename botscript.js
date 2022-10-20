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

const JelleBscWallet = "0xE4A040AE4bAD72CdC5594695d2f8Efac0fA873cf"
const SanderWallet = "0x7B23298319Ea680e73059AE6eB1fF4162C9bD89e"
const Sanderwallet2 = "0x30F8A0b82bd5fb32d3dae5dF6D392316aC7766E1"
const TestWallet = "0xB6a4f41c83aeB4Bf9E0DcC8509A5cE6D73743c0f"
const TrackWallet1 = "0xe5aB89E74af448043e1a4906E31E4C3eDd3f9662"
const TrackWallet2 = "0xA7D04CA1E2E7008A807eB6Fd34D8A8E7ce45B865"
const TrackWallet3 = "0xbbA6aDd128D8d4fBc55AbD7769c92D5A73bDc31d"
const JelleEthWallet = "0x1d80900c7c302304eE4d1E2fe632c1605Aab3E1A"

const addresses = [
    JelleBscWallet,
    SanderWallet,
    Sanderwallet2,
    TestWallet,
    TrackWallet1,
    TrackWallet2,
    TrackWallet3,
    JelleEthWallet,
]

const main = async () => {
    console.log(`Running! Waiting for transactions...\n`)

    providerETH.on("pending", (TxHash) => {
        providerETH.getTransaction(TxHash).then((tx) => {
            for (let j = 0; j < addresses.length; j++) {
                if (tx.from == addresses[j]) {
                    if (tx.from == SanderWallet) { //sander
                        console.log(`<a href='https://etherscan.io/address/${tx.from}'>Sander Wallet</a> ETH\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n\n<a href='https://etherscan.io/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                        bot.sendMessage("-1001613920275", `<a href='https://etherscan.io/address/${tx.from}'>Sander Wallet</a> ETH\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n<a href='https://etherscan.io/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                    } else if (tx.from == Sanderwallet2) { //sander
                        console.log(`<a href='https://etherscan.io/address/${tx.from}'>Sander Wallet</a> ETH\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n\n<a href='https://etherscan.io/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                        bot.sendMessage("-1001613920275", `<a href='https://etherscan.io/address/${tx.from}'>Sander Wallet</a> ETH\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n<a href='https://etherscan.io/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                    } else if (tx.from == JelleBscWallet) { //jelle bsc 
                        console.log(`<a href='https://etherscan.io/address/${tx.from}'>Jelle Wallet</a> ETH\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n<a href='https://etherscan.io/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                        bot.sendMessage("-1001613920275", `<a href='https://etherscan.io/address/${tx.from}'>Jelle Wallet</a> ETH\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n<a href='https://etherscan.io/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                    } else if (tx.from == JelleEthWallet) { //jelle eth
                        console.log(`<a href='https://etherscan.io/address/${tx.from}'>Jelle Wallet</a> ETH\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n<a href='https://etherscan.io/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                        bot.sendMessage("-1001613920275", `<a href='https://etherscan.io/address/${tx.from}'>Jelle Wallet</a> ETH\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n<a href='https://etherscan.io/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
//                    } else if (tx.from == "0x71ff3A04dc7b1eE71810e926D1AE71ad61A9cFDd") { //gods wallet
//                        console.log(`Name: Wrapped Ether\nNW: Maybe Gods Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${TxHash}\n`)
//                        bot.sendMessage("-1001613920275", `Name: Wrapped Ether\nNW: Maybe Gods Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n\nTxHash: https://etherscan.io/tx/${TxHash}\n`)
                    } else { //random
                        console.log(`<a href='https://etherscan.io/address/${tx.from}'>Random Wallet</a> ETH\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n<a href='https://etherscan.io/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                        bot.sendMessage("-1001613920275", `<a href='https://etherscan.io/address/${tx.from}'>Random Wallet</a> ETH\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} ETH\n<a href='https://etherscan.io/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                    }
                }
            }
        }).catch(() => {})
    })

    providerBNB.on("pending", (TxHash) => {
        providerBNB.getTransaction(TxHash).then((tx) => {
            for (let j = 0; j < addresses.length; j++) {
                if (tx.from == addresses[j]) {
                    if (tx.from == SanderWallet){ //sander
                        console.log(`<a href='https://bscscan.com/address/${tx.from}'>Sander Wallet</a> BNB\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n<a href='https://bscscan.com/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                        bot.sendMessage("-1001613920275", `<a href='https://bscscan.com/address/${tx.from}'>Sander Wallet</a> BNB\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n<a href='https://bscscan.com/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                    } else if (tx.from == Sanderwallet2) { //sander
                        console.log(`<a href='https://bscscan.com/address/${tx.from}'>Sander Wallet</a> BNB\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n\n<a href='https://bscscan.com/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                        bot.sendMessage("-1001613920275", `<a href='https://bscscan.com/address/${tx.from}'>Sander Wallet</a> BNB\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n<a href='https://bscscan.com/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                    } else if (tx.from == JelleBscWallet) { //jelle bsc
                        console.log(`<a href='https://bscscan.com/address/${tx.from}'>Jelle Wallet</a> BNB\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n<a href='https://bscscan.com/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                        bot.sendMessage("-1001613920275", `<a href='https://bscscan.com/address/${tx.from}'>Jelle Wallet</a> BNB\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n<a href='https://bscscan.com/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                    } else if (tx.from == JelleEthWallet) { //jelle eth
                        console.log(`<a href='https://bscscan.com/address/${tx.from}'>Jelle Wallet</a> BNB\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n<a href='https://bscscan.com/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                        bot.sendMessage("-1001613920275", `<a href='https://bscscan.com/address/${tx.from}'>Jelle Wallet</a> BNB\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n<a href='https://bscscan.com/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
//                    } else if (tx.from == "0x71ff3A04dc7b1eE71810e926D1AE71ad61A9cFDd") { //gods wallet
//                       console.log(`Name: Wrapped BNB\nNW: Maybe Gods Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n\nTxHash: https://bscscan.com/tx/${TxHash}\n`)
//                        bot.sendMessage("-1001613920275", `Name: Wrapped BNB\nNW: Maybe Gods Wallet\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n\nTxHash: https://bscscan.com/tx/${TxHash}\n`)
                    } else { //random
                        console.log(`<a href='https://bscscan.com/address/${tx.from}'>Random Wallet</a> BNB\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n<a href='https://bscscan.com/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                        bot.sendMessage("-1001613920275", `<a href='https://bscscan.com/address/${tx.from}'>Random Wallet</a> BNB\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} BNB\n<a href='https://bscscan.com/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                    }
                }
            }
        }).catch(() => {})
    })

    providerGOE.on("pending", (TxHash) => {
        providerGOE.getTransaction(TxHash).then((tx) => {
            for (let k = 0; k < addresses.length; k++) {
                if (tx.from == addresses[k]) {
                    if (tx.from == TestWallet) {
                        console.log(`<a href='https://goerli.etherscan.io/address/${tx.from}'>Test Wallet</a> GOE\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} GOE\n<a href='https://goerli.etherscan.io/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
                        bot.sendMessage("-1001613920275", `<a href='https://goerli.etherscan.io/address/${tx.from}'>Test Wallet</a> GOE\nTo: ${tx.to}\nValue: ${ethers.utils.formatUnits(tx.value, 18)} GOE\n<a href='https://goerli.etherscan.io/tx/${TxHash}'>TxHash</a>\n`, { parse_mode: "HTML", disable_web_page_preview: true })
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