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
    freezeTableName: true,
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
    freezeTableName: true,
})

class Student extends Model { }
Student.init({
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
    },
    middleName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    dept: {
        type: Sequelize.STRING,
    },
    cgpa: {
        type: Sequelize.FLOAT,
    },
    semester: {
        type: Sequelize.INTEGER,
    },
    email: {
        type: Sequelize.STRING,
    },
    sex: {
        type: Sequelize.STRING,
    },
}, {
    sequelize,
    modelName: 'student',
    freezeTableName: true,
})

class Registration extends Model { }
Registration.init({
    courseId: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    studentId: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    registration_date: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.STRING,
    }
}, {
    sequelize,
    modelName: 'registration',
    freezeTableName: true,
})

class StudentLogin extends Model { } 
StudentLogin.init({
    studentId: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    password: {
        type: Sequelize.STRING,
    },
}, {
    sequelize,
    modelName: 'studentLogin',
    freezeTableName: true,
})

class FacultyLogin extends Model { } 
FacultyLogin.init({
    facultyId: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    password: {
        type: Sequelize.STRING,
    },
}, {
    sequelize,
    modelName: 'facultyLogin',
    freezeTableName: true,
})

class Timeslot extends Model {}

Timeslot.init({
    courseId: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    slot: {
        type: Sequelize.TIME,
        primaryKey: true
    }
}, {
    sequelize,
    modelName: 'timeslot',
    freezeTableName: true,
})

Faculty.hasMany(Course, { foreignKey: Course.facultyId, sourceKey: Faculty.id, onDelete: 'cascade' })
Student.hasMany(Registration, { foreignKey: Registration.studentId, sourceKey: Student.id, onDelete: 'cascade' })
Course.hasMany(Registration, { foreignKey: Registration.courseId, sourceKey: Course.id, onDelete: 'cascade' })
Student.hasOne(StudentLogin, {foreignKey: StudentLogin.studentId, sourceKey: Student.id, onDelete: 'cascade'})
Faculty.hasOne(FacultyLogin, {foreignKey: FacultyLogin.facultyId, sourceKey: Faculty.id, onDelete: 'cascade'})
Course.hasMany(Timeslot, {foreignKey: Timeslot.courseId, sourceKey: Course.id, onDelete: 'cascade'})



let fun = (num) => {
    return num > 4 ? num - 5 : num
}

let sync = async () => {
    await Faculty.sync({ force: false })
    // for(let i = 1; i <= 10; i++) {
    //     Faculty.create({
    //         id: ''+i,
    //         name: 'fname'+i,
    //         dept: dept[Math.floor(fun(Math.random()*10))],
    //         email: 'fname'+i+'@mail.com',
    //     })
    // }
    await Course.sync({ force: false })
    await Student.sync({ force: false })
    await Registration.sync({ force: false })
    await StudentLogin.sync({force: false})
    await FacultyLogin.sync({force: false})
    await Timeslot.sync({force: false})

    // for(let i = 1; i <= 10; i++) {
    //     FacultyLogin.create({
    //         facultyId: String(i),
    //         password: String(i)
    //     })
    // }

    // for(let i = 2; i <= 10; i++) {
    //     Student.create({
    //         id: String(100+i),
    //         firstName: 'fname'+i,
    //         middleName: 'mname'+i,
    //         lastName: 'lname'+i,
    //         dept: dept[Math.floor(fun(Math.random()*10))],
    //         cgpa: (Math.random()*10).toFixed(2),
    //         semester: 1,
    //         email: 'fname'+i+'@mail.com',
    //         sex: 'M'
    //     })
    // }

    // for(let i = 1; i <= 10; i++) {
    //     StudentLogin.create({
    //         studentId: String(100+i),
    //         password: String(100+i)
    //     })
    // }

}

sync()





module.exports = {
    Course,
    Faculty,
    Student,
    sequelize,
}

