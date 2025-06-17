import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } }).onUploadComplete(async ({ metadata, file }) => {
    // This code RUNS ON YOUR SERVER after upload
    console.log("Upload complete for file:", file.url)
    // You can save the file.url to your database here (e.g., update user/profile avatar)
  }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
