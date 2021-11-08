async function NearWalletConfig(){
    const {keyStores,connect,WalletConnection} = window.nearApi;
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const config = {
        networkId: "testnet",
        keyStore, // optional if not signing transactions
        nodeUrl: "https://public-rpc.blockpi.io/http/near-testnet",
        // nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
    };
    const near = await connect(config);
    const wallet = new WalletConnection(near);
    return wallet
}

async function NearLogin(){
    const wallet = await NearWalletConfig();
    if(wallet.isSignedIn()) {
        //account type = string 
        const account = await NearGetAccount();
        console.log(account);
        unityInstance.SendMessage("Manager","ConnectSuccess",account);
    }else{
        wallet.requestSignIn(
            "zombie3.testnet", // contract requesting access
            "Test2", // optional
            // "http://YOUR-URL.com/success", // optional
            // "http://YOUR-URL.com/failure" // optional
            );
            unityInstance.SendMessage("Manager","InstallHint");
    }
}

async function NearSignout(){
    const wallet = await NearWalletConfig();
    wallet.signOut();
}

async function NearGetAccount(){
    const wallet = await NearWalletConfig();
    const account = wallet.getAccountId();
    return account
}