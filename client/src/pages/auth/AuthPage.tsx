import { useParams } from "react-router-dom"
import { AuthView } from "@daveyplate/better-auth-ui"

export default function AuthPage() {
  const { pathname } = useParams()

  return (
    <main className="p-6 flex flex-col justify-center items-center h-[80vh] bg-black">
      <AuthView
        pathname={pathname}
        classNames={{
          base: `
            bg-white/5 backdrop-blur-md
            border border-white/10
            rounded-xl
            shadow-lg
          `
        }}
      />
    </main>
  )
}
