export const apiFetch = async (url, { method = "GET", body, headers = {}, cookies } = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  let token = null;

  if (typeof window === "undefined") {
    // ssr
    token = cookies?.get("accessToken")?.value || null;
  } else {
    // client
    token = localStorage.getItem("accessToken");
  }

  const finalHeaders = {
    ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...headers,
  };

  if (token) finalHeaders["authorization"] = `${token}`;

  try {
    const res = await fetch(`${baseUrl}${url}`, {
      method,
      credentials: "include", 
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
      headers: finalHeaders,
      cache: "no-store",
    });

    if (res.status === 401) {
      if (typeof window !== "undefined") localStorage.removeItem("accessToken");
      console.log("Token expired or invalid. Redirect to login if needed.");
      return { err: "Unauthorized" };
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("API Fetch Error:", error);
    return { err: "Something went wrong" };
  }
};
