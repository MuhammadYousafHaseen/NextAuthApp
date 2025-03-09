import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.models";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";



connect();

export async function POST(request:NextRequest) {
      const userId = getDataFromToken(request);
      const user = await User.findById(userId).select("-password");
      
      if(!user) {
        return NextResponse.json({message:"User not found"},{status:404})
      }
        return NextResponse.json({message:"User found", data: user},{status:200})
}