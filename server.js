const express = require('express');
const ethers = require('ethers');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// 模拟数据库，存储用户信息
let users = [];

// 处理用户注册请求
app.post('/register', (req, res) => {
    // 从请求中获取用户注册信息
    const { username, email } = req.body;

    // 生成一个新的 MetaMask 钱包
    const wallet = ethers.Wallet.createRandom();
    const walletAddress = wallet.address;
    const privateKey = wallet.privateKey;
    const mnemonic = wallet.mnemonic.phrase;

    // 将钱包地址、私钥和助记词与用户信息进行绑定，存储到数据库中
    const newUser = {
        username,
        email,
        walletAddress,
        privateKey,
        mnemonic
    };
    users.push(newUser);

    // 返回注册结果给前端
    res.json({
        success: true,
        message: 'Registration successful!',
        walletAddress,
        privateKey,
        mnemonic
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
