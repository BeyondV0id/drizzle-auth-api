import {Request, Response, NextFunction} from "express";
import { findSessionByToken } from "../services/sessionService";

export const requireAuth = async(req:Request,res:Response,next:NextFunction) => {

  try{
    const token = req.cookies?.session_token;
    if(!token){
      return res.status(401).json({message: "Authenticaiton required"});
    }

    const session = await findSessionByToken(token);
    if(!session){
      return res.status(401).json({message: "Invalid session token"});
    }

    const now = new Date();
    const expiresAt = new Date(session.expiresAt);
    if(expiresAt <= now){
      return res.status(401).json({message:"Session expired"});
    }

    //Atach userId to res.locals
    res.locals.userId = session.userId;
    next();
    return;
  }
  catch(error){
    console.log("Auth middleware error: ",error);
    return res.status(500).json({message:"Internal server error"});
  }
}
