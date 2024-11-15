import {
  CameraController,
  DefaultViewerParams,
  SpeckleLoader,
  TreeNode,
  UrlHelper,
  Viewer,
} from "@speckle/viewer";

async function main() {
  console.log("4 - View Data");
  // @ts-ignore
  const token = import.meta.env.VITE_SPECKLE_TOKEN as string;

  const container = document.getElementById("viewer") as HTMLElement;

  const viewer = new Viewer(container, DefaultViewerParams);
  await viewer.init();

  viewer.createExtension(CameraController);

  const urls = await UrlHelper.getResourceUrls(
    // "https://app.speckle.systems/projects/9ff253b70b/models/126c7ec915",
    "https://app.speckle.systems/projects/9ff253b70b/models/f09b6887fc",
    token
  );

  for (const url of urls) {
    const loader = new SpeckleLoader(viewer.getWorldTree(), url, token);
    await viewer.loadObject(loader, true);
  }

  // const properties = await viewer.getObjectProperties();

  // const levelNodes = viewer.getWorldTree().findAll((node: TreeNode) => {
  //   if (!node.model.raw.speckle_type) return;
  //   console.log(node.model.raw.speckle_type);
  //   return node.model.raw.speckle_type.includes("RevitLevel");
  // });

  // console.log("Number of levels:", levelNodes.length);
}

main();
