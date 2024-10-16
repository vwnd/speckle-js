interface ProjectData {
  name: string;
  description: string;
}

const query = `#graphql
  query ProjectInfo($projectId: String!) {
  project(id: $projectId) {
    id
    name
    description
    visibility
    allowPublicComments
    role
    createdAt
    updatedAt
    sourceApps
    workspaceId
  }
}
`;

async function getProjectInfo(projectId: string): Promise<ProjectData> {
  const response = await fetch("https://app.speckle.systems/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: {
        projectId,
      },
    }),
  });

  const data = await response.json();

  if (data.errors) {
    console.error(JSON.stringify(data.errors));
    throw new Error("Failed to fetch project info.");
  }

  return {
    name: data.data.project.name,
    description: data.data.project.description,
  };
}

getProjectInfo("09c17a606e")
  .then((info) => {
    console.log(info);
  })
  .catch((error) => {
    console.error(error.message);
  });
