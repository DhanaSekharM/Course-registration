const Sequelize = require('sequelize')
const sequelize = require('../routes/database')
const Model = Sequelize.Model

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

Course.sync({ force: true })
Faculty.sync({force: false})

module.exports = {
    Course,
    Faculty,
}

