const  Room = require('../models/room');
const mongoose =require('mongoose')
//cons mongoose from 'mongoose';


const rooms = require('../data/rooms');


mongoose.connect('mongodb://localhost:27017/bookit', {
   
    useNewUrlParser: true, 
    
    useUnifiedTopology: true 
        })

const seedRooms = async () =>{
    try{
        await Room.deleteMany();
        console.log('Rooms are deleted');

        await Room.insertMany(rooms);
        console.log('all rooms are added')

    }catch(error){
        console.log(error.message)
        process.exit()
    }
}

seedRooms()