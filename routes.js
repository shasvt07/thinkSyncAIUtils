import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


const generateImage = async(req,res) => {
    const {prompt} = req.body;
    try{
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: prompt,
            n: 1,
            size: "512x512",
          });

        const image_url = response.data[0].url;
        res.status(200).json(image_url);
    }catch(err){
        console.log(err);
        res.status(500).json({success:false, message: "Something went wrong"});
    }
}

const router = express.Router();

router.post("/getImage", generateImage);
export default router;