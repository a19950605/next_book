import Room from '../models/room';

import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';

const allRooms =  catchAsyncErrors(async(req,res)=>{

  //  try{

    const rooms = await Room.find();

    res.status(200).json({
        success:true,
        rooms
    })
    

 //   }catch(error){
    //     res.status(400).json({
    //         success:false,
    //         error:error.message
    //     })
    // }


}
)
//create new room =>  /api/rooms
const newRoom = catchAsyncErrors(async(req,res) =>{

  //  try{

        const room = await Room.create(req.body);

        res.status(200).json({
            success:true,
            room
        })
    // }catch(error){
    //     res.status(400).json({
    //         success:false,
    //         error:error.message 
    //     })
    // }


})


//get room details => /api/rooms/:id
const getSingleRoom = catchAsyncErrors(async(req,res,next)=>{
    
  //  try{

    const room = await Room.findById(req.query.id);

    if(!room){

        // return res.status(404).json({
        //     success:false,
        //     error:'Room not found with this ID'
        // })
        return next(new ErrorHandler('Room not found with this ID',404));
    }

    res.status(200).json({
        success:true,
        room
    })
    
/*
    }catch(error){
        res.status(400).json({
            success:false,
            error:error.message
        })
    }*/


}
)
//update room details => /api/rooms/:id

//get room details => /api/rooms/:id
const updateRoom =  catchAsyncErrors(async(req,res)=>{
    
    // try{

    let room = await Room.findById(req.query.id);

    if(!room){

        return next(new ErrorHandler('Room not found with this ID',404));

    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })


    res.status(200).json({
        success:true,
        room
    })
    

    // }catch(error){
    //     res.status(400).json({
    //         success:false,
    //         error:error.message
    //     })
    // }


}
)
//delete room => /api/rooms/:id
const deleteRoom =  catchAsyncErrors(async(req,res)=>{
    
   // try{

    const room = await Room.findById(req.query.id);

    if(!room){

        // return res.status(404).json({
        //     success:false,
        //     error:'Room not found with this ID'
        // })
        return next(new ErrorHandler('Room not found with this ID',404));

    }

    await room.remove();

    res.status(200).json({
        success:true,
        message:'Room is deleted'
    })
    

    // }catch(error){
    //     res.status(400).json({
    //         success:false,
    //         error:error.message
    //     })
    // }


})


export {
    allRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom
}