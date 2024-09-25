import { sign } from "jsonwebtoken";


class GenerateToken {
    
    public static processResponse(sessionData: any): string {
        let token: string = "";
        token = sign({
            id: sessionData.cod_user,
            name: sessionData.name_user,
            rol: sessionData.name_role,
            phone: sessionData.phone_user,
            access: sessionData.name_access

        }, "thePasswordSecret", { expiresIn: "8h" });
        return token;
    }
}
export default GenerateToken;