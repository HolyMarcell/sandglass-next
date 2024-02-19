
export const config = {
  matcher: ['/protected'], // force login for these pages
}

export {default} from "next-auth/middleware";
