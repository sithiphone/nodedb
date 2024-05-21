class Trainee {
    constructor(gender, first_name, last_name, score) {
        this.gender = gender;
        this.first_name = first_name;
        this.last_name = last_name;
        this.score = score;
    }
    show() {
        console.log(`Gender: ${this.gender}, FirstName: ${this.first_name}, 
        LastName: ${this.last_name}, Score: ${this.score}`);
    }
}

module.exports = Trainee;