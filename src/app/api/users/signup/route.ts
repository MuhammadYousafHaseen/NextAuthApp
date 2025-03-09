import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.models";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";


connect();


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        // validation of the request body
        console.log(reqBody);

        if (!username || !email || !password) {
            return NextResponse.json({error:"Please fill all fields"},{status:400});
        }

        // check if the user already exists
        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json({error:"User already exists"},{status:400});
        }

        // hashing the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        // creating the user
        const newUser = await User.create({
            username,
            email,
            password:hashedPassword,

        });

        const savedUser = await newUser.save();

        console.log(savedUser);

        //send verification email
        await sendMail({email, emailType:"verify", userId:savedUser._id});




        return NextResponse.json({message:"User created successfully", success:true, savedUser },{status:200
        })

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
} 