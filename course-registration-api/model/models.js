const Sequelize = require('sequelize')
const sequelize = require('../routes/database')
const Model = Sequelize.Model


let dept = ['CSE', 'IT', 'EEE', 'ECE', 'ME']
class Course extends Model { }
Course.init({
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    timeslot: {
        type: Sequelize.TIME,
    },
    type: {
        type: Sequelize.STRING,
    },
    semester: {
        type: Sequelize.STRING,
    },
    facultyId: {
        type: Sequelize.STRING,
    }
}, {
    sequelize,
    modelName: 'course',
});

class Faculty extends Model { }
Faculty.init({
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    dept: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    }
}, {
    sequelize,
    modelName: 'faculty',
})

Faculty.hasMany(Course, {foreignKey: Course.facultyId, sourceKey: Faculty.id, onDelete: 'cascade'})

let fun = (num) => {
    return num > 4 ? num-5 : num
}

let sync = async () => {
    await Faculty.sync({force: false})
    // for(let i = 1; i <= 10; i++) {
    //     Faculty.create({
    //         id: ''+i,
    //         name: 'fname'+i,
    //         dept: dept[Math.floor(fun(Math.random()*10))],
    //         email: 'fname'+i+'@mail.com',
    //     })
    // }
    await Course.sync({ force: false })
    
}

sync()





module.exports = {
    Course,
    Faculty,
}

