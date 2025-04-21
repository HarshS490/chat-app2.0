export { auth as middleware} from "./lib/authOptions";

export const config = {
  matcher: ["/chat/:path*", "/users/:path*"],
};