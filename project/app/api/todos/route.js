import { prisma } from "@/app/lib/prisma";

export async function GET() {
    try{
        const todos = await   prisma.todo.findMany({
         orderBy:{createdAt:'desc'}
        })
         return Response.json(todos)
    }catch(err){
        return Response.json({err:'something went wrong'},{status:500})
    }
}

export async function POST(req) {
     const {title} =await req.json()
     const todo = await prisma.todo.create({
        data:{title}
     })
     return Response.json(todo)
}

export async function DELETE(req,{params}) {
    const {id} = parseInt(params.id)

    const todo = await prisma.todo.DELETE({
        where: {id}
    })

    return Response.json("Todo Deleted")
}