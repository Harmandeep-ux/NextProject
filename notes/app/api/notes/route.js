import prisma from "@/lib/prisma"

export async function POST(req) {
    const {title,content} = await req.json()

    const note = await prisma.note.create({
        data: {title,content}
    }) 
    return Response.json(note)
}

export async function GET() {
     const note = await prisma.note.findMany({
       orderBy:{createdAt:'desc'}
     })

     return Response.json(note)
}