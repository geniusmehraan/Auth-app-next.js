import jwt from "jsonwebtoken";

const getDataFromToken = async (token)=>{
     
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    return decodedToken?.id
   
}

export default getDataFromToken;
