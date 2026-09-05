// Centralized API configuration.
// Every network call in the app goes through here so the backend origin
// only ever lives in one place (VITE_API_URL).

const RAW_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Strip any trailing slash so we don't end up with double slashes when we
// concatenate paths.
export const API_BASE_URL = RAW_BASE_URL.replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Thin wrapper around fetch that:
 * - Prefixes every request with the configured API base URL
 * - Parses JSON responses (and tolerates empty bodies)
 * - Normalizes failures into a single ApiError type so the UI can show
 *   friendly, consistent messages instead of raw fetch/JSON errors.
 */
async function request(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;

  let response;
  try {
    response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });
  } catch (networkError) {
    throw new ApiError(
      "We couldn't reach the server. Check your connection and try again.",
      { status: 0 }
    );
  }

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const body = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const message =
      (body && (body.message || body.error)) ||
      `Something went wrong (${response.status}).`;
    throw new ApiError(message, { status: response.status, data: body });
  }

  return body;
}

export const apiClient = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, data) =>
    request(path, { method: "POST", body: JSON.stringify(data) }),
  put: (path, data) =>
    request(path, { method: "PUT", body: JSON.stringify(data) }),
  delete: (path) => request(path, { method: "DELETE" }),
};
