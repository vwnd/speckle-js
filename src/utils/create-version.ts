import { SendResult } from "@speckle/objectsender";

interface CreateVersionParams {
  serverUrl: string;
  projectId: string;
  modelId: string;
  token: string;
}

export async function createVersion(
  res: SendResult,
  { serverUrl, projectId, modelId, token }: CreateVersionParams
) {
  const response = await fetch(serverUrl + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `#graphql
        mutation CreateVersion($input: CreateVersionInput!) {
          versionMutations {
            create(input: $input) {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          projectId,
          modelId,
          objectId: res.hash,
          message: `Hello from Javascript!`,
        },
      },
    }),
  });

  return (await response.json()).data.versionMutations.create;
}
