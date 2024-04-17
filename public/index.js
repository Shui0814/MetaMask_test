document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(registrationForm);
        const userData = {
            username: formData.get('username'),
            email: formData.get('email')
        };

        // 发送注册请求到后端服务器
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            // 显示对话框
            alert(`Wallet Address: ${data.walletAddress}\nPrivate Key: ${data.privateKey}\nMnemonic: ${data.mnemonic}`);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    });
});
