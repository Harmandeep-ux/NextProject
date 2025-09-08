import prisma from "@/lib/prisma"


export async function DELETE(req, context) {
    const { params } = context
    const id = parseInt(params.id)

    const existing = await prisma.note.findUnique({ where:{id} })
    if(!existing){
        return Response.json({msg:'not found'}, {status:404})
    }

    const deleteNote = await prisma.note.delete({ where:{id} })
    return Response.json(deleteNote)
}


export async function UPDATE(req,{params}) {
    const id = parseInt(params.id)

    const {title,content} = await req.json()

    const update = await prisma.note.update({
        where:{id},
           data: {title, content}
    })

    return Response.json({msg:'updated',update})
}