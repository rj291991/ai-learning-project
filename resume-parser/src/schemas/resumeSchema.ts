import { z } from "zod";

export const ExperienceSchema = z.object({
    company: z.string(),
    role: z.string(),
    duration: z.string()
})


export const EducationSchema = z.object({
    degree: z.string(),
    college: z.string()
})


export const ResumeSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    skills: z.array(z.string()),
    experience: z.array(ExperienceSchema),
    education: z.array(EducationSchema)
})


export type Resume = z.infer<typeof ResumeSchema>