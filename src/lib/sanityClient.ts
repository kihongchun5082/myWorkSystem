import { createClient } from "@sanity/client";

const sanityClient = createClient({
 // projectId: process.env.SANITY_PROJECT_ID,
 // dataset: process.env.SANITY_DATASET,
 projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
 dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
 useCdn: false, // set to `false` to bypass the edge cache
 apiVersion: '2025-05-24', // use current date (YYYY-MM-DD) to target the latest API version. Note: this should always be hard coded. Setting API version based on a dynamic value (e.g. new Date()) may break your application at a random point in the future.
 token: process.env.SANITY_SECRET_TOKEN // Needed for certain operations like updating content, accessing drafts or using draft perspectives
})

export default sanityClient;
