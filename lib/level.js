class Level {
  constructor(npc_array, image, connections) {
    this.npc_array = npc_array;
    this.image = image;
    this.connections = connections;
  }
}
class Connections {
  constructor(up, down, left, right) {
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
  }
}

function loadLevels() {
  let levels = [];
  const steve = new Npc(
    ["xin chào", "cho em xin một bánh mì chay"],
    0,
    "https://www.dev-fern.com/character.png",
    vec2(-0.5, 0)
  );
  const jeff = new Npc(
    ["xin chào", "cho em xin một bánh mì chay"],
    0,
    "https://www.dev-fern.com/npc.png",
    vec2(0.5, 0.5)
  );

  levels.push(
    new Level(
      [jeff, steve],
      "https://www.dev-fern.com/Untitled.png",
      new Connections(1, -1, -1, -1)
    )
  );

  levels.push(
    new Level(
      [jeff],
      "https://www.dev-fern.com/npc.png",
      new Connections(-1, 0, -1, -1)
    )
  );
  return levels;
}
