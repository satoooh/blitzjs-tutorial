import { Form, FormProps } from "src/core/components/Form"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "src/core/components/Form"

export function QuestionForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="choices.0.name" label="Choice 1" />
      <LabeledTextField name="choices.1.name" label="Choice 2" />
      <LabeledTextField name="choices.2.name" label="Choice 3" />
    </Form>
  )
}
