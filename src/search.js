import "dotenv/config";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const movies = [
  {
    id: 1,
    title: "肖申克的救赎",
    year: 1994,
    description:
      "一名银行家因被冤罪入狱，在监狱中建立起一段特殊的友谊，同时追求自由。",
  },
  {
    id: 2,
    title: "教父",
    year: 1972,
    description:
      "一部讲述黑帮家族的史诗级电影，深刻描绘了权力、家庭和犯罪的复杂关系。",
  },
  {
    id: 3,
    title: "教父第二部",
    year: 1974,
    description:
      "继续讲述教父维托·科利昂家族的故事，以及他儿子迈克尔的复杂统治。",
  },
  {
    id: 4,
    title: "低俗小说",
    year: 1994,
    description:
      "由昆汀·塔伦蒂诺执导，以多线结构呈现的犯罪喜剧，包含多个交织的故事线。",
  },
  {
    id: 5,
    title: "辛德勒的名单",
    year: 1993,
    description:
      "史蒂文·斯皮尔伯格执导，讲述了一位德国商人奥斯卡·辛德勒拯救犹太人的真实故事。",
  },
  {
    id: 6,
    title: "十二怒汉",
    year: 1957,
    description: "一部关于陪审团成员在审判中讨论和改变观点的戏剧性作品。",
  },
  {
    id: 7,
    title: "飞越疯人院",
    year: 1975,
    description:
      "基于肯·凯西的小说，描绘了一名罪犯故意让自己送入精神病院，试图逃脱监狱的故事。",
  },
  {
    id: 8,
    title: "千与千寻",
    year: 2001,
    description:
      "宫崎骏执导的一部日本动画电影，讲述了一个少女在神奇的世界中冒险的故事。",
  },
  {
    id: 9,
    title: "辩护人",
    year: 1962,
    description: "一部关于法治与荒野的西部片，探讨了正义、权力和传奇的主题。",
  },
  {
    id: 10,
    title: "黑鹰坠落",
    year: 2001,
    description:
      "一部根据真实事件改编的军事战争电影，描绘了美国在索马里的军事行动。",
  },
  {
    id: 11,
    title: "盗梦空间",
    year: 2010,
    description:
      "克里斯托弗·诺兰执导的科幻悬疑电影，探讨了梦境和现实之间的模糊边界。",
  },
  {
    id: 12,
    title: "楚门的世界",
    year: 1998,
    description:
      "一部关于一个男子生活在一个被精心安排的虚拟世界的电影，揭示了真相的探索。",
  },
  {
    id: 13,
    title: "绿皮书",
    year: 2018,
    description:
      "一名黑人钢琴家和一名白人司机在20世纪60年代美国南方展开一段非凡的旅程。",
  },
  {
    id: 14,
    title: "失落沮喪",
    year: 2004,
    description:
      "乔尔·科恩执导的黑色幽默犯罪片，描绘了一场车祸后的一系列荒诞事件。",
  },
  {
    id: 15,
    title: "美丽心灵",
    year: 2001,
    description: "一名数学天才与精神健康问题斗争，同时寻找生活中的真实意义。",
  },
  {
    id: 16,
    title: "星球大战",
    year: 1977,
    description:
      "乔治·卢卡斯执导的科幻经典，描绘了银河系中反抗军与邪恶帝国之间的战斗。",
  },
  {
    id: 17,
    title: "美国往事",
    year: 1984,
    description: "一部关于一名自幼长大于犯罪世界的男子的罪犯史诗。",
  },
  {
    id: 18,
    title: "霸王别姬",
    year: 1993,
    description: "陈凯歌执导的一部讲述两位京剧演员命运的史诗性爱情片。",
  },
  {
    id: 19,
    title: "无敌破坏王",
    year: 2012,
    description: "一部关于一名电子游戏反派寻找改变命运的故事，充满了动画冒险。",
  },
  {
    id: 20,
    title: "闻香识女人",
    year: 1992,
    description:
      "马丁·布莱斯执导的一部关于一名年轻男子对香水的独特感知能力的电影。",
  },
  {
    id: 21,
    title: "蝙蝠侠：黑暗骑士",
    year: 2008,
    description:
      "克里斯托弗·诺兰执导的超级英雄电影，以蝙蝠侠对抗小丑的故事而闻名。",
  },
];

const createStore = () =>
  MemoryVectorStore.fromDocuments(
    movies.map(
      (movie) =>
        new Document({
          pageContent: `Title: ${movie.title}\n${movie.description}\n${movie.year}`,
          metadata: { source: movie.id, title: movie.title },
        })
    ),
    new OpenAIEmbeddings()
  );

export const search = async (query, count = 1) => {
  const store = await createStore();
  return store.similaritySearch(query, count);
};

console.log(await search("我想看一部艺术的电影，有什么值得一看的吗？"));
