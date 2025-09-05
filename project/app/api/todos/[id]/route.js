import { prisma } from "@/app/lib/prisma"

export async function DELETE( req,{params}) {
    
    const id = parseInt(params.id)

    const todo = await prisma.todo.delete({
        where:{id}
    })
    return Response.json({msg:'deleted', todo})
}

export async function PUT(req ,{params}) {

    const id = parseInt(params.id)
  
   const {title} = await req.json()

    const updateTodo = await prisma.todo.update({
        where:{id},
        data:{title}
    })

    return Response.json(updateTodo)
 
}