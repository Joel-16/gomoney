import { Request, Response, NextFunction } from "express";

import { redisClient } from "../utils/database";

export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const data= await redisClient.get(req.originalUrl)
  if(data){
    res.status(200).json({data: JSON.parse(data)})
  }
    next();
};

