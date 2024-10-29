import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const SetupPage = async () => {
    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where: {
          members: {
            some: {
              profileId: profile.id,
            }
          }
        }
      });

      // if hte server exists, redirect to the server page
    if (server) {
        return redirect("/servers/${server.id");
    }

    return <div>Create a Server</div>
}

export default SetupPage;