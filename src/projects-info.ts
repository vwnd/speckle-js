export async function projectsInfo() {
  const query = `#graphql
  query UserProjects {
      activeUser {
        projects {
          items {
            name
            description
            id
            role
          }
        }
      }
    }
  `;

  const response = await fetch("https://app.speckle.systems/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SPECKLE_TOKEN as string}`,
    },
    body: JSON.stringify({ query }),
  });

  const parsed = await response.json();

  const projects = parsed.data.activeUser.projects.items;

  console.log(projects);
}
