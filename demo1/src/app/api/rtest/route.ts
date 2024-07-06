import {NextRequest, NextResponse} from "next/server";

export async function GET(reqeust: NextRequest) {
    const {url} = reqeust
    return NextResponse.json({'url': url})
}