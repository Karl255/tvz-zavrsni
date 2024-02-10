import { AUTH_TOKEN_NAME, verifyAuthToken, type AuthTokenPayload } from "$lib/server/service/auth.service";
import type { Handle, RequestEvent } from "@sveltejs/kit";

const unauthenticatedRoutes = ["/login", "/register"];
const apiRoutePrefix = "/api";

// https://stackoverflow.com/questions/2839585/what-is-correct-http-status-code-when-redirecting-to-a-login-page
const REDIRECT_STATUS = 302;
const UNAUTHORIZED_STATUS = 401;

type ResolveHandler = Parameters<Handle>[0]["resolve"];

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;
	console.log("requested", pathname);

	const userId = (await authenticate(event))?.userId ?? null;

	if (pathname.startsWith(apiRoutePrefix)) {
		return handleApiRoutes(event, resolve, !!userId);
	}

	const redirectLocation = determineRedirectLocation(pathname, !!userId);

	if (redirectLocation) {
		const headers = { Location: redirectLocation };

		return new Response("Redirect", { status: REDIRECT_STATUS, headers });
	}

	return resolve(event);
};

async function handleApiRoutes(event: RequestEvent, resolve: ResolveHandler, isAuthenticated: boolean): Promise<Response> {
	// prettier-ignore
	return isAuthenticated
		? await resolve(event)
		: new Response("Unauthorized", { status: UNAUTHORIZED_STATUS });
}

function determineRedirectLocation(pathname: string, isAuthenticated: boolean): string | null {
	const routeNeedsAuthentication = !unauthenticatedRoutes.some((route) => pathname.startsWith(route));

	if (isAuthenticated && !routeNeedsAuthentication) {
		return "/";
	} else if (!isAuthenticated && routeNeedsAuthentication) {
		return "/login";
	}

	return null;
}

async function authenticate(event: RequestEvent): Promise<AuthTokenPayload | null> {
	const token = event.cookies.get(AUTH_TOKEN_NAME);

	if (!token) {
		console.log(event.cookies.getAll());
		return null;
	}

	return (await verifyAuthToken(token))?.payload ?? null;
}
