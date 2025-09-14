class Level {
  constructor(npc_array, image, connections, words) {
    this.npc_array = npc_array;
    this.image = image;
    this.connections = connections;
    this.words = words;
    this.isFinished = false;
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
      vn: "Một",
      eng: "One",
    },
    {
      vn: "Hai",
      eng: "Two",
    },
    {
      vn: "Ba",
      eng: "Three",
    },
  ],
  //Level 2
  [
    {
      vn: "Không",
      eng: "No",
    },
    {
      vn: "Muốn",
      eng: "Want",
    },
  ],
];

let dialogues = [
  // NP1 - Level 0
  [
    "Hi",
    "Chào",
    "Chào?",
    "Tôi muốn một bánh mì",
    "I need to see the plane behind you",
    "*block your way* Tôi muốn một bánh mì chay",
  ],

  // NPC 2 - Level 0
  ["Hi!", "Chào bạn. Tôi là Emma"],

  // NPC 3 - Level 1
  ["Chào bạn", "Chào bạn, tôi muốn 3"],

  // NPC 4 (the banh mi person) - Level 1
  [
    "Can I have a bánh mì?",
    "Tôi không hiểu.",
    "Me: Me. That bánh mì thing.",
    "*refuses to talk*",
  ],

  // NPC 5 - Level 2
  ["Chào bạn!", "Chào. Bạn muốn nước?"],
  // Then question

  // NPC 4 (the banh mi person) - Final puzzle
  ["Chào bạn.", "Chào bạn."],
  // Then puzzle
];

function loadLevels() {
  let levels = [];
  //NPCS
  const steve = new Npc(
    dialogues[0],
    0,
    "https://www.dev-fern.com/character.png",
    vec2(-0.5, 0)
  );
  const jeff = new Npc(
    dialogues[2],
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
