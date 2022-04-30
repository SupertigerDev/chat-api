interface RequestOpts {
  url: string;
  method: string;
  body?: any;
  token?: string | null;
}

export async function request<T>(opts: RequestOpts): Promise<T> {
  const response = await fetch(opts.url, {
    method: opts.method,
    body: JSON.stringify(opts.body),
    headers: {
      'Content-Type': 'application/json',
      ...(opts.token ? { Authorization: opts.token } : {}),
    }
  })
    .catch(err => { throw {message: 'Could not connect to server. ' + err.message}; });
  if (!response.ok) {
    throw await response.json();
  }
  return await response.json();
}