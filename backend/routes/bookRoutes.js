import express from 'express'
import { Book } from '../models/bookmodel.js';

const router = express.Router()

router.post('/',async (req,res)=>{
    try{
        if(!req.body.title ||!req.body.author|| !req.body.publishYear){
            return res.status(400).send({
                message:'Please fill out all required fields'
            });
        }

        const newBook = {
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);

    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});

    }

})


router.get('/',async (req,res)=>{
    try{

        const books = await Book.find({});
        return res.status(200).json({
            count:books.length,
            books:books

        });
          
        
        



    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});

    }

})


router.get('/:id',async (req,res)=>{
    try{

        const id = req.params.id 

        const book = await Book.findById(id);
        return res.status(200).json({
            book:book

        });

    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});

    }

})

router.put('/:id',async (req,res)=>{
    try{

        if(!req.body.title ||!req.body.author|| !req.body.publishYear){
            return res.status(400).send({
                message:'Please fill out all required fields'
            });
        }
        

        const id = req.params.id 

        const res_book = await Book.findByIdAndUpdate(id,req.body);

        if(!res_book){
            return res.status(404).json({message:"No such book found"})
        }

        return res.status(200).send({message:'Book deleted succesfully'})


    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});

    }

})


router.delete(':id',async(req,res)=>{

    try{


        

        const id = req.params.id 

        const res_book = await Book.findByIdAndDelete(id);

        if(!res_book){
            return res.status(404).json({message:"No such book found"})
        }

        return res.status(200).send({message:'Book deleted succesfully'})


    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});

    }


})


export default router;