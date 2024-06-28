import { NextRequest, NextResponse } from "next/server";

function GET(req: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Logout Successfully", success: true },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });

    return response;
    
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export default GET;
