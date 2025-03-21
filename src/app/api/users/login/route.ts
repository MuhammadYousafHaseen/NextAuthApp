import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.models";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({error:"User not found"}, {status:404});
        }
        console.log("user found");

        const validPassword = await bcryptjs.compare(password, user.password);

        if(!validPassword) {
            return NextResponse.json({error:"Check your credentials"}, {status:401});
        }

        const tokenData = {
            id:user._id,
            email:user.email,
            username:user.username,

        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:"1d"});

        const response = NextResponse.json({
            message:"LoggedIn Successfully",
            success:true,
        })

        response.cookies.set("token",token, {
            httpOnly:true,
        })
         
        return response;





    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:500})
        
    }
}