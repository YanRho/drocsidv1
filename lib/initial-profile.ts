

import { db } from "@/lib/db"
import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

// Retireives the current user's profiel or redirects to the sign in page if no user is found
export const initialProfile = async () => {
    const user = await currentUser(); // Fetches the current user from Clerk

    // Redirects to sign in if user isnt authenticated
    if (!user) {
        return RedirectToSignIn();
    }

    // Search for an existing profile based on user Id
    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    });

    // If profile exists, return it, otherwise, create a new profile
    if (profile) {
        return profile;
    }

    // Create a new profile for the auth user.
    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: '${user.firstName} ${user.lastName}',
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    });

    return newProfile;
}