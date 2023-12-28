import SignInForm from "./components/SignInForm";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h1 className="mb-10 text-[4rem] font-semibold">Sign in</h1>
      <SignInForm />
    </main>
  );
}
