const { hash } = require('bcrypt');
const bcrypt = require('bcrypt');

class User {
    constructor(username, password, email, role){
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role || 'member';
    }
    async hashPassword(password) {
        let salt = await bcrypt.genSaltSync(10);
        let hash = await bcrypt.hashSync(password, salt);
        return hash;
    }
}

module.exports = User;