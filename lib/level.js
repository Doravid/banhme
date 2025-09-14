class Level {
  constructor(npc_array, image, connections, words) {
    this.npc_array = npc_array;
    this.image = image;
    this.connections = connections;
    this.words = words;
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

let wordLists = [
  //Level 0
  [
    {
      vn: "Chào",
      eng: "Hi",
    },
    {
      vn: "Tôi",
      eng: "I",
    },
    {
      vn: "Bạn",
      eng: "You",
    },
  ],
  //Level 1
  [
    {
      vn: "asdfasdfadfasdasdfasdfdas",
      eng: "Hi",
    },
    {
      vn: "Tôi",
      eng: "I",
    },
    {
      vn: "Bạn",
      eng: "You",
    },
  ],
  //Level 2
  [
    {
      vn: "Chào",
      eng: "Hi",
    },
    {
      vn: "Tôi",
      eng: "I",
    },
    {
      vn: "Bạn",
      eng: "You",
    },
  ],
];

function loadLevels() {
  let levels = [];
  //NPCS
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
  //Levels
  levels.push(
    new Level(
      [steve],
      "https://www.dev-fern.com/Untitled.png",
      new Connections(1, -1, -1, -1),
      wordLists[0]
    )
  );

  levels.push(
    new Level(
      [jeff],
      "https://www.dev-fern.com/map2.png",
      new Connections(-1, 0, -1, -1),
      wordLists[1]
    )
  );
  return levels;
}
