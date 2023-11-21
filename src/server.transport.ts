interface Account {
  serverURL: string;
  token: string;
}

export class ServerTransport {
  constructor(
    private readonly account: Account,
    private readonly projectId: string
  ) {}
}
