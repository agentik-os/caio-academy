import Link from "next/link";
import { notFound } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) notFound();

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? user?.emailAddresses?.[0]?.emailAddress;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail || email !== adminEmail) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              CAIO Academy
            </Link>
            <span className="font-mono text-xs uppercase tracking-widest text-ink">
              / Admin
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest">
            <span className="text-muted-foreground">{email}</span>
            <SignOutButton>
              <button className="border border-line px-3 py-1.5 hover:bg-ink hover:text-paper transition-colors">
                Sign out
              </button>
            </SignOutButton>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
