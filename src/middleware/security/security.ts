import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';


@Injectable()
export class Security implements NestMiddleware{

    public use(req: Request, res: Response, next: NextFunction){
        if (!req.headers.authorization) {
            res.status(401).json({respuesta: "Petición negada por el sistema de seguridad"});
        } else {
            try {
                const token = req.headers.authorization;
                const sessionData =  verify(token, 'thePasswordSecret');
                req.body.sessionData = sessionData
                next();
            } catch (error) {
                res.status(401).json({mensaje : "intento de fraude"});
            }
        }
    }
    

}
