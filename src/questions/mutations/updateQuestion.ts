import { L } from "@blitzjs/auth/dist/index-ced88017"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateQuestion = z.object({
  id: z.number(),
  name: z.string(),
  choices: z.array(z.object({ id: z.number().optional(), name: z.string() }).nonstrict()),
})

export default resolver.pipe(
  resolver.zod(UpdateQuestion),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const question = await db.question.update({
      where: { id },
      data: {
        ...data,
        choices: {
          upsert: data.choices.map((choice) => ({
            where: { id: choice.id || 0 },
            create: { name: choice.name },
            update: { name: choice.name },
          })),
        },
      },
    })

    return question
  }
)
