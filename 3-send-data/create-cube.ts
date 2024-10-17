import THREE from "three";
import { Mesh } from "./lib";
export function createCube(): Mesh {
  const geometry = new THREE.BoxGeometry(3, 3, 3);
  const material = new THREE.MeshPhongMaterial({ vertexColors: true });
  const cube = new THREE.Mesh(geometry, material);

  // get the array of vertices and faces from the cube

  const vertices = cube.geometry.attributes.position.array;
  const indexes = Array.from(cube.geometry.index?.array!);

  for (let i = 0; i <= indexes.length; i += 4) {
    indexes.splice(i, 0, 3);
  }

  const speckleMesh = new Mesh();
  speckleMesh.vertices = Array.from(vertices);
  speckleMesh.faces = indexes;

  return speckleMesh;
}
